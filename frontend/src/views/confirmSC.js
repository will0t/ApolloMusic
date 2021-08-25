import React from 'react';
import axios from 'axios';
import { Form, Input, Button, DatePicker, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';
import apollo from '../Preloader.gif';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    useMutation
} from "@apollo/client";
import { withAuth0 } from "@auth0/auth0-react";

//customized css
import confirm_sc from '../css/confirm_sc.module.css'

class ConfirmSC extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

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
            // let amount = values.fee;
            //let payoutTime = new Date(moment(values.payoutTime, dateFormat)).getTime() / 1000
            // convert ETH to gwei
            // amount = amount * 10**18
            let DTstartDate = new Date(values.startDate).toISOString()
            let DTpayoutTime = new Date(values.payoutTime).toISOString()
            //this.createAgreement(payoutTime, destination, amount)
            var sender_name = "NOT_LOGGED_IN"
            if (this.props.auth0.user !== undefined) {
                sender_name = this.props.auth0.user.nickname
            }
            var sender_email = "not_logged_in@gmail.com"
            if (this.props.auth0.user !== undefined) {
                sender_email = this.props.auth0.user.email
            }

            axios.post("http://127.0.0.1:8000/graphql/", {
                "query": `mutation createSmartContract {
                createSmartContract(
                    eventName: \"${values.title}\", 
                    creatorName: \"${sender_name}\", 
                    creatorEmail: \"${sender_email}\", 
                    receiverEmail: \"${values.receiverEmail}\",
                    startTime: \"${DTstartDate}\",
                    payoutTime: \"${DTpayoutTime}\",
                    duration: ${values.duration}, 
                    payAmount: \"${values.fee}\", 
                    location: \"${values.location}\", 
                    receiverWalletAddress: \"${values.receiverAddress}\",
                    receiverName: \"${values.receiverFName}\"
                ) {
                    smartContract {
                        id
                    }
                    ok
                }}
                
                `,
                "variables": null,
                "operationName":"createSmartContract"
            })
            .then(response => {
                console.log(response)
                this.props.history.push({
                    pathname: '/success',
                    state: {
                        name: values.receiverFName,
                        contractId: response.data.data.createSmartContract.smartContract.id
                    }
                });
            })
            .catch(error => {console.log(error)})



        };

        //form function
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };


        return (
            <div className={confirm_sc.outer_div}>

                <div className={confirm_sc.title_div}>
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
                    initialValues={{ title: data.title, startDate: moment(data.startDate, dateFormat), duration: data.duration, fee: data.fee, location: data.location, payoutTime: moment(data.payoutTime, dateFormat), receiverAddress: data.receiverAddress, receiverFName: data.receiverFName, receiverEmail: data.receiverEmail }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                >
                    <div className={confirm_sc.half_div}>

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
                            name="duration"
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
                    <div className={confirm_sc.half_div}>

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

export default withAuth0(ConfirmSC);
