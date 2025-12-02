import React, { useState } from "react";

function Profile({ user, onUpdate, onNavigate }) {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const saveChanges = () => {
    onUpdate({ ...user, username, email });
    alert("Profile updated!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>👤 Profile</h1>

      <label>Username:</label>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <label>Email:</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />

      <button onClick={saveChanges}>Save</button>
      <button onClick={() => onNavigate("dashboard")}>Go to Dashboard</button>
    </div>
  );
}

export default Profile;
