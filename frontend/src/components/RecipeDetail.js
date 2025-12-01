import React, { useState } from "react";
import "./RecipeDetail.css";

// this will show the full recipe with the ingredients, instructions
//and the picture when the recipe card is clicked
function RecipeDetail({ recipe, onClose, onRate }) 
{
  //states for comments
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  //add ne wcommnet to list
  const handleAddComment = () => 
  {
    setComments([...comments, comment]);
    setComment(""); 
  };

  // function that will render the stars
  const renderStars = () => 
  {
    return [...Array(5)].map((_, index) => 
    {
      const starValue = index + 1;

      return (
        //if its selected make sure the star is filled ()
        <span
          key={index}
          className={starValue <= recipe.rating ? "star filled" : "star"}
          onClick={() => onRate(starValue)}
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

        <h3>Comments</h3>

        <ul className="comments-list">
          {comments.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>

        <textarea
          className="comment-box"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button className="comment-btn" onClick={handleAddComment}>
          Add Comment
        </button>

        <button className="close-btn"onClick={onClose}>
          Go Back
        </button>

      </div>
    </div>
  );
}

export default RecipeDetail;