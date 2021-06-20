import { useState } from "react";
import { Form, Input } from "antd";
import { AwesomeButton } from "react-awesome-button";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import Spinner from "react-spinners/CircleLoader";

const mutation = loader("../queries/sendEmail.graphql");

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    sm: {
      offset: 6,
      span: 18,
    },
  },
  className: "antd-form-tail",
};

const ContactForm = () => {
  const [sendEmail, { loading, data }] = useMutation(mutation);
  const [emailSent, setEmailSent] = useState(false);

  const onFinish = (values) => {
    sendEmail({ variables: values }).then(() => {
      console.log(data);
      setEmailSent(true);
    });
  };

  return (
    <>
      {emailSent && <div className="Contact-form-message">Email sent!</div>}
      {loading && (
        <div className="Contact-form-message">
          <div className="Contact-form-spinner">
            <Spinner size={50} color="#8cb598" />
          </div>
          <div>Sending an email...</div>
        </div>
      )}
      {!emailSent && !loading && (
        <Form
          {...layout}
          name="basic"
          initialValues={{}}
          onFinish={onFinish}
          size="large"
        >
          <Form.Item
            label={<div className="antd-form-label">Name</div>}
            name="name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Enter your name",
              },
            ]}
          >
            <Input placeholder="Your name" />
          </Form.Item>

          <Form.Item
            label={<div className="antd-form-label">Email</div>}
            name="email"
            hasFeedback
            rules={[
              {
                required: true,
                type: "email",
                message: "Enter valid email address",
              },
            ]}
          >
            <Input placeholder="Email address for the reply" />
          </Form.Item>

          <Form.Item
            label={<div className="antd-form-label">Message</div>}
            name="message"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Enter your message",
              },
            ]}
          >
            <Input.TextArea
              rows={9}
              placeholder="Tell me why you decided to contact me"
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <AwesomeButton type="primary" htmlType="Submit" size="large">
              Submit
            </AwesomeButton>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ContactForm;
