import React from "react";
import "./RecipeDetail.css";

// this will show the full recipe with the ingredients, instructions
//and the picture when the recipe card is clicked
function RecipeDetail({recipe,onClose}) 
{

  return (
    //TODO: for report 2 i want to make this like an overlay when it is clicked 
    //for now it works
    <div className="recipe-detail-container">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      
      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>
      
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>

        <button className="close-btn"onClick={onClose}>
          Go Back
        </button>

    </div>
  );
}

export default RecipeDetail;