import { useState, useEffect } from "react";
import { fetchUsers, deleteUser, updateUser, createUser } from "../services/userService";
import { message } from "antd";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const userData = await fetchUsers();
      setUsers(userData);
    } catch {
      message.error("Failed to fetch users.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("User deleted successfully.");
      loadUsers();
    } catch {
      message.error("Failed to delete user.");
    }
  };

  const handleSave = async (id, values, isEditing) => {
    try {
      if (isEditing) {
        await updateUser(id, values);
      } else {
        await createUser(values);
      }
      message.success("User saved successfully.");
      loadUsers();
    } catch {
      message.error("Failed to save user.");
    }
  };

  return { users, loading, handleDelete, handleSave };
};
