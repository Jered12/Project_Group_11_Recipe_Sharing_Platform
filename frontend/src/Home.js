import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RecipeCard from "./components/RecipeCard";
import AddRecipe from "./AddRecipe";
import RecipeDetail from "./components/RecipeDetail";
import storage from './utils/storage';

//the main home page
function Home() 
{
  //states
  const [showAddRecipe,setShowAddRecipe]=useState(false);
  const [selectedRecipe,setSelectedRecipe]=useState(null);
  
  // State for saved recipes
  const [recipes, setRecipes] = useState([]);
  //  State for favorites
  const [favorites, setFavorites] = useState([]);
  
  //  Load recipes from localStorage on component mount
  useEffect(() => {
    const savedRecipes = storage.getRecipes();
    setRecipes(savedRecipes);
  }, []);

  // Handle adding a new recipe
  const handleAddRecipe = (recipeData) => {
    const newRecipe = storage.addRecipe(recipeData);
    setRecipes(prev => [...prev, newRecipe]);
    setShowAddRecipe(false);
  };

  // Handle deleting a recipe
  const handleDeleteRecipe = (id) => {
    storage.deleteRecipe(id);
    setRecipes(prev => prev.filter(r => r.id !== id));
    setSelectedRecipe(null);
  };

  // Handle toggling favorite status
const handleToggleFavorite = (recipeId) => {
  setFavorites(prev => {
    if (prev.includes(recipeId)) {
      return prev.filter(id => id !== recipeId);
    } else {
      return [...prev, recipeId];
    }
  });
};
  
  //sample recipe that will be replaced when backend gets added with actuall recipes
  const sampleRecipe= 
  {
    title: "Avocado Toast",
    description: "Toasted bread topped with smashed avocado and seasoning.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYF8Tx4WkKVlM3OXT-Id-5NFtGDYa9a339Qg&s",
    ingredients: "2 slices of bread, 1 avocado, salt",
    instructions:
      "Toast the bread then Mash avocado and spread on toast then Add salt.",
  };
  return (
    //html for the homepage where it adds everything together
    //including the navigation bar at the top, the recipe card
    //the sidebar, the add recipe, and the recipe details
    <div>
      <Navbar />
      <div className="main-layout">
        <div className="recipe-section">
          
          <div onClick={()=>setSelectedRecipe(sampleRecipe)}>
            <RecipeCard
              title={sampleRecipe.title}
              description={sampleRecipe.description}
              image={sampleRecipe.image}
            />
          </div>

          {/* Display saved recipes */}
          {recipes.map(recipe => (
            <div key={recipe.id} onClick={()=>setSelectedRecipe(recipe)}>
              <RecipeCard
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
              />
            </div>
          ))}

        </div>
        <Sidebar onAddClick={()=>setShowAddRecipe(true)} />
      </div>
      {/* Pass handleAddRecipe to AddRecipe */}
      {showAddRecipe && (
        <AddRecipe 
          onClose={()=>setShowAddRecipe(false)}
          onAddRecipe={handleAddRecipe}
        />
      )}
      {/* Pass handleDeleteRecipe to RecipeDetail */}
      {selectedRecipe && (
  <RecipeDetail
    recipe={selectedRecipe}
    onClose={() => setSelectedRecipe(null)}
    onDelete={selectedRecipe.id ? () => handleDeleteRecipe(selectedRecipe.id) : null}
    isFavorite={selectedRecipe.id ? favorites.includes(selectedRecipe.id) : false}
    onToggleFavorite={selectedRecipe.id ? () => handleToggleFavorite(selectedRecipe.id) : null}
  />
)}
    </div>
  );
}
export default Home;