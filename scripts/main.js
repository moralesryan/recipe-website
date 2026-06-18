//imports all modules and initializes them

import { fetchCategories, fetchMealsByCategory } from "./api.js";
//import { initFilters } from "./filters.mjs";
import { initPopups } from "./recipePopUp.mjs";
import { initFavorites } from "./favorites.mjs";
import { initRandomRecipe } from "./randomRecipe.mjs";
import { initReviews } from "./reviews.mjs";
//import { initWisdomDrop } from "./wisdom-drop.mjs";


document.addEventListener("DOMContentLoaded", async () => {

    //detect the page the user is on, by checking if a key element exists in the DOM
    const isHomePage = document.querySelector("#recipe-grid");
    const isFavoritePage = document.querySelector("#favorites-grid");
    const isWisdomDropPage = document.querySelector("#wisdom-drop");
    //this starts the home page functions when the user is in the home page
    if (isHomePage) {
        //fetch categories and meals, then initialize filters and popups
        const categories = await fetchCategories();
        // initFilters(categories);
        //fetch default meals for the` home page 
        const [chicken, beef, seafood, dessert, pork] = await Promise.all([
            fetchMealsByCategory("Chicken"),
            fetchMealsByCategory("Beef"),
            fetchMealsByCategory("Seafood"),
            fetchMealsByCategory("Dessert"),
            fetchMealsByCategory("Pork"),
        ]);

        const defaultMeals = [...chicken, ...beef, ...seafood, ...dessert, ...pork];

        renderGrid(defaultMeals);
        //initialize popups
        initPopups();
        //initialize favorites
        initFavorites();
        //initialize random recipe
        initRandomRecipe();
        //initialize reviews
        initReviews();
    }

    // this will start running the functions to initialize the favorites page if the user is on the favorites page
    if (isFavoritePage) {
        //initialize favorites
        initFavorites();
        //initialize popups here
        initPopups();
        //initialize reviews here
        initReviews();
    }

    //this will run the wisdom drop functions if the user is on the wisdom drop page
    if (isWisdomDropPage) {
        //initialize wisdom drop
        initWisdomDrop();

    }

});

export function renderGrid(meals) {
    const grid = document.querySelector("#recipe-grid");
    if (!grid) return;

    // Clear current cards
    grid.innerHTML = "";

    // If no meals found show empty state
    if (!meals || meals.length === 0) {
        grid.innerHTML = `<p class="empty-state">No recipes found. Try a different search! 🍽️</p>`;
        return;
    }

    // Loop through meals and create a card for each
    meals.forEach((meal) => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.dataset.id = meal.idMeal;

        card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy" />
        <div class="recipe-card-body">
          <h3>${meal.strMeal}</h3>
          <div class="card-footer">
            <span class="category-badge">${meal.strCategory || ""}</span>
            <button class="btn-heart" data-id="${meal.idMeal}">🤍</button>
          </div>
        </div>
      `;

        grid.appendChild(card);
    });
}