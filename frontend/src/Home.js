import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RecipeCard from "./components/RecipeCard";
import AddRecipe from "./AddRecipe";
import RecipeDetail from "./components/RecipeDetail";
import Favorites from "./components/Favorites";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";

function Home() {

  // ---------- PAGE NAVIGATION ----------
  const [page, setPage] = useState("home");

  // ---------- USER PROFILE ----------
  const [user, setUser] = useState({
    username: "GuestUser",
    email: "guest@example.com",
    joined: "2025-02-01"
  });

  // ---------- RECIPES ----------
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Avocado Toast",
      description: "Toasted bread topped with smashed avocado and seasoning.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYF8Tx4WkKVlM3OXT-Id-5NFtGDYa9a339Qg&s",
      ingredients: "2 slices of bread, 1 avocado, salt",
      instructions:
        "Toast the bread then mash avocado and spread on toast then add salt.",
      averageRating: 0,
      comments: []
    }
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);

  // ---------- HANDLE RATING UPDATE ----------
  const handleRateUpdate = (recipeId, newAverage) => {
    setRecipes(prev =>
      prev.map(r =>
        r.id === recipeId ? { ...r, averageRating: newAverage } : r
      )
    );

    if (selectedRecipe?.id === recipeId) {
      setSelectedRecipe(prev => ({ ...prev, averageRating: newAverage }));
    }
  };

  const checkFilter = (recipe, filterType) => {
    if (!filterType) return true;

    const ingredients = recipe.ingredients.toLowerCase();

    const rules = {
      vegan: ["chicken", "beef", "pork", "fish", "egg", "milk", "cheese", "butter"],
      nutfree: ["almond", "peanut", "walnut", "cashew"],
      glutenfree: ["bread", "wheat", "flour", "pasta"]
    };

    return !rules[filterType].some(item => ingredients.includes(item));
  };

  return (
    <div>
      <Navbar onNavigate={setPage} />

      {page === "home" && (
        <>
          <div className="main-layout">
            <div className="recipe-section">
              {recipes.map(recipe =>
                checkFilter(recipe, activeFilter) && (
                  <div key={recipe.id} onClick={() => setSelectedRecipe(recipe)}>
                    <RecipeCard
                      title={recipe.title}
                      description={recipe.description}
                      image={recipe.image}
                    />
                  </div>
                )
              )}
            </div>

            <Sidebar
              onAddClick={() => setShowAddRecipe(true)}
              onFilter={setActiveFilter}
            />
          </div>

          {showAddRecipe && (
            <AddRecipe onClose={() => setShowAddRecipe(false)} />
          )}
        </>
      )}

      {page === "favorites" && (
        <Favorites recipes={recipes} onSelect={setSelectedRecipe} />
      )}

      {page === "profile" && (
        <Profile
          user={user}
          onUpdate={setUser}
          onNavigate={setPage}
        />
      )}

      {page === "dashboard" && (
        <Dashboard user={user} />
      )}

      {selectedRecipe && (
        <RecipeDetail
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onRate={handleRateUpdate}
        />
      )}
    </div>
  );
}

export default Home;
