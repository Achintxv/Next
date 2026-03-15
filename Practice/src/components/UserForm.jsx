"use client";
import { useState } from "react";

const UserForm = ({ refreshUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email }),
    });

    setName("");
    setEmail("");

    refreshUsers();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;