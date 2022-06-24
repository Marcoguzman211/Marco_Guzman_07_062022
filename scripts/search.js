import { displayCards } from "./cards.js";

export const search = ($recipes, $tags, $container, $searchString) => {
    let newRecipes = [];
    if ($searchString.length === 0) {
        $recipes.forEach(recipe => {
            newRecipes.push(recipe);
        });
     }
    $recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
           if (ingredient.ingredient.toLowerCase().includes($searchString.toLowerCase())) newRecipes.push(recipe);
        });
    });
    $container.innerHTML = "";
    displayCards(newRecipes, $container);
};
