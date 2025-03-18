import { Modal, Form, Input, Button, message } from "antd";
import { useState } from "react";

const LoginModal = ({ isModalVisible, handleOk, handleCancel, handleLogin }) => {
  const [email, setEmail] = useState("");

  const onFinish = async () => {
    try {
      await handleLogin(email);
      message.success("User found!");
      handleOk();
    } catch {
      message.error("User not found.");
    }
  };

  return (
    <Modal title="Login" open={isModalVisible} onCancel={handleCancel} footer={null}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email!" }]}>
          <Input placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>Login</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default LoginModal;
