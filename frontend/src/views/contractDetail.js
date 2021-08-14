import React from 'react';
import { Form, Input, Button, DatePicker, Upload, InputNumber, Progress } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'antd/dist/antd.css';

//customized css
import '../css/contractDetail.css'


class CreateSC extends React.Component {

    render() {

        const { Dragger } = Upload;

        const onFinish = (values) => {
            console.log('Success:', values);

            //date format
            const startTime = moment(values.startDate).format('YYYY-MM-DD')
            console.log(startTime)
            values.startDate = startTime

            const payoutTime = moment(values.payoutTime).format('YYYY-MM-DD')
            console.log(payoutTime)
            values.payoutTime = payoutTime

            this.props.history.push('/confirm', { values })
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className="createSC_div">

                <div className="create-title">
                    Contract detail
                </div>

                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                >

                    <div className='half_div left-half-border'>

                        <div className="condition">
                            <div className="progress-title">
                                Pending
                            </div>
                            <Progress strokeColor={'#faad14b8'} percent={50} showInfo={false} />
                            <div style={{color:'#fbf5f5cb'}}>
                            2021/8/12
                            </div>
                        </div>

                        <br/>

                        <Form.Item
                            label="Title"
                            name="title"
                        //rules={[{ required: true, message: 'please input the title' }]}
                        >
                            <Input placeholder="EDC" disabled />
                        </Form.Item>



                        <Form.Item label="Start date" name="startDate">
                            <DatePicker placeholder="2021-08-10" disabled />

                        </Form.Item>
                        <Form.Item label="Payout Time" name="payoutTime">
                            <DatePicker placeholder="2021-08-13" disabled />
                        </Form.Item>

                        <Form.Item
                            label="Duration"
                            name="Duration"

                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item
                            label="Terms & Condition"
                            name="term"
                        >
                            <div style={{ 'border-bottom': '1px solid #3B86FF' }}>
                                <a style={{ color: 'white' }}>Terms & Condition.pdf</a>
                            </div>
                        </Form.Item>


                    </div>
                    <div className='half_div right-half-border'>
                        <Form.Item
                            label="Fee (in ETH)"
                            name="fee"
                            rules={[{ required: true, message: 'please input the fee' }]}
                        >
                            <InputNumber prefix="$" placeholder="10" disabled />
                        </Form.Item>
                        <Form.Item
                            label="Location"
                            name="location"
                        // rules={[{ required: true, message: 'Title of Booking' }]}
                        >
                            <Input placeholder="Las Vegas Motor Speedway, Las Vegas" disabled />
                        </Form.Item>
                        <Form.Item
                            label="Receiver Address"
                            name="receiverAddress"
                            rules={[{ required: true, message: 'please input Receiver Address' }]}
                        >
                            <Input placeholder="0xe038b5adebca2cC0Eab655a78E8a87C306854951" disabled />
                        </Form.Item>

                        <Form.Item
                            label="Attachments"
                            name="attachments"

                        >
                            <div style={{ 'border-bottom': '1px solid #3B86FF' }}>
                                <a style={{ color: 'white' }}>ticket.pdf</a>
                            </div>
                        </Form.Item>

                    </div>
                </Form>

            </div >
        )
    }
}

export default CreateSC;
