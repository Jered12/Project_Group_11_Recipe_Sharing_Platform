import React from "react";
import "./RecipeDetail.css";
// this will show the full recipe with the ingredients, instructions
//and the picture when the recipe card is clicked
function RecipeDetail({recipe, onClose, onDelete, isFavorite, onToggleFavorite})
{
  // NEW: Handle favorite toggle
  const handleFavoriteClick = () => {
  if (onToggleFavorite) {
    onToggleFavorite();
  }
};

  return (
    //TODO: for report 2 i want to make this like an overlay when it is clicked 
    //for now it works
    <div className="recipe-detail-container">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      
      {/* NEW: Favorite button - only show if recipe has an id (saved recipes) */}
      {recipe.id && onToggleFavorite && (
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
        </button>
      )}
      
      <h3>Ingredients</h3>
      <p>{recipe.ingredients}</p>
      
      <h3>Instructions</h3>
      <p>{recipe.instructions}</p>
      
      <button className="close-btn" onClick={onClose}>
        Go Back
      </button>
    </div>
  );
}
export default RecipeDetail;