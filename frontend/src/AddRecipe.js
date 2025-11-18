import React, { useState } from "react";
import "./AddRecipe.css";
//this si the main function that will be used when adding a new recipe 
function AddRecipe({onClose, onAddRecipe}) 
{
  //states
  const [title,setTitle]=useState("");
  const [ingredients,setIngredients]=useState("");
  const [instructions,setInstructions]=useState("");
  const [image,setImage]=useState(null);
  
  //form submission to create a new recipe but i cant get it to work
  //will try to fix it after backend is implemnted
  const handleSubmit = (e) => 
  {
    e.preventDefault();
    const newRecipe={title,ingredients,instructions,image};
    console.log("New recipe:",newRecipe);
    
    // Save recipe to localStorage
    if (onAddRecipe) {
      onAddRecipe(newRecipe);
    }
    
    // Reset form after submission
    setTitle("");
    setIngredients("");
    setInstructions("");
    setImage(null);
  };
  
  return (
    // html and setup for creating a recipe pop up window
    <div className="add-recipe-container">
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title of recipe"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Add the ingredients of the recipe"
          value={ingredients}
          onChange={(e)=>setIngredients(e.target.value)}
          required
        />
        <textarea
          placeholder="Add instructions on how to make the recipe"
          value={instructions}
          onChange={(e)=>setInstructions(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e)=>setImage(e.target.files[0])}
        />
        <button type="submit">Create</button>
      </form>
      <button className="close-btn"onClick={onClose}>
        Cancel
      </button>
    </div>
  );
}
export default AddRecipe;