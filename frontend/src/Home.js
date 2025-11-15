import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RecipeCard from "./components/RecipeCard";
import AddRecipe from "./AddRecipe";
import RecipeDetail from "./components/RecipeDetail";

//the main hoome page
function Home() 
{
  //states
  const [showAddRecipe,setShowAddRecipe]=useState(false);
  const [selectedRecipe,setSelectedRecipe]=useState(null);
  
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
        </div>

        <Sidebar onAddClick={()=>setShowAddRecipe(true)} />
      </div>

      {showAddRecipe && <AddRecipe onClose={()=>setShowAddRecipe(false)} />}

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={()=>setSelectedRecipe(null)}
        />
      )}
    </div>
  );
}

export default Home;