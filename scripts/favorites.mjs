//this module will dave and load favorite recipes

import { fetchMealById } from "./api.js";

//using local storage
const STORAGE_KEY = "lasazon-favorites";

//initFavorites
export function initFavorites() {
    const isHomePage = document.querySelector("#recipe-grid");
    const isFavoritePage = document.querySelector("#favorites-grid");

    if (isHomePage) {
        //listener for heart button
        setupFavoriteButtons();
    }

    if (isFavoritePage) {
        //load and render saved favorites
        renderFavoritesGrid();
    }
}
function setupFavoriteButtons() {
    const grid = document.querySelector("#recipe-grid");
    if (!grid) return;

    grid.addEventListener("click", (e) => {
        const heartButton = e.target.closest(".btn-heart");
        if (!heartButton) return;

        const mealId = heartButton.dataset.id;
        toggleFavorites(mealId, heartButton);

    });
}

//toggle favorites function 
function toggleFavorites(mealId, btn) {
    const favorites = getFavorites();

    if (isFavorite(mealId)) {
        //if its already saved then remove it
        removeFavorite(mealId);
        btn.textContent = "🤍";
        btn.title = "Save to Favorites";
    } else {
        //if it is not saved then save it!
        saveFavorite(mealId);
        btn.textContent = "❤️";
        btn.title = "Remove from Favorites";
    }
}


//renderFavoritesGrid
async function renderFavoritesGrid() {
    const grid = document.querySelector("#favorites-grid");
    if (!grid) return;

    const favorites = getFavorites();

    //if no recipes are saved then display a message saying it's empty

    if (favorites.length === 0) {
        grid.innerHTML = `
        <div class="empty-state">
            <p>You don't have Favorites yet!</p>
        </div>`
        return;
    };

    //fetch full meal data 
    const meals = await Promise.all(
        favorites.map((id) => fetchMealById(id))
    );

    //display the cards for the saved meals (the meals selected as "favorites")
    meals.forEach((meal) => {
        if (!meal) return;

        const card = document.createElement("div");
        card.classList.add("recipe-card");
        card.dataset.id = meal.idMeal;

        card.innerHTML = `     <img src="${meal.strMealThumb}" alt="${meal.strMeal}" loading="lazy" />
      <div class="recipe-card-body">
        <h3>${meal.strMeal}</h3>
        <div class="card-footer">
          <span class="category-badge">${meal.strCategory || ""}</span>
          <button class="btn-heart active" data-id="${meal.idMeal}" title="Remove from favorites">❤️</button>
        </div>
      </div>
    `;

        grid.appendChild(card);
    });

    //remove the cards from favorite meals/recipes
    grid.addEventListener("click", (e) => {
        const heartButton = e.target.closest(".btn-heart");
        if (!heartButton) return;

        const mealId = heartButton.dataset.id;
        removeFavorite(mealId);

        //this removes the card from the recipe-grid
        const card = heartButton.closest(".recipe-card");
        card.remove();

        //show empty if no favorites are left 
        if (grid.children.length === 0) {
            grid.innerHTML = `
        <div class="empty-state">
            <p>You don't have Favorites yet!</p>
        </div>`
        };
    });
}

//localStorage to be able to save the Favorites!
export function getFavorites() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}
export function isFavorite(mealId) {
    return getFavorites().includes(mealId);
}

//save the meal Id to localStorage
export function saveFavorite(mealId) {
    const favorites = getFavorites();
    if (!favorites.includes(mealId)) {
        favorites.push(mealId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
}

//remove a meal from local storage
export function removeFavorite(mealId) {
    const favorites = getFavorites().filter((id) => id !== mealId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}
