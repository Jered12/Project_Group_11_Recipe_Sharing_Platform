import React from "react";

function Navbar() 
{
  return (
    //main naviagtion bar at the top of the page container
    //it has the logo, name, and serach bar
    <div className="navbar">

      <div className="logo">🍴 RecipeShare</div>
      <input className="search-bar"type="text"placeholder="Search recipes..." />

    </div>
  );
}

export default Navbar;