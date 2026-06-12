//filters.mjs file will get the catefories from the API
//and render the filter buttons on the home page

import { fetchMealsbyCategory } from "./api.mjs";
import { renderGrid } from "./main.mjs";


//module 'level' variables to track the state of the filters
let currentCategory = "All";
let currentQuery = "";
let allMeals = []; //this stores all meals for the current category 

export function initFilters(categories) {
    buildCategoryButtons(categories);
    setupSearchBar();

}

//continue here, build the category buttons and add event listeners to them!!!!‼️🦧