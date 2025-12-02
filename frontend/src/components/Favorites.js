import React from "react";
import RecipeCard from "./RecipeCard";

function Favorites({ recipes, onSelect }) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Favorites </h1>

      {favoriteRecipes.length === 0 && <p>No favorites yet.</p>}

      {favoriteRecipes.map(recipe => (
        <div key={recipe.id} onClick={() => onSelect(recipe)}>
          <RecipeCard
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
          />
        </div>
      ))}
    </div>
  );
}

export default Favorites;
