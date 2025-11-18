// backend/routes/recipeRoutes.js
// Express routes for recipe filtering

const express = require('express');
const router = express.Router();
const recipeFilters = require('../services/recipeFilters');
const { db } = require('../config/firebase');
const { validateRecipe } = require('../models/recipeSchema');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await recipeFilters.getAllRecipes();
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST - Filter recipes with multiple criteria
router.post('/filter', async (req, res) => {
  try {
    const filters = req.body;
    
    const recipes = await recipeFilters.filterRecipes(filters);
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      filters: filters,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Filter by title
router.get('/search/:title', async (req, res) => {
  try {
    const { title } = req.params;
    const recipes = await recipeFilters.filterByTitle(title);
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Filter by difficulty
router.get('/difficulty/:level', async (req, res) => {
  try {
    const { level } = req.params;
    
    if (!['easy', 'medium', 'hard'].includes(level.toLowerCase())) {
      return res.status(400).json({
        success: false,
        error: 'Difficulty must be: easy, medium, or hard'
      });
    }
    
    const recipes = await recipeFilters.filterByDifficulty(level);
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST - Filter by ingredients
router.post('/ingredients', async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Ingredients must be a non-empty array'
      });
    }
    
    const recipes = await recipeFilters.filterByIngredients(ingredients);
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Filter by prep time
router.get('/preptime/:maxTime', async (req, res) => {
  try {
    const maxTime = parseInt(req.params.maxTime);
    
    if (isNaN(maxTime) || maxTime <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Max time must be a positive number'
      });
    }
    
    const recipes = await recipeFilters.filterByPrepTime(maxTime);
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET - Filter by cook time
router.get('/cooktime/:maxTime', async (req, res) => {
  try {
    const maxTime = parseInt(req.params.maxTime);
    
    if (isNaN(maxTime) || maxTime <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Max time must be a positive number'
      });
    }
    
    const recipes = await recipeFilters.filterByCookTime(maxTime);
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST - Filter by dietary restrictions
router.post('/dietary', async (req, res) => {
  try {
    const { restrictions } = req.body;
    
    if (!Array.isArray(restrictions) || restrictions.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Restrictions must be a non-empty array'
      });
    }
    
    const validRestrictions = [
      'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 
      'nut-free', 'keto', 'paleo'
    ];
    
    const invalidRestrictions = restrictions.filter(r => 
      !validRestrictions.includes(r.toLowerCase())
    );
    
    if (invalidRestrictions.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Invalid dietary restrictions: ${invalidRestrictions.join(', ')}`,
        validOptions: validRestrictions
      });
    }
    
    const recipes = await recipeFilters.filterByDietaryRestrictions(restrictions);
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST - Create a new recipe (bonus - for testing)
router.post('/', async (req, res) => {
  try {
    const recipeData = req.body;
    
    // Validate recipe data
    const validation = validateRecipe(recipeData);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors
      });
    }
    
    // Add timestamps
    recipeData.createdAt = new Date().toISOString();
    recipeData.updatedAt = new Date().toISOString();
    
    // Add to Firebase
    const docRef = await db.collection('recipes').add(recipeData);
    
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      id: docRef.id,
      data: { id: docRef.id, ...recipeData }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;