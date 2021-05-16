import React from 'react';
import { Form, Input, Button, DatePicker, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import moment from 'moment';

import apollo from '../Preloader.gif';

//customized css
import '../css/confirm_sc.css'

class ConfirmSC extends React.Component {

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

        //form dunction
        const onFinish = (values) => {
            console.log('Success:', values);

            this.props.history.push('/confirm', { values })
        };

        //form function
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        const dateFormat = 'YYYY/MM/DD';

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
                    initialValues={{ title: data.title, startDate: moment(data.startDate, dateFormat), Duration: data.Duration, fee: data.fee, location: data.location }}
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