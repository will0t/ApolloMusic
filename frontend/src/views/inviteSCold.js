import React from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../css/create_sc.css";
import moment from 'moment';
import {
  Form,
  Input,
  Button,
  DatePicker
} from "antd";
import "antd/dist/antd.css";

const InviteSC = () => {
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

  let { id } = useParams();
  const authContext = useAuth0();

  if (id !== testSC.id) {
    return <div>Error 404 Not Found</div>;
  }
//   if (authContext.user === undefined || authContext.user.email !== testSC.recipient) {
//       return <div>Error 401 Unauthorised</div>;
//   }

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
        initialValues={{ remember: true }}
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
      <Button type="text">Edit</Button>
      <Button type="primary">Accept</Button>
    </div>
  );
};

export default InviteSC;
