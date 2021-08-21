import React from 'react';
import { Form, Input, Button, DatePicker, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';
import Web3 from 'web3';
import Apollo from '../contracts/ApolloAgreement.json';

import apollo from '../Preloader.gif';

//customized css
import '../css/confirm_sc.css'

class ConfirmSC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            web3: 'undefined',
            apollo: null,
            account: ''
        }
        //this.createAgreement = this.createAgreement.bind(this);
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
    /*
    async createAgreement(payoutTime, destination, amount) {
        if (this.state.apollo !== 'undefined') {
            try {
                await this.state.apollo.methods.createAgreement(payoutTime, [destination]).send({from: this.state.account, value: amount})
            } catch (e) {
                console.log('Error, createAgreement: ', e)
            }
        }
    }
    */

    render() {

        //data from create contract
        let data = this.props.location.state.values;
        console.log(data)

        //dragger component
        const { Dragger } = Upload;

        //form-term：dragger
        const termProps = {
            defaultFileList: [
                {
                    uid: '1',
                    name: data.term,
                    status: 'done',
                    url: data.term,
                }
            ],
        };

        //form-attachment：dragger
        const attachProps = {
            defaultFileList: [
                {
                    uid: '1',
                    name: data.attachments,
                    status: 'done',
                    url: data.attachments,
                }
            ],
        };

        const dateFormat = 'YYYY/MM/DD';

        //form dunction
        const onFinish = (values) => {
            console.log('Success:', values);

            // deploy agreement onto smart contract
            let amount = values.fee;
            // CHANGE this using epoch'ed value of values.payoutTime
            // Need to add payoutTime
            let testpayoutTime = new Date(moment(values.payoffTime, dateFormat)).getTime() / 1000
            console.log(testpayoutTime)
            let payoutTime = 1231233;
            // CHANGE this using added destination field
            let destination = values.receiverAddress;
            // convert ETH to gwei
            amount = amount * 10**18
            console.log(amount)
            console.log(payoutTime)
            console.log(destination)
            //this.createAgreement(payoutTime, destination, amount)
            this.props.history.push({
                pathname: '/success',
                state: { name: values.receiverFName }
            });

        };

        //form function
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };


        return (
            <div className="outer-div">

                <div className="title-div">
                    apollo <img src={apollo} style={{ 'width': '50px', 'height': '50px' }} alt="logo" height="32" />
                </div>
                <h1> Confirm Smart Contract Details
                </h1>

                {/* form start */}
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="vertical"
                    initialValues={{ title: data.title, startDate: moment(data.startDate, dateFormat), Duration: data.Duration, fee: data.fee, location: data.location, payoutTime: moment(data.payoutTime, dateFormat), receiverAddress: data.receiverAddress, receiverFName: data.receiverFName, receiverEmail: data.receiverEmail }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                >
                    <div className='half_div'>

                        {/*form- title 1*/}
                        <Form.Item
                            label="Title"
                            name="title"
                        >
                            <Input disabled />
                        </Form.Item>

                        {/* form-start date 2*/}
                        <Form.Item label="Start date" name="startDate">
                            <DatePicker disabled />

                        </Form.Item>
                        <Form.Item label="Payout Time" name="payoutTime">
                            <DatePicker showTime disabled/>

                        </Form.Item>

                        {/* form-duration 3*/}
                        <Form.Item
                            label="Duration"
                            name="Duration"
                        >
                            <Input suffix="minutes" disabled />
                        </Form.Item>

                        {/* form-term : dragger 4*/}
                        <Form.Item
                            label="Terms & Condition"
                            name="term"
                        >
                            <div>
                                <Dragger maxCount={1} {...termProps} disabled >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                </Dragger>
                            </div>
                        </Form.Item>


                    </div>
                    <div className='half_div'>

                        {/* form-fee 5*/}
                        <Form.Item
                            label="Fee"
                            name="fee"
                        >
                            <Input prefix="$" disabled />
                        </Form.Item>

                        {/* form-location 6 */}
                        <Form.Item
                            label="Location"
                            name="location"
                        >
                            <Input disabled />
                        </Form.Item>
                        <Form.Item
                            label="Receiver First Name"
                            name="receiverFName"
                            rules={[{ required: true, message: 'Please insert First Name of Receiver' }]}
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            label="Receiver Email"
                            name="receiverEmail"
                            rules={[{ required: true, type: "email", message: 'Please insert a valid email' }]}
                        >
                            <Input disabled/>
                        </Form.Item>
                        <Form.Item
                            label="Receiver Wallet Address"
                            name="receiverAddress"
                        // rules={[{ required: true, message: 'Title of Booking' }]}
                        >
                            <Input disabled/>
                        </Form.Item>
                        {/* form-attachment: dragger  7*/}
                        <Form.Item
                            label="Attachments"
                            name="attachments"

                        >
                            <div>
                                <Dragger maxCount={1} {...attachProps} disabled>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                </Dragger>
                            </div>
                        </Form.Item>

                        {/* form- submit button */}
                        <Form.Item style={{'text-align':'center'}}>
                            <Button type="primary" size='large' htmlType="submit" style={{'background':'#b2b6b6','border-color': '#b2b6b6'}}>
                                Decline
                            </Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Button type="primary" size='large' htmlType="submit">
                                Confirm
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
                {/* form end */}

            </div>
        )
    }
}

export default ConfirmSC;
