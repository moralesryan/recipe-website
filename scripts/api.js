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

