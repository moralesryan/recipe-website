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

function buildCategoryButtons(categories) {
    const filtersContainer = document.getElementById("filters");
    if (!filtersContainer) return;

    //clear any existing buttons
    filtersContainer.innerHTML = "";
    const allButton = document.createElement("button");
    allButton.textContent = "All";
    allButton.classList.add("active");
    allButton.dataset.category = "All";
    filtersContainer.appendChild(allButton);

    categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.dataset.category = category;
        filtersContainer.appendChild(button);
    });

    filtersContainer.addEventListener("click", async (e) => {
        const clickedButton = e.target.closest("button");
        if (!clickedButton) return;

        //update active style
        filtersContainer.querySelectorAll("button").forEach(btn) => {
            btn.classList.remove("active");
        };
        clickedButton.classList.add("active");

        //update current category and fetch meals
        currentCategory = clickedButton.dataset.category;
        currentQuery = "";

        //clear search input visually
        const searchInput = document.querySelector("#search-input");
        if (searchInput) searchInput.value = "";

        //fetch meals for selected category and render
        await loadAndRender(currentCategory);

    });
}

//setup searchbar
function setupSearchBar() {
    const searchInput = document.querySelector("#search-input");
    if (!searchInput) return;

    //debounce wait 300ms after user stops typing
    let debounceTimer;
    searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            currentQuery = e.target.value.trim().toLowerCase();
            applySearch();
        }, 300);
    });
}

//loadAndRender(category) function
async function loadAndRender(category) {
    const grid = document.querySelector("#recipe-grid");
    if (!grid) return;

    showLoadingCards(grid);
    let meals;

    if (category === "All") {
        meals = await fetchMealsbyCategory("Chicken");
    } else {
        meals = await fetchMealsbyCategory(category);
    }

    //store meals at module level so the search bar and function can filter them
    allMeals = meals || [];

    //render the full list
    renderGrid(allMeals);
}

//applysearch filter, to make the search bar work! 
function applySearch() {
    if (!currentQuery) {
        renderGrid(allMeals);
        return;
    }

    const filtered = allMeals.filter((meals) =>
        meals.strMeal.toLowerCase().includes(currentQuery)
    );

    renderGrid(filtered);
}