const STORAGE_KEY = 'recipeApp_recipes';

export const storage = {
  // Get all recipes from localStorage
  getRecipes: () => {
    try {
      const recipes = localStorage.getItem(STORAGE_KEY);
      return recipes ? JSON.parse(recipes) : [];
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return [];
    }
  },

  // Save recipes to localStorage
  saveRecipes: (recipes) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  },

  // Add a single recipe
  addRecipe: (recipe) => {
    const recipes = storage.getRecipes();
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    recipes.push(newRecipe);
    storage.saveRecipes(recipes);
    return newRecipe;
  },

  // Update a recipe
  updateRecipe: (id, updatedRecipe) => {
    const recipes = storage.getRecipes();
    const index = recipes.findIndex(r => r.id === id);
    if (index !== -1) {
      recipes[index] = { ...recipes[index], ...updatedRecipe, updatedAt: new Date().toISOString() };
      storage.saveRecipes(recipes);
      return recipes[index];
    }
    return null;
  },

  // Delete a recipe
  deleteRecipe: (id) => {
    const recipes = storage.getRecipes();
    const filtered = recipes.filter(r => r.id !== id);
    storage.saveRecipes(filtered);
    return filtered;
  },

  // Clear all recipes
  clearAllRecipes: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Get favorites list
  getFavorites: () => {
    try {
      const favorites = localStorage.getItem(STORAGE_KEY + '_favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  },

  // Save favorites list
  saveFavorites: (favorites) => {
    try {
      localStorage.setItem(STORAGE_KEY + '_favorites', JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
      return false;
    }
  },

  // Toggle favorite status
  toggleFavorite: (recipeId) => {
    const favorites = storage.getFavorites();
    const index = favorites.indexOf(recipeId);
    
    if (index !== -1) {
      // Remove from favorites
      favorites.splice(index, 1);
    } else {
      // Add to favorites
      favorites.push(recipeId);
    }
    
    storage.saveFavorites(favorites);
    return favorites;
  },

  // Check if recipe is favorited
  isFavorite: (recipeId) => {
    const favorites = storage.getFavorites();
    return favorites.includes(recipeId);
  }
};

export default storage;