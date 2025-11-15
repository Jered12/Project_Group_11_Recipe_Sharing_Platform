import React from "react";

//this function will hold the recipe cards and it will have a title description
//and image in the home page
function RecipeCard({title,description,image}) 
{
  return (
    <div className="recipe-card">
      <img src={image} alt={title} />

      <div className="recipe-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

    </div>
  );
}

export default RecipeCard;