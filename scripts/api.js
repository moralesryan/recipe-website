//Imports: none
//  Used by: main.js, recipePopUp.mjs,
//           filters.mjs, randomRecipe.mjs,
//           reviews.mjs

const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";
const FAKERAPI_BASE = "https://fakerapi.it/api/v2";

export async function fetchCategories() {
    try {
        const response = await fetch(`${MEALDB_BASE}/categories.php`);
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error("fetchCategories failed", error);
        return [];

    }
}

export async function fetchMealsByCategory(category) {
    try {
        const response = await fetch(`${MEALDB_BASE}/filter.php?c=${category}`);
        const data = await response.json();
        return data.meals;

    } catch (error) {
        console.error("fetchMealsByCategory failed:", error);
        return [];
    }
}

export async function fetchMealById(id) {
    try {
        const response = await fetch(`${MEALDB_BASE}/lookup.php?i=${id}`);
        const data = await response.json();
        return data.meals[0];

    } catch (error) {
        console.error("fetchMealById failed:", error);
        return null;
    }
}

export async function fetchRandomMeal() {
    try {
        const response = await fetch(`${MEALDB_BASE}/random.php`);
        const data = await response.json();
        return data.meals[0];
    } catch (error) {
        console.error("fetchRandomMeal failed:", error);
        return null;
    }
}

export async function fetchFakeReviews(count = 3) {
    try {
        const response = await fetch(`${FAKERAPI_BASE}/persons?_quantity=${count}&_gender=male`);
        const data = await response.json();

        return data.data.map((person) => ({
            name: `${person.firstname} ${person.lastname}`,
            stars: Math.floor(Math.random() * 5) + 1,
            review: generateFakeReviewText(),
        }));
    } catch (error) {
        console.error("fetchFakeReviews failed:", error);
        return [];
    }
}

function generateFakeReviewText() {
    const reviews = [
        "Made this last night and the whole family loved it!",
        "Super easy to follow and incredibly delicious.",
        "A new staple in our house. Highly recommend!",
        "The flavors were amazing. Will definitely make again.",
        "Tried this for the first time and it blew my mind.",
        "Simple ingredients but the result is restaurant quality.",
        "Perfect for a weeknight dinner. Quick and tasty!",
        "My kids devoured it. That says everything.",
        "I added a little extra spice and it was perfect.",
        "One of the best recipes I've tried from this site.",
        "This recipe is a game-changer. So flavorful and easy!",
        "I made this for a dinner party and everyone asked for the recipe!",
        "The combination of ingredients is fantastic. Will make again.",
        "A delicious meal that comes together in no time.",
        "This recipe has become a family favorite. So good!",
        "I was skeptical at first, but this turned out amazing. Will make again!",
        "The flavors in this dish are incredible. A must-try recipe!",
        "I love how simple this recipe is, yet it tastes like it took hours to make.",
        "This is now my go-to recipe for a quick and delicious meal.",
        "The whole family enjoyed this one. It's a keeper!",
        "I can't believe how good this turned out. Will definitely make again!",
        "This recipe is a winner. So flavorful and easy to make. Highly recommend!",
        "I made this for a weeknight dinner and it was a huge hit. Will make again!",
        "The combination of ingredients in this recipe is fantastic. A new favorite in our house!",
        "This recipe is a game-changer. So delicious and easy to make. Will definitely be making this again!",
        "I was a bit skeptical about this recipe, but it turned out amazing. The flavors were fantastic and it was so easy to make. Will definitely be making this again!",
    ];
    return reviews[Math.floor(Math.random() * reviews.length)];
}