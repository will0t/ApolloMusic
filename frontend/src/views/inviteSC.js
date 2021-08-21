import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import "../css/create_sc.css";
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  DatePicker
} from "antd";
import "antd/dist/antd.css";
import Web3 from 'web3';
import Apollo from '../contracts/ApolloAgreement.json';

let testSC = {
    id: "1234",
    sender: {
      name: "DJ Psyder",
      email: "djpsyder@gmail.com",
      wallet: "102dk2oJf",
    },
    recipient: "bennguyen96@gmail.com",
    title: "Beyond the Valley 2021",
    ethAmount: 3.2,
    startTime: "2021-08-19",
    duration: 60,
    location: {
      city: "Melbourne",
      country: "AUS",
    },
    payoutTime: "2021-15-19",
};

class InviteSC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: 'undefined',
            apollo: null,
            account: ''
        }
        this.createAgreement = this.createAgreement.bind(this);
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

    async createAgreement(payoutTime, destination, amount) {
        if (this.state.apollo !== 'undefined') {
            try {
                await this.state.apollo.methods.createAgreement(payoutTime, [destination]).send({from: this.state.account, value: amount})
            } catch (e) {
                console.log('Error, createAgreement: ', e)
            }
        }
    }

    render() {
        if (this.props.match.params.id !== testSC.id) {
            return <div>Error 404 Not Found</div>;
        }
        
        const authContext = this.props.auth0;
        console.log(authContext)
        //   if (authContext.user === undefined || authContext.user.email !== testSC.recipient) {
        //       return <div>Error 401 Unauthorised</div>;
        //   }

        const dateFormat = 'YYYY/MM/DD';
        //form dunction
        const onFinish = (values) => {
            console.log('Success:', values);

            // deploy agreement onto smart contract
            let amount = values.fee;
            let payoutTime = new Date(moment(values.payoutTime, dateFormat)).getTime() / 1000
            let destination = values.receiverAddress;
            // convert ETH to gwei
            amount = amount * 10**18
            this.createAgreement(payoutTime, destination, amount)

            this.props.history.push('/success')

        };

        //form function
        const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        };
        return (
            <div className="createSC_div">
              <div className="create-title">Invitation Details</div>
        
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
                    <div style={{ color: "white" }}>{testSC.title}</div>
                  </Form.Item>
        
                  <Form.Item label="Start date" name="startDate">
                    <DatePicker placeholder="2021-08-10" disabled />
                  </Form.Item>
                  <Form.Item label="Payout Time" name="payoutTime">
                    <DatePicker placeholder="2021-08-13" disabled />
                  </Form.Item>
        
                  <Form.Item label="Duration" name="Duration">
                    <div style={{ color: "white" }}>{testSC.duration} minutes</div>
                  </Form.Item>
        
                  <Form.Item label="Terms & Conditions" name="term">
                    <div style={{ "border-bottom": "1px solid #3B86FF" }}>
                      <a style={{ color: "white" }}>Terms & Conditions.pdf</a>
                    </div>
                  </Form.Item>
                </div>
                <div className="half_div right-half-border">
                  <Form.Item label="Fee (in ETH)" name="fee">
                    <div style={{ color: "white" }}>{testSC.ethAmount}</div>
                  </Form.Item>
                  <Form.Item label="Location" name="location">
                    <div style={{ color: "white" }}>{testSC.location.city}, {testSC.location.country}</div>
                  </Form.Item>
                  <Form.Item
                    label="Receiver Address"
                    name="receiverAddress"
                  >
                    <Input
                      placeholder="0xe038b5adebca2cC0Eab655a78E8a87C306854951"
                      disabled
                    />
                  </Form.Item>
        
                  <Form.Item label="Attachments" name="attachments">
                    <div style={{ "border-bottom": "1px solid #3B86FF" }}>
                      <a style={{ color: "white" }}>ticket.pdf</a>
                    </div>
                  </Form.Item>
                </div>
              </Form>
              <Button type="danger">Decline</Button>
              <Button type="secondary">Edit</Button>
              <Button type="primary">Accept</Button>
            </div>
        )
    }

}

export default withAuth0(InviteSC);