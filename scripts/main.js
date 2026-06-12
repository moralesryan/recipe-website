//imports all modules and initializes them

import { fetchCategories, fetchMealsbyCategory } from "./api.mjs";
import { initFilters } from "./filters.mjs";
import { initPopups } from "./recipePopUp.mjs";
import { initFavorites } from "./favorites.mjs";
import { initRandomRecipe } from "./randomRecipe.mjs";
import { initReviews } from "./reviews.mjs";
import { initWisdomDrop } from "./wisdom-drop.mjs";

//detect the page the user is on, by checking if a key element exists in the DOM
const isHomePage = document.querySelector("#recipe-grid");
const isFavoritePage = document.querySelector("#favorites-grid");
const isWisdomDropPage = document.querySelector("#wisdom-drop");

document.addEventListener("DOMContentLoaded", async () => {
    //this starts the home page functions when the user is in the home page
    if (isHomePage) {
        //fetch categories and meals, then initialize filters and popups
        const categories = await fetchCategories();
        initFilters(categories);
        //fetch default meals for the home page (Chicken category)
        const defaultMeals = await fetchMealsbyCategory("Chicken");
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

