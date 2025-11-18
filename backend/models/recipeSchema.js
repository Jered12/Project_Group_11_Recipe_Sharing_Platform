// backend/models/recipeSchema.js
// Required attributes for recipes in Firebase

const recipeSchema = {
  // Required fields
  id: '',                    // Auto-generated unique ID
  title: '',                 // Recipe title (required)
  description: '',           // Short description
  ingredients: [],           // Array of ingredient strings (required)
  instructions: [],          // Array of instruction strings (required)
  
  // Time fields (required)
  prepTime: '',              // Prep time in minutes (e.g., "15")
  cookTime: '',              // Cook time in minutes (e.g., "30")
  totalTime: '',             // Total time (calculated: prep + cook)
  
  // Difficulty (required)
  difficulty: '',            // Options: "easy", "medium", "hard"
  
  // Dietary restrictions (required - can be empty array)
  dietaryRestrictions: [],   // Array: ["vegetarian", "vegan", "gluten-free", "dairy-free", "nut-free", "keto", "paleo"]
  
  // Optional fields
  servings: '',              // Number of servings
  image: '',                 // Image URL
  cuisine: '',               // Cuisine type (Italian, Mexican, etc.)
  category: '',              // Meal type (breakfast, lunch, dinner, dessert, snack)
  
  // Metadata
  createdAt: '',             // Timestamp
  updatedAt: '',             // Timestamp
  author: '',                // User ID of creator
  isFavorite: false          // For user favorites
};

// Validation function
const validateRecipe = (recipe) => {
  const errors = [];
  
  // Required fields validation
  if (!recipe.title || recipe.title.trim() === '') {
    errors.push('Title is required');
  }
  
  if (!recipe.ingredients || recipe.ingredients.length === 0) {
    errors.push('At least one ingredient is required');
  }
  
  if (!recipe.instructions || recipe.instructions.length === 0) {
    errors.push('At least one instruction is required');
  }
  
  if (!recipe.prepTime || recipe.prepTime.trim() === '') {
    errors.push('Prep time is required');
  }
  
  if (!recipe.cookTime || recipe.cookTime.trim() === '') {
    errors.push('Cook time is required');
  }
  
  if (!recipe.difficulty || !['easy', 'medium', 'hard'].includes(recipe.difficulty.toLowerCase())) {
    errors.push('Difficulty must be: easy, medium, or hard');
  }
  
  if (!Array.isArray(recipe.dietaryRestrictions)) {
    errors.push('Dietary restrictions must be an array');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = { recipeSchema, validateRecipe };