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

//im here