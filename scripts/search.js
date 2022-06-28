import { displayCards } from "./cards.js";
export const search = (recipes, tags, container, searchString = "") => {
 const recipesByTags = getRecipesByTags(recipes, tags);
 const recipesBySearchString = getRecipesBySearchString(recipes, searchString, tags);
 const result = [...recipesByTags, ...recipesBySearchString];
 container.innerHTML = "";
 if (result.length === 0) {
    document.getElementById("no-search-result").classList.remove("hidden");
 } else {
    document.getElementById("no-search-result").classList.add("hidden");
     displayCards(result, container);
 }
};

const getRecipesByTags = (recipes, tags) => {
    const recipeTagsNames = tags.map(tag => tag.name);
    let recipesByTags = [];

    if (tags.length === 0) {
        return [];
    }

    recipes.forEach(recipe => {
        const ustensils = recipe.ustensils.map(ustensil => ustensil);
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient);
        //console.log(recipe.name, recipe.ustensils);
        recipeTagsNames.forEach(tag => {
            if (tag.toLowerCase() === recipe.name.toLowerCase()) {
                recipesByTags.push(recipe);
            } else if (ustensils.some(ustensil => tag.toLowerCase() === ustensil.toLowerCase())) {
                recipesByTags.push(recipe);
            } else if (ingredients.some(ingredient => tag.toLowerCase() === ingredient.toLowerCase())) {
                recipesByTags.push(recipe);
            }
        });
    });

    return recipesByTags;
};

const getRecipesBySearchString = (recipes, searchString, tags) => {
    if (tags.length === 0 && searchString === ""){ 
        return recipes;
    } else if (searchString.length < 3) {
        return [];
    }

    let recipesBySearchString = []; 
    recipes.forEach(recipe => {
        //ingredients est un array 
        const {name, description, ingredients} = recipe;
        if (searchString.toLowerCase().includes(name.toLowerCase())) {
            recipesBySearchString.push(recipe);
        }

        if (description.toLowerCase().includes(searchString.toLowerCase())) {
            recipesBySearchString.push(recipe);
        }
        ingredients.forEach(ingredient => {
            if (searchString.toLowerCase().includes(ingredient.ingredient.toLowerCase())) {
                recipesBySearchString.push(recipe);
            }
        });   // end of ingredients.forEach
    });
    return recipesBySearchString;
};