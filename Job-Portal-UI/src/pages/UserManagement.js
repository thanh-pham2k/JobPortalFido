import React, { useState } from "react";
import { Button } from "antd";
import { useUsers } from "../hooks/useUsers";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";

const UserManagement = () => {
  const { users, loading, handleDelete, handleSave } = useUsers();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (record) => {
    setEditingUser(record);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  return (
    <>
      <h1>User Management</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add User
      </Button>
      <UserTable users={users} loading={loading} onEdit={handleEdit} onDelete={handleDelete} />
      <UserForm visible={isModalVisible} onCancel={() => setIsModalVisible(false)} onSave={handleSave} user={editingUser} />
    </>
  );
};

export default UserManagement;
