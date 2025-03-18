import { Modal, Form, Input } from "antd";
import { useEffect } from "react";

const UserForm = ({ visible, onCancel, onSave, user }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    } else {
      form.resetFields();
    }
  }, [user]);

  return (
    <Modal
      title={user ? "Edit User" : "Add User"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={(values) => onSave(user?.id, values, !!user)}>
        <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="resume" label="Resume">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
