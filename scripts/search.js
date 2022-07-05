import { displayCards } from "./cards.js";
import { getIngredients, getAppliances, getUstensils, createListboxsLists} from "./listboxs.js";
import { addTag, createTags } from "./tags.js";

import { recipes as allRecipes } from "./data/recipes.js";

// Listboxs lists nodes :
const listboxIngredientsList = document.getElementById("ingredients-list");
const listboxAppliancesList = document.getElementById("appliances-list");
const listboxUstensilsList = document.getElementById("ustensils-list");

//Containers 
const tagsContainer = document.getElementById("tags");
const cardsContainer = document.querySelector(".cards");
const searchInput = document.getElementById("search-input");

export const handleTagClick = (listboxElementList, tags, recipes) => {
    const elements = listboxElementList.querySelectorAll("li");
    elements.forEach(element => {
      element.addEventListener("click", e => {
        const dataType = e.target.dataset.type;
        const name = e.target.textContent;
        const newTag = { name: name, datatype: dataType};
        addTag(newTag, tags);
        createTags(tags, tagsContainer);
        createListboxsLists(recipes, getIngredients, listboxIngredientsList, "ingredients", tags);
        createListboxsLists(recipes, getAppliances, listboxAppliancesList, "appliances", tags); 
        createListboxsLists(recipes, getUstensils, listboxUstensilsList, "ustensils", tags);  
        handleTagClick(listboxIngredientsList, tags, recipes);
        handleTagClick(listboxAppliancesList, tags, recipes);
        handleTagClick(listboxUstensilsList, tags, recipes);
        handleRemoveTag(tags, recipes);
        search(recipes, tags, cardsContainer, searchInput.value);
      });
    });
  };

/* export const handleRemoveTag = (tags, recipes) => {
    const tagListHtml = document.querySelectorAll("#tags .tag");
    tagListHtml.forEach(tag => {
        tag.querySelector("i").addEventListener("click", (e) => {
        const tagLabel = tag.getAttribute("data-name");
        const tagsRemaining = tags.filter(tag => tag.name !== tagLabel);
        createListboxsLists(recipes, getIngredients, listboxIngredientsList, "ingredients", tagsRemaining);
        createListboxsLists(recipes, getAppliances, listboxAppliancesList, "appliances", tagsRemaining);  
        createListboxsLists(recipes, getUstensils, listboxUstensilsList, "ustensils", tagsRemaining);
        createTags(tagsRemaining, tagsContainer);
        handleTagClick(listboxIngredientsList, tagsRemaining, recipes);
        handleTagClick(listboxAppliancesList, tagsRemaining, recipes);
        handleTagClick(listboxUstensilsList, tagsRemaining, recipes);
        if (tags.length > 0) {
          search(recipes, tagsRemaining, cardsContainer, searchInput.value);
            handleRemoveTag(tagsRemaining, recipes);
            createListboxsLists(recipes, getIngredients, listboxIngredientsList, "ingredients", tagsRemaining);
        createListboxsLists(recipes, getAppliances, listboxAppliancesList, "appliances", tagsRemaining);  
        createListboxsLists(recipes, getUstensils, listboxUstensilsList, "ustensils", tagsRemaining);
        } else {
            let tagsVide = [];
            search(allRecipes, tagsVide, cardsContainer, searchInput.value);
            handleTagClick(listboxIngredientsList, tagsVide, recipes);
            handleTagClick(listboxAppliancesList, tagsVide, recipes);
            handleTagClick(listboxUstensilsList, tagsVide, recipes);
        }
      });
    });
  }; */

//Fonction principale
export const search = (recipes, tags, container, searchString = "") => {
 const recipesByTags = getRecipesByTags(recipes, tags, searchString);
 const recipesBySearchString = getRecipesBySearchString(recipes, searchString, tags);
 const result = [...recipesByTags, ...recipesBySearchString];
 let uniques = [];
 //Petite boucle sur chaque recette pour ne garder que les recettes uniques
    result.forEach(recipe => {
        if (!uniques.includes(recipe)) {
            uniques.push(recipe);
        }
    });
 container.innerHTML = "";
 if (uniques.length === 0) {
    document.getElementById("no-search-result").classList.remove("hidden");
 } else {
    document.getElementById("no-search-result").classList.add("hidden");
     displayCards(uniques, container);
     createListboxsLists(uniques, getIngredients, listboxIngredientsList, "ingredients", tags);
     createListboxsLists(uniques, getAppliances, listboxAppliancesList, "appliances", tags); 
     createListboxsLists(uniques, getUstensils, listboxUstensilsList, "ustensils", tags);
     handleTagClick(listboxIngredientsList, tags, uniques);
     handleTagClick(listboxAppliancesList, tags, uniques);
     handleTagClick(listboxUstensilsList, tags, uniques);
 }
};

/* const getRecipesByTags = (recipes, tags, searchString) => {
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
}; */

// Get recipes by tags :
const getRecipesByTags = ($recipes, $tags) => {
    if ($tags.length === 0) {
      return [];
    }
    const newRecipes = [];
    $recipes.forEach((recipe) => {
      let containsAllTags = true;
      $tags.forEach((tag) => {
        console.log(tag.datatype);
        const tagName = tag.name;
        let containsIngredientTag = false;
        if (tag.datatype === "appliances") {
          if (recipe.appliance.toLowerCase() !== tagName.toLowerCase()) {
            containsAllTags = false;
          }
        } else if (tag.datatype === "ustensils") {
          if (!recipe.ustensils.includes(tagName)) {
            containsAllTags = false;
          }
        } else if (tag.datatype === "ingredients") {
          recipe.ingredients.forEach((object) => {
            if (object.ingredient.toLowerCase() === tagName.toLowerCase()) {
              containsIngredientTag = true;
            }
          });
          if (containsIngredientTag === false) {
            containsAllTags = false;
          }
        }
      });
      if (containsAllTags) {
        newRecipes.push(recipe);
      }
    });
    return newRecipes;
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