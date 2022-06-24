import { displayCards } from "./cards.js";

export const search = ($recipes, $tags, $container, $searchString) => {
    const newRecipes = [];
    $recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
           if (ingredient.ingredient.toLowerCase().includes($searchString.toLowerCase())) newRecipes.push(recipe);
        });
    });
    $container.innerHTML = "";
    displayCards(newRecipes, $container);
};
