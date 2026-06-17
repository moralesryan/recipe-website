//surprise me button

import { fetchRandomMeal } from "./api.js";
import { closePopup } from "./recipePopUp.mjs";

//initRandomRecipe
export function initRandomRecipe() {
    const btn = document.querySelector("#btn-surprise");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        //disable button while fetching so it cant send a bunch of requests 
        btn.disabled = true;
        btn.textContent = "🎲 Rolling...";

        //fetch a reandom meal
        const meal = await fetchRandomMeal();
        //if fetching fails, return button
        if (!meal) {
            btn.disabled = false;
            btn.textContent = "🎲 Surprise Me";
            return;
        }
        //close the open pop ups
        closePopup();

        //manually open the popup with the random meal data
        const overlay = document.querySelector("#modal-overlay");
        overlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";

        //populate modal since we already have the full meal object 
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
            .filter((step) => step.trim() !== "");
        steps.forEach((step) => {
            const li = document.createElement("li");
            li.textContent = step.trim();
            instructionsList.appendChild(li);
        });

        //re-enable button after popup opens
        btn.disabled = false;
        btn.textContent = "🎲 Surprise Me";
    });
}