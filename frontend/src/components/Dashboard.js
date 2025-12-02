import React from "react";

function Dashboard({ user }) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Dashboard</h1>
      <p><strong>User:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Member since:</strong> {user.joined}</p>
      <p><strong>Favorite recipes:</strong> {favorites.length}</p>

      <button onClick={() => window.history.back()}>⬅ Back</button>
    </div>
  );
}

export default Dashboard;
