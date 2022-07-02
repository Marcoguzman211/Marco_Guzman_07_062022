import { displayCards } from "./cards.js";
import { getIngredients, getAppliances, getUstensils, createListboxsLists} from "./listboxs.js";

// Listboxs lists nodes :
const listboxIngredientsList = document.getElementById("ingredients-list");
const listboxAppliancesList = document.getElementById("appliances-list");
const listboxUstensilsList = document.getElementById("ustensils-list");


export const search = (recipes, tags, container, searchString = "") => {
 const recipesByTags = getRecipesByTags(recipes, tags, searchString);
 const recipesBySearchString = getRecipesBySearchString(recipes, searchString, tags);
 const result = [...recipesByTags, ...recipesBySearchString];
 let uniques = [];
    result.forEach(recipe => {
        if (!uniques.includes(recipe)) {
            uniques.push(recipe);
        }
    });
    console.log(uniques);
 container.innerHTML = "";
 if (uniques.length === 0) {
    document.getElementById("no-search-result").classList.remove("hidden");
 } else {
    document.getElementById("no-search-result").classList.add("hidden");
     displayCards(uniques, container);
     createListboxsLists(uniques, getIngredients, listboxIngredientsList, "ingredients", tags);
     createListboxsLists(uniques, getAppliances, listboxAppliancesList, "appliances", tags); 
     createListboxsLists(uniques, getUstensils, listboxUstensilsList, "ustensils", tags);
 }
};

const getRecipesByTags = (recipes, tags, searchString) => {
    console.log(searchString);
    const recipeTagsNames = tags.map(tag => tag.name);
    let recipesByTags = [];

    if (tags.length === 0) {
        return [];
    }

    recipes.forEach(recipe => {
        const ustensils = recipe.ustensils.map(ustensil => ustensil);
        const ingredients = recipe.ingredients.map(ingredient => ingredient.ingredient);
        recipeTagsNames.forEach(tag => {
            if (tag.toLowerCase() === recipe.appliance.toLowerCase()) {
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
    if (tags.length === 0 && searchString.length < 3) {
        return recipes;
    } else if (tags.length === 0 && searchString === ""){ 
        return [];
    } else if (searchString.length < 3) {
        return [];
    }

    let recipesBySearchString = []; 
    recipes.forEach(recipe => {
        //ingredients est un array 
        const {name, description, ingredients} = recipe;
        if (compareStrings(name.toLowerCase(), searchString.toLowerCase())) {
            //console.log(`La recette ${recipe.name} correspond à la recherche de ${searchString}`);
            recipesBySearchString.push(recipe);
        }

        if (compareStrings(searchString.toLowerCase(),description.toLowerCase())) {
            recipesBySearchString.push(recipe);
            // console.log(`La recette ${recipe.name} correspond à la recherche de ${searchString}`);
        }
        ingredients.forEach(ingredient => {
            if (compareStrings(searchString.toLowerCase(), ingredient.ingredient.toLowerCase())) {
                recipesBySearchString.push(recipe);
                //console.log(`La recette ${recipe.name} correspond à la recherche de ${searchString}`);
            }
        });   // end of ingredients.forEach
    });
    return recipesBySearchString;
};

// function that compares two strings to one compare to another and find if even a part of the word is inside of multiple words
const compareStrings = (string1, string2) => {
    const string1Array = string1.split(" ");
    const string2Array = string2.split(" ");
    let string1Found = false;
    let string2Found = false;
    string1Array.forEach(string1Word => {
        string2Array.forEach(string2Word => {
            if (string1Word.toLowerCase() === string2Word.toLowerCase()) {
                string1Found = true;
            }
        });
    });
    string2Array.forEach(string2Word => {
        string1Array.forEach(string1Word => {
            if (string1Word.toLowerCase() === string2Word.toLowerCase()) {
                string2Found = true;
            }
        });
    });
    if (string1Found && string2Found) {
        return true;
    } else {
        return false;
    }
};