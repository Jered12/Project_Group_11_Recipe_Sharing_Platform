import React, { useState, useEffect } from "react";
import "./RecipeDetail.css";

function RecipeDetail({ recipe, onClose, onRate }) {

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Load comments from backend
  useEffect(() => {
    fetch(`http://localhost:3001/comments/${recipe.id}`)
      .then(res => res.json())
      .then(data => setComments(data.comments));
  }, [recipe.id]);

  // Send comment to backend
  const handleAddComment = async () => {
    if (!comment.trim()) return;

    await fetch("http://localhost:3001/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: recipe.id, comment })
    });

    const res = await fetch(`http://localhost:3001/comments/${recipe.id}`);
    const data = await res.json();
    setComments(data.comments);

    setComment("");
  };
  //favorite function
  const handleFavorite = (id) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Recipe added to favorites!");
  } else {
    alert("Already in favorites.");
  }
};


  // Handle rating click
  const handleRate = async (value) => {
    await fetch("http://localhost:3001/rate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: recipe.id, rating: value }),
    });

    const res = await fetch(`http://localhost:3001/rating/${recipe.id}`);
    const data = await res.json();

    if (onRate) {
      onRate(recipe.id, data.average);
    }
  };

  // UI stars
  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <span
          key={index}
          className={starValue <= (recipe.averageRating || 0) ? "star filled" : "star"}
          onClick={() => handleRate(starValue)}
        >
          *
        </span>
      );
    });
  };

  return (
    <div className="recipe-detail-overlay">
      <div className="recipe-detail-container">

        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />

        <h3>Ingredients</h3>
        <p>{recipe.ingredients}</p>

        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>

        <h3>Rating</h3>
        <div className="rating-stars">{renderStars()}</div>
        <p>Average Rating: * {Number(recipe.averageRating || 0).toFixed(1)}</p>

        <h3>Comments</h3>
        <ul className="comments-list">
          {comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
        <button onClick={() => handleFavorite(recipe.id)}>
        Add to Favorites
        </button>


        <textarea
          className="comment-box"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="comment-btn" onClick={handleAddComment}>Add Comment</button>
        <button className="close-btn" onClick={onClose}>Go Back</button>
      </div>
    </div>
  );
}

export default RecipeDetail;
