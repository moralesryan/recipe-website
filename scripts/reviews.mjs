//reviews mjs will run with faker api
import { fetchFakeReviews } from "./api.js";

//initReviews function
export function initReviews() {
    const grid = document.querySelector("#recipe-grid");
    const favGrid = document.querySelector("#favorites-grid");
    const targetGrid = grid || favGrid;
    if (!targetGrid) return;

    targetGrid.addEventListener("click", async (e) => {
        const card = e.target.closest(".recipe-card");
        if (!card) return;
        if (e.target.closest(".btn-heart")) return;

        setTimeout(async () => {
            await renderFakeReviews();
        }, 100);
    });
}

//render fake reviews!!

async function renderFakeReviews() {
    const reviewsContainer = document.querySelector("#modal-reviews");
    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = "<p>Fetching reviews...</p>";

    const reviews = await fetchFakeReviews(3);

    reviewsContainer.innerHTML = "";

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>No reviews yet</p>";
        return;
    }

    reviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");
        //the stars for the reviews
        const stars = "★".repeat(review.stars) + "☆".repeat(5 - review.stars);

        //create the p element for the stars to be displayed
        reviewCard.innerHTML = `
        <h3>Reviews</h3>
        <p class="review-author">${review.name}</p>
        <p class="review-stars">${stars}</p>
        <p class="review-review">${review.review}</p>
        `;
        reviewsContainer.appendChild(reviewCard);
    });
}