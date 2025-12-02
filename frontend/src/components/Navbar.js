import React from "react";

function Navbar({ onNavigate }) {
  return (
    <div className="navbar">
      <div className="logo">🍴 RecipeShare</div>

      <input
        className="search-bar"
        type="text"
        placeholder="Search recipes..."
      />

      <button onClick={() => onNavigate("home")}>Home</button>
      <button onClick={() => onNavigate("favorites")}>Favorites</button>
      <button onClick={() => onNavigate("profile")}>👤 Profile</button>
    </div>
  );
}

export default Navbar;
