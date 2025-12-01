import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RecipeCard from "./components/RecipeCard";
import AddRecipe from "./AddRecipe";
import RecipeDetail from "./components/RecipeDetail";

//the main home page
function Home() 
{
  //states
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);

  //temporary recipe until backend is added
  const sampleRecipe = {
    title: "Avocado Toast",
    description: "Toasted bread topped with smashed avocado and seasoning.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYF8Tx4WkKVlM3OXT-Id-5NFtGDYa9a339Qg&s",
    ingredients: "2 slices of bread, 1 avocado, salt",
    instructions:
      "Toast the bread then Mash avocado and spread on toast then Add salt.",
    rating: 0,
    comments: []
  };

  // chck filetr function
  const checkFilter = (recipe, filterType) => 
  {
    //if there are no filters return all the recipies
    if (!filterType)
    { 
      return true;
    }
    //make all the ingrediants lowercase
    const ingredients = recipe.ingredients.toLowerCase();
    //now if certain words are seen in the ingredients they should not be in the fileter type
    const rules = 
    {
      vegan: ["chicken", "beef", "pork", "fish", "egg", "milk", "cheese", "butter"],
      nutfree: ["almond", "peanut", "walnut", "cashew"],
      glutenfree: ["bread", "wheat", "flour", "pasta"]
    };

    // leave true if there are no forbiddent items
    return !rules[filterType].some(item => ingredients.includes(item));
  };

  // figure out if recipe matches current filter
  const recipeMatchesFilter = checkFilter(sampleRecipe, activeFilter);

  // update recipe stars when they are clicked
  const handleRating = (newRating) => 
  {
    setSelectedRecipe({ ...selectedRecipe, rating: newRating });
  };

  // update recipe comments when they are added
  const handleAddComment = (text) => 
  {
    setSelectedRecipe({
      ...selectedRecipe,
      comments: [...selectedRecipe.comments, text]
    });
  };

  return (
    <div>
      <Navbar />

      <div className="main-layout">
        <div className="recipe-section">

          {/* Only show recipe if it passes filter */}
          {recipeMatchesFilter && (
            <div onClick={() => setSelectedRecipe(sampleRecipe)}>
              <RecipeCard
                title={sampleRecipe.title}
                description={sampleRecipe.description}
                image={sampleRecipe.image}
              />
            </div>
          )}
        </div>

        {/* SIDEBAR WITH FILTERS + ADD BUTTON */}
        <Sidebar
          onAddClick={() => setShowAddRecipe(true)}
          onFilter={(filterType) => setActiveFilter(filterType)}
        />
      </div>

      {/* ADD RECIPE FORM */}
      {showAddRecipe && (
        <AddRecipe onClose={() => setShowAddRecipe(false)} />
      )}

      {/* FULL RECIPE DETAIL VIEW */}
      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onRate={handleRating}
          onComment={handleAddComment}
        />
      )}
    </div>
  );
}

export default Home;