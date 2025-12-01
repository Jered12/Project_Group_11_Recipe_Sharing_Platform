import React from "react";

//this function is just for the sidevar on the right where users can filter
//diffrent recipes based on what they desire
function Sidebar({ onAddClick, onFilter }) 
{
  //for now there are no filters that if for report 2
  //there is only the button to add a new recipe
  return (
    <div className="sidebar">
      <h3>Filter Options</h3>
      
      <button onClick={() => onFilter("vegan")}>Vegan</button>
      <button onClick={() => onFilter("glutenfree")}>Gluten-Free</button>
      <button onClick={() => onFilter("nutfree")}>Nut-Free</button>



      <hr />

      <button className="add-button"onClick={onAddClick}>
        Add New Recipe
      </button>
    </div>
  );
}

export default Sidebar;