//working on the popups/modals
import { fetchMealById } from "./api.js";

export function initPopup() {
    const grid = document.querySelector("#recipe-grid");
    const overlay = document.querySelector("#modal-overlay");
    const btnClose = document.querySelector("#btn-close-modal");

    if (!grid || !overlay || !btnClose) return;

    //event Listenter for clicks on recipe cards inside the grid section
    grid.addEventListener("click", async (e) => {
        const card = e.target.closest(".recipe-card");

        //to ignore clicks on the heart button
        if (e.target.closest(".btn-heart")) return;
        if (!card) return;

        const mealId = card.dataset.id;
        await openPopup(mealId);
    });

    //close modal when clicking the x button
    btnClose.addEventListener("click", closePopup);

    //close the modal when clicking outside the modal
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closePopup();
    });

    //close the modal when pressing the Esc key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closePopup();
    });
}

//openPopup(mealId)
async function openPopup(mealId) {
    const overlay = document.querySelector(| "#modal-overlay");

    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden"; //this is to prevent background scrolling!

    //text loading while it is fetching 
    document.querySelector("#modal-title").textContent = "Loading...";
    document.querySelector("#modal-image").src = "";
    document.querySelector("#modal-ingredients").innerHTML = "";
    document.querySelector("#modal-instructions").innerHTML = "";
    document.querySelector("#modal-category").textContent = "";
    document.querySelector("#modal-area").textContent = "";

    //fetch full meal details from theMealDB API
    const meal = await fetchMealById(mealId);
    if (!meal) {
        document.querySelector("#modal-title").textContent = "Couldn't load recipe this time. Try again.";
    }
    //populate modal with teh meal data
    populateModal(meal);
}
//to create the popup modal
function populateModal(meal) {
    document.querySelector("#modal-image").src = meal.strMealThumb;
    document.querySelector("#modal-image").alt = meal.strMeal;
    document.querySelector("#modal-title").textContent = meal.strMeal;
    document.querySelector("#modal-category").textContent = `${meal.strCategory}`;
    document.querySelector("#modal-area").textContent = `${meal.strArea}`;

    //ingredients
    const ingredientsList = document.querySelector("#modal-ingredients");
    ingredientsList.innerHTML = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredients ${i}`];
        const measure = meal[`strMeasure ${i}`];
        if (!ingredient || ingredient.trim() === "") break;
        const li = document.createElement("li");
        li.textContent = `${measure ? measure.trim() : ""} ${ingredient.trim()}`;
        ingredientsList.appendChild(li);
    }

    //instructions
    const instructionsList = document.querySelector("#modal-instructions");
    instructionsList.innerHTML = "";
    const steps = meal.strInstructions
        .split("/n")
        .filter((step) => step.trim() !== "";
    steps.forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step.trim();
        instructionsList.appendChild(li);
    });
}

//close modal
export function closePopup() {
    const overlay = document.querySelector("#modal-overlay");
    if (!overlay) return;

    overlay.classList.add("hidden");
    document.body.style.overflow = "";

    // Clear the modal content
    document.querySelector("#modal-title").textContent = "";
    document.querySelector("#modal-image").src = "";
    document.querySelector("#modal-ingredients").innerHTML = "";
    document.querySelector("#modal-instructions").innerHTML = "";
    document.querySelector("#modal-reviews").innerHTML = "";
    document.querySelector("#star-rating").innerHTML = "";.
}

async function openPopup(mealId) {
    const overlay = document.querySelector("#modal-overlay");

    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Clear modal while loading... loading...
    document.querySelector("#modal-title").textContent = "Loading...";
    document.querySelector("#modal-image").src = "";
    document.querySelector("#modal-ingredients").innerHTML = "";
    document.querySelector("#modal-instructions").innerHTML = "";
    document.querySelector("#modal-category").textContent = "";
    document.querySelector("#modal-area").textContent = "";
}
