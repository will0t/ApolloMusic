import React from 'react';
import { Form, Input, Button, DatePicker, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { InboxOutlined } from '@ant-design/icons';

import 'antd/dist/antd.css';

//customized css
import '../css/create_sc.css'


class CreateSC extends React.Component {

    render() {

        const { Dragger } = Upload;

        const onFinish = (values) => {
            console.log('Success:', values);

            this.props.history.push('/confirm', { values })
        };

        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div style={{ 'paddingLeft': '50px','paddingTop':'20px' }}>

                <h1>Create Contract</h1>


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
                    <div className='half_div'>
                        <Form.Item
                            label="Title"
                            name="title"
                        // rules={[{ required: true, message: 'Title of Booking' }]}
                        >
                            <Input />
                        </Form.Item>



                        <Form.Item label="Start date">
                            <DatePicker />

                        </Form.Item>

                        <Form.Item
                            label="Duration"
                            name="Duration"
                        // rules={[{ required: true, message: 'Duration' }]}
                        >
                            <Input suffix="minutes" />
                        </Form.Item>

                        <Form.Item
                            label="Terms & Condition"
                            name="term"
                        >
                            <div>
                                <Dragger maxCount={1}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                </Dragger>
                            </div>
                        </Form.Item>


                    </div>
                    <div className='half_div'>
                        <Form.Item
                            label="Fee"
                            name="fee"
                        // rules={[{ required: true, message: 'Title of Booking' }]}
                        >
                            <Input prefix="$" />
                        </Form.Item>
                        <Form.Item
                            label="Location"
                            name="location"
                        // rules={[{ required: true, message: 'Title of Booking' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Attachments"
                            name="attachments"

                        >
                            <div>
                                <Dragger maxCount={1}>
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                </Dragger>
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" size='large' htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>

                    </div>


                </Form>

            </div >
        )
    }
}

export default CreateSC;


