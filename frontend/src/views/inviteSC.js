import React from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import "../css/contractDetail.module.css";
import Content from "../components/content.js"
import {
  Form,
  Input,
  Button,
  DatePicker
} from "antd";
import "antd/dist/antd.css";
import Web3 from 'web3';
import Apollo from '../contracts/ApolloAgreement.json';

class InviteSC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: 'undefined',
            apollo: null,
            account: '',
            smartContract: null
        }
        this.createAgreementAndUpdateSC = this.createAgreementAndUpdateSC.bind(this);
    }
    
    componentDidMount() {
        axios.post("http://127.0.0.1:8000/graphql/", {
            "query": `query getSmartContractWithID {
                getSmartContractWithid (id: "${this.props.match.params.id}") {
                    id
                    creatorName
                    creatorEmail
                    receiverEmail
                    eventName
                    payAmount
                    startTime
                    duration
                    location
                    payoutTime
                    receiverWalletAddress
                    receiverName
                    status
                }
            } 
            `,
            "variables": null,
            "operationName":"getSmartContractWithID"
        })
        .then(response => {
            console.log(response)
            this.setState({
                smartContract: response.data.data.getSmartContractWithid
            })
        })
        .catch(error => {console.log(error)})
    }

    async componentWillMount() {
        await this.loadBlockchainData()
    }

    async loadBlockchainData() {
        if (typeof window.ethereum !== 'undefined') {
            const web3 = new Web3(window.ethereum)
            const netId = await web3.eth.net.getId()
            const accounts = await web3.eth.getAccounts()

            // Load Balance
            if (typeof accounts[0] !== 'undefined') {
                this.setState({
                    account: accounts[0], 
                    web3: web3
                })
            } else {
                window.alert('Please login and connect your Metamask account')
            }

            // Load Contracts
            try {
                const apollo = new web3.eth.Contract(Apollo.abi, Apollo.networks[netId].address)
                this.setState({
                    apollo: apollo
                })
            } catch (e) {
                console.log('Error', e)
                window.alert('Contracts are not deployed to the current network')
            }

        } else {
            window.alert('Metamask has not been installed. Please install Metamask.')
        }     
    }

    async createAgreementAndUpdateSC(payoutTime, destination, amount) {
        if (this.state.apollo !== 'undefined') {
            try {
                await this.state.apollo.methods.createAgreement(payoutTime, [destination]).send({from: this.state.account, value: amount})
                .then(response => {
                    console.log(response)
                    // Update status of smart contract
                    axios.post("http://127.0.0.1:8000/graphql/", {
                        "query": `mutation updateSmartContract {
                        updateSmartContract(
                            id: \"${this.state.smartContract.id}\",
                            eventName: \"${this.state.smartContract.eventName}\", 
                            creatorName: \"${this.state.smartContract.creatorName}\", 
                            creatorEmail: \"${this.state.smartContract.creatorEmail}\", 
                            receiverEmail: \"${this.state.smartContract.receiverEmail}\",
                            startTime: \"${this.state.smartContract.startTime}\",
                            payoutTime: \"${this.state.smartContract.payoutTime}\",
                            duration: ${this.state.smartContract.duration}, 
                            payAmount: \"${this.state.smartContract.payAmount}\", 
                            location: \"${this.state.smartContract.location}\", 
                            receiverWalletAddress: \"${this.state.smartContract.receiverWalletAddress}\",
                            receiverName: \"${this.state.smartContract.receiverName}\",
                            status: 1
                        ) {
                            smartContract {
                                id
                            }
                            ok
                        }}
                        
                        `,
                        "variables": null,
                        "operationName":"updateSmartContract"
                    })
                    .then(response => {
                        console.log(response.data.data.updateSmartContract.smartContract.id)
                        this.props.history.push({
                            pathname: '/deployed',
                            state: {
                                contractId: response.data.data.updateSmartContract.smartContract.id
                            }
                        });
                    })
                    .catch(error => {console.log(error)})
                })
            } catch (e) {
                console.log('Error, createAgreement: ', e)
            }
        }
    }

    render() {
        if (this.state.smartContract === null) {
            return <div>Loading</div>
        }
        // const authContext = this.props.auth0;
        // console.log(authContext)
        //   if (authContext.user === undefined || authContext.user.email !== testSC.recipient) {
        //       return <div>Error 401 Unauthorised</div>;
        //   }

        const dateFormat = 'YYYY/MM/DD';
        //form dunction
        const onFinish = (values) => {
            console.log('Success:', this.state.smartContract);

            // deploy agreement onto smart contract
            let amount = this.state.smartContract.payAmount;
            // let payoutTime = new Date(moment(values.payoutTime, dateFormat)).getTime() / 1000
            let payoutTime = 12312313;
            let destination = "0x28a3a20E26F39FfcfdA140bAe20023Bc04a7b35f";
            // convert ETH to gwei
            amount = amount * 10**18

            // Deploy to blockchain and Update SC on backend
            this.createAgreementAndUpdateSC(payoutTime, destination, amount)

        };

        //form function
        const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        };
        return (
          <Content heading="Invitation Details">
            <div className="createSC_div">
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 14,
                }}
                layout="vertical"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <div className="half_div left-half-border">
                  <Form.Item label="Title" name="title">
                    <div style={{ color: "white" }}>{this.state.smartContract.eventName}</div>
                  </Form.Item>
        
                  <Form.Item label="Start date" name="startDate">
                    <DatePicker placeholder={this.state.smartContract.startTime.substring(0, 10)} disabled />
                  </Form.Item>
                  <Form.Item label="Payout Time" name="payoutTime">
                    <DatePicker placeholder={this.state.smartContract.payoutTime.substring(0, 10)} disabled />
                  </Form.Item>
        
                  <Form.Item label="Duration" name="duration">
                    <div style={{ color: "white" }}>{this.state.smartContract.duration} minutes</div>
                  </Form.Item>
        
                  <Form.Item label="Terms & Conditions" name="term">
                    <div style={{ "border-bottom": "1px solid #3B86FF" }}>
                      <a style={{ color: "white" }}>Terms & Conditions.pdf</a>
                    </div>
                  </Form.Item>
                </div>
                <div className="half_div right-half-border">
                  <Form.Item label="Fee (in ETH)" name="fee">
                    <div style={{ color: "white" }}>{this.state.smartContract.payAmount}</div>
                  </Form.Item>
                  <Form.Item label="Location" name="location">
                    <div style={{ color: "white" }}>{this.state.smartContract.location}</div>
                  </Form.Item>
                  <Form.Item
                    label="Receiver Address"
                    name="receiverAddress"
                  >
                    <Input
                      placeholder={this.state.smartContract.receiverWalletAddress}
                      disabled
                    />
                  </Form.Item>
        
                  <Form.Item label="Attachments" name="attachments">
                    <div style={{ "border-bottom": "1px solid #3B86FF" }}>
                      <a style={{ color: "white" }}>ticket.pdf</a>
                    </div>
                  </Form.Item>
                  <Form.Item style={{'text-align':'center'}}>
                    <Button type="danger" size='large' htmlType="submit" style={{'background':'#b2b6b6','border-color': '#b2b6b6'}}>
                        Decline
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;                    
                    <Button type="secondary" size='large' htmlType="submit">
                        Edit
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;     
                    <Button type="primary" size='large' htmlType="submit">
                        Confirm
                    </Button>
                </Form.Item>
                </div>
              </Form>
            </div>
          </Content>
        )
    }

}

export default withAuth0(InviteSC);