import React from "react";
import Recipe from "./Recipe";
import StarRating from "./StarRating";
import "./Menu.css";

export default function Menu({ recipes = [] }) {
  return (
    <article>
      <header>
        <h1>Delicious Recipes</h1>
      </header>

      <StarRating />

      <div className="recipes">
        {recipes.map((props, i) => (
          <Recipe key={i} {...props} />
        ))}
      </div>
    </article>
  );
}
