"use client";
import { useEffect, useState } from "react";
import UserForm from "@/components/UserForm";

export default function Home() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Form</h1>
      <UserForm refreshUsers={fetchUsers} />
      <h2>Users</h2>
      {users.map((u) => (
        <p key={u._id}>
          {u.name} - {u.email}
        </p>
      ))}
    </div>
  );
}