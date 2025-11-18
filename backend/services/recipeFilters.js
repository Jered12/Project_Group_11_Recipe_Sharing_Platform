// backend/services/recipeFilters.js
// Filter functions for querying recipes from Firebase

const { db } = require('../config/firebase');

const recipeFilters = {
  
  // Filter by title (search)
  filterByTitle: async (searchTerm) => {
    try {
      const recipesRef = db.collection('recipes');
      const snapshot = await recipesRef.get();
      
      const recipes = [];
      snapshot.forEach(doc => {
        const recipe = { id: doc.id, ...doc.data() };
        if (recipe.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          recipes.push(recipe);
        }
      });
      
      return recipes;
    } catch (error) {
      throw new Error('Error filtering by title: ' + error.message);
    }
  },

  // Filter by ingredients (contains any of the specified ingredients)
  filterByIngredients: async (ingredientsList) => {
    try {
      const recipesRef = db.collection('recipes');
      const snapshot = await recipesRef.get();
      
      const recipes = [];
      snapshot.forEach(doc => {
        const recipe = { id: doc.id, ...doc.data() };
        const hasIngredient = ingredientsList.some(ing => 
          recipe.ingredients.some(recipeIng => 
            recipeIng.toLowerCase().includes(ing.toLowerCase())
          )
        );
        
        if (hasIngredient) {
          recipes.push(recipe);
        }
      });
      
      return recipes;
    } catch (error) {
      throw new Error('Error filtering by ingredients: ' + error.message);
    }
  },

  // Filter by prep time (less than or equal to maxTime in minutes)
  filterByPrepTime: async (maxTime) => {
    try {
      const recipesRef = db.collection('recipes');
      const snapshot = await recipesRef.get();
      
      const recipes = [];
      snapshot.forEach(doc => {
        const recipe = { id: doc.id, ...doc.data() };
        const prepTimeNum = parseInt(recipe.prepTime);
        
        if (!isNaN(prepTimeNum) && prepTimeNum <= maxTime) {
          recipes.push(recipe);
        }
      });
      
      return recipes;
    } catch (error) {
      throw new Error('Error filtering by prep time: ' + error.message);
    }
  },

  // Filter by cook time (less than or equal to maxTime in minutes)
  filterByCookTime: async (maxTime) => {
    try {
      const recipesRef = db.collection('recipes');
      const snapshot = await recipesRef.get();
      
      const recipes = [];
      snapshot.forEach(doc => {
        const recipe = { id: doc.id, ...doc.data() };
        const cookTimeNum = parseInt(recipe.cookTime);
        
        if (!isNaN(cookTimeNum) && cookTimeNum <= maxTime) {
          recipes.push(recipe);
        }
      });
      
      return recipes;
    } catch (error) {
      throw new Error('Error filtering by cook time: ' + error.message);
    }
  },

  // Filter by total time (prep + cook, less than or equal to maxTime)
  filterByTotalTime: async (maxTime) => {
    try {
      const recipesRef = db.collection('recipes');
      const snapshot = await recipesRef.get();
      
      const recipes = [];
      snapshot.forEach(doc => {
        const recipe = { id: doc.id, ...doc.data() };
        const prepTimeNum = parseInt(recipe.prepTime) || 0;
        const cookTimeNum = parseInt(recipe.cookTime) || 0;
        const totalTime = prepTimeNum + cookTimeNum;
        
        if (totalTime <= maxTime) {
          recipes.push(recipe);
        }
      });
      
      return recipes;
    } catch (error) {
      throw new Error('Error filtering by total time: ' + error.message);
    }
  },

  // Filter by difficulty level
  filterByDifficulty: async (difficulty) => {
    try {
      const recipesRef = db.collection('recipes');
      const snapshot = await recipesRef
        .where('difficulty', '==', difficulty.toLowerCase())
        .get();
      
      const recipes = [];
      snapshot.forEach(doc => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      
      return recipes;
    } catch (error) {
      throw new Error('Error filtering by difficulty: ' + error.message);
    }
  },

  // Filter by dietary restrictions (must have ALL specified restrictions)
  filterByDietaryRestrictions: async (restrictions) => {
    try {
      const recipesRef = db.collection('recipes');
      const snapshot = await recipesRef
        .where('dietaryRestrictions', 'array-contains-any', restrictions)
        .get();
      
      const recipes = [];
      snapshot.forEach(doc => {
        const recipe = { id: doc.id, ...doc.data() };
        
        // Check if recipe has ALL specified restrictions
        const hasAllRestrictions = restrictions.every(restriction =>
          recipe.dietaryRestrictions.includes(restriction)
        );
        
        if (hasAllRestrictions) {
          recipes.push(recipe);
        }
      });
      
      return recipes;
    } catch (error) {
      throw new Error('Error filtering by dietary restrictions: ' + error.message);
    }
  },

  // Combined filter (apply multiple filters at once)
  filterRecipes: async (filters) => {
    try {
      let recipesRef = db.collection('recipes');
      let query = recipesRef;
      
      // Apply difficulty filter if provided
      if (filters.difficulty) {
        query = query.where('difficulty', '==', filters.difficulty.toLowerCase());
      }
      
      // Apply dietary restrictions filter if provided
      if (filters.dietaryRestrictions && filters.dietaryRestrictions.length > 0) {
        query = query.where('dietaryRestrictions', 'array-contains-any', filters.dietaryRestrictions);
      }
      
      const snapshot = await query.get();
      let recipes = [];
      
      snapshot.forEach(doc => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      
      // Apply client-side filters for more complex queries
      
      // Filter by title
      if (filters.title) {
        recipes = recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(filters.title.toLowerCase())
        );
      }
      
      // Filter by ingredients
      if (filters.ingredients && filters.ingredients.length > 0) {
        recipes = recipes.filter(recipe =>
          filters.ingredients.some(ing =>
            recipe.ingredients.some(recipeIng =>
              recipeIng.toLowerCase().includes(ing.toLowerCase())
            )
          )
        );
      }
      
      // Filter by prep time
      if (filters.maxPrepTime) {
        recipes = recipes.filter(recipe => {
          const prepTime = parseInt(recipe.prepTime);
          return !isNaN(prepTime) && prepTime <= filters.maxPrepTime;
        });
      }
      
      // Filter by cook time
      if (filters.maxCookTime) {
        recipes = recipes.filter(recipe => {
          const cookTime = parseInt(recipe.cookTime);
          return !isNaN(cookTime) && cookTime <= filters.maxCookTime;
        });
      }
      
      // Filter by total time
      if (filters.maxTotalTime) {
        recipes = recipes.filter(recipe => {
          const prepTime = parseInt(recipe.prepTime) || 0;
          const cookTime = parseInt(recipe.cookTime) || 0;
          const totalTime = prepTime + cookTime;
          return totalTime <= filters.maxTotalTime;
        });
      }
      
      return recipes;
    } catch (error) {
      throw new Error('Error filtering recipes: ' + error.message);
    }
  },

  // Get all recipes (no filter)
  getAllRecipes: async () => {
    try {
      const recipesRef = db.collection('recipes');
      const snapshot = await recipesRef.get();
      
      const recipes = [];
      snapshot.forEach(doc => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      
      return recipes;
    } catch (error) {
      throw new Error('Error getting all recipes: ' + error.message);
    }
  }
};

module.exports = recipeFilters;