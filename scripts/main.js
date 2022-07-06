 import { toggleListBox, openOnInputListbox, getIngredients, getAppliances, getUstensils, createListboxsLists} from "./listboxs.js";
 import { addTag, createTags } from "./tags.js"; 
 import { displayCards } from "./cards.js";
 // import { search } from "./search.js";
 import {recipes as allRecipes} from "./data/recipes.js";

let tags = [];
const ingredients = getIngredients(allRecipes);
const ustensils = getUstensils(allRecipes);
const appliances = getAppliances(allRecipes);

// Listboxs lists nodes :
const listboxIngredientsList = document.getElementById("ingredients-list");
const listboxAppliancesList = document.getElementById("appliances-list");
const listboxUstensilsList = document.getElementById("ustensils-list");

//Containers 
const tagsContainer = document.getElementById("tags");
const cardsContainer = document.querySelector(".cards");
const chevronsListboxs = document.querySelectorAll(".listbox-controls .chevron");
const listboxsInputs = document.querySelectorAll(".listbox-input");
const searchInput = document.getElementById("search-input");

//Search.js
const handleTagClick = (listboxElementList, tags, recipes) => {
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

  const handleRemoveTag = (tags, recipes) => {
    const everyTag = document.querySelectorAll("#tags .tag");
    everyTag.forEach(tag => {
      tag.querySelector("i").addEventListener("click", e => {
        if (tags.length === 1) {
          search(allRecipes, [], cardsContainer, searchInput.value);
          document.querySelector("#tags").innerHTML = "";
          handleRemoveTag([], allRecipes);
        }
        const tagLabel = tag.getAttribute("data-name");
        const tagsRemaining = tags.filter(tag => tag.name !== tagLabel);
        createTags(tagsRemaining, tagsContainer);
        handleRemoveTag(tagsRemaining, allRecipes);
        search(recipes, tagsRemaining, cardsContainer, searchInput.value);
      });
    });
  };

//Fonction principale
const search = (recipes, tags = [], container, searchString) => {
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

// Get recipes by tags :
const getRecipesByTags = ($recipes, $tags) => {
    if ($tags.length === 0) {
      return [];
    }
    const newRecipes = [];
    $recipes.forEach((recipe) => {
      let containsAllTags = true;
      $tags.forEach((tag) => {
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

//Fin de SEARCH .js

search(allRecipes, tags, cardsContainer, searchInput.value);


// Listboxs opening with chevron event 
chevronsListboxs.forEach(clickedChevron => {
  clickedChevron.addEventListener("click", () => {
    const parentElement = clickedChevron.closest(".listbox"); 
    const listboxList = parentElement.querySelector(".listbox-list");
    const chevron = parentElement.querySelector(".chevron");
    toggleListBox(listboxList, chevron);
  });
});

  // Listboxs opening on input event
listboxsInputs.forEach(input => {
  input.addEventListener("click", () => {
    const parentElement = input.closest(".listbox"); 
    const listboxList = parentElement.querySelector(".listbox-list");
    const chevron = parentElement.querySelector(".chevron");
    openOnInputListbox(listboxList, chevron);
  });
});

/* searchInput.addEventListener("keyup", (e) => {
  search(allRecipes, tags, cardsContainer, e.target.value);
});  */ 

searchInput.addEventListener("keyup", e => {
  e.stopImmediatePropagation();
    search(allRecipes, tags, cardsContainer, searchInput.value);
  if (searchInput.value.length - 1 === 0 && tags.length === 0) {
    search(allRecipes, [], cardsContainer, "");
  } else if (searchInput.value.length - 1 === 0 && e.code === "Backspace") {
    search(allRecipes, tags, cardsContainer, "");
  }
});

// Listboxs input search keyup event
const handleFilterListboxs = ($listboxInput) => { 
  // Search inputs keyup event :
  const listboxsInputs = document.querySelector($listboxInput);
    listboxsInputs.addEventListener("keyup", (e) => {
      const inputText = e.target.value;
      const $listboxElementsList = listboxsInputs.closest(".listbox").querySelector(".listbox-list");
      const $listboxElementsListItems = $listboxElementsList.querySelectorAll("li");
      $listboxElementsListItems.forEach(listboxElement => {
         const text =listboxElement.textContent;
         if (inputText.length >= 3 && text.toLowerCase().includes(inputText.toLowerCase())) {
          listboxElement.style.display = "block";
         } else {
          if (inputText.length >= 3) {
            listboxElement.style.display = "none";
          } else if (inputText.length === 0) {
            listboxElement.style.display = "block";
          }
         }
      });
    });
};
handleFilterListboxs("#ingredients-input");
handleFilterListboxs("#appliances-input");
handleFilterListboxs("#ustensils-input");
