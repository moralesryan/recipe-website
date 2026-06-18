//wisdom drop file

export function initWisdomDrop() {
    const form = document.querySelector("#wisdom-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const recipe = {
            name: document.querySelector("#recipe-name").value,
            category: document.querySelector("#recipe-category").value,
            area: document.querySelector("#recipe-area").value,
            ingredients: document.querySelector("#recipe-ingredients").value,
            instructions: document.querySelector("#recipe-instructions").value
        };

        //get existing recipes
        const recipes = JSON.parse(localStorage.getItem("communityRecipes")) || [];

        //add anew recipe
        recipes.push(recipe);

        //save back to localStorage
        localStorage.setItem(
            "communityRecipes",
            JSON.stringify(recipes)
        );

        alert("Recipe submitted successfully! 🌶️");
        console.log("Recipe:", recipe);

        form.reset();
    });

}