import {
  getIngredients,
  getAppliances,
  getUstensils,
  createListboxsLists,
} from "./buildListboxs.js";
import { handleTagClick } from "../main.js";

// Listboxs lists nodes :
const listboxIngredientsList = document.getElementById("ingredients-list");
const listboxAppliancesList = document.getElementById("appliances-list");
const listboxUstensilsList = document.getElementById("ustensils-list");
// Error message node :                  
const noSearchResult = document.getElementById("no-search-result");

// Search avec  des boucles natives :
export const search = ($recipes, $tags, $toRefresh = true) => {
  const searchInput = document.getElementById("search-input").value.toLowerCase(); 
  const recipesAfterTagFilter = getRecipesByTags($recipes, $tags);
  const recipesAfterSearchInput = getRecipesBySearchInput(recipesAfterTagFilter, searchInput);
  if ($toRefresh === true) {
    displayAfterSearch(recipesAfterSearchInput, $tags);
  }
  return recipesAfterSearchInput; // final recipe(s) list 
};

// Display recipes after search (with listboxslists updates) :
export const displayAfterSearch = ($refreshedRecipes, $tags) => {
  createListboxsLists($refreshedRecipes, getIngredients, listboxIngredientsList, "ingredients", $tags);
  createListboxsLists($refreshedRecipes, getAppliances, listboxAppliancesList, "appliances", $tags);
  createListboxsLists($refreshedRecipes, getUstensils, listboxUstensilsList, "ustensils", $tags);
  handleTagClick(listboxIngredientsList); 
  handleTagClick(listboxAppliancesList);
  handleTagClick(listboxUstensilsList);
  displayRecipes($refreshedRecipes);
};

// Get recipes by tags :
const getRecipesByTags = ($recipes, $tags) => {
  if ($tags.length === 0) {
    return $recipes;
  }
  let newRecipes = [];
  for (let i = 0; i < $recipes.length; i++) {
    let containsAllTags = true;
    for (let j = 0; j < $tags.length; j++) {
      const tagName = $tags[j].name;
      let containsIngredientTag = false;
      if ($tags[j].attribute === "appliances") {
        if ($recipes[i].appliance.toLowerCase() !== tagName.toLowerCase()) {
          containsAllTags = false;
        }
      } else if ($tags[j].attribute === "ustensils") {
        if (!$recipes[i].ustensils.includes(tagName)) {
          containsAllTags = false;
        }
      } else if ($tags[j].attribute === "ingredients") {
        for (let k = 0; k < $recipes[i].ingredients.length; k++) {
          if ($recipes[i].ingredients[k].ingredient.toLowerCase() === tagName.toLowerCase()) {
            containsIngredientTag = true;
          }
        }
        if (containsIngredientTag === false) {
          containsAllTags = false;
        }
      }
    }
    if (containsAllTags) {
      newRecipes.push($recipes[i]);
    }
  }
  return newRecipes;
};

// Get recipes by search :
const getRecipesBySearchInput = ($recipes, $searchInput) => {
  const newRecipes = [];
  if ($searchInput.length < 3) {
    return $recipes; // all 50 recipes
  }
  if ($searchInput.length >= 3) {
    // Ingredients search :
    for (const r in $recipes) {
      const objectRecipe = $recipes[r].ingredients;
      for (let i = 0; i < objectRecipe.length; i++) {
        const objectIngredient = objectRecipe[i].ingredient.toLowerCase();
        if (objectIngredient.includes($searchInput)) {
          if (!newRecipes.includes($recipes[r])) {
            newRecipes.push($recipes[r]);
          }
        }
      }
    }

    // Recipe name search : 
    for (const r in $recipes) {
      const recipeName = $recipes[r].name.toLowerCase();
      if (recipeName.includes($searchInput)) {
        if (!newRecipes.includes($recipes[r])) {
          newRecipes.push($recipes[r]);
        }
      }
    }

    // Description search :
    for (const r in $recipes) {
      const recipeDescription = $recipes[r].description.toLowerCase();
      if (recipeDescription.includes($searchInput)) {
        if (!newRecipes.includes($recipes[r])) {
          newRecipes.push($recipes[r]);
        }
      }
    }
  }
  return newRecipes;
};

// Display recipes :
export const displayRecipes = (recipesAfterSearchInput) => {
  document.querySelector(".cards").innerHTML = "";
  const cardNode = document.querySelector(".cards");

  const createFactoryCard = (recipeAfterSearchInputObject) => {
    const {
      name,
      time,
      ingredients,
      description, 
    } = recipeAfterSearchInputObject; 
    const ingredientsLi = document.createElement("ul");

    ingredients.forEach((object) => {
      // no undefined :
      if ((object.ingredient !== undefined) 
       && (object.quantity !== undefined) 
       && (object.unit !== undefined)) {
         ingredientsLi.innerHTML += `<li class="ingredient-quantity-unit"><b>${object.ingredient}</b> : ${object.quantity} ${object.unit}</li>`;
      } 
      // unit undefined : 
      if ((object.ingredient !== undefined) 
       && (object.quantity !== undefined) 
       && (object.unit == undefined)) {
        ingredientsLi.innerHTML += `<li class="ingredient-quantity-unit"><b>${object.ingredient}</b> : ${object.quantity}</li>`;
      } 
      // unit and quantity undefined :
      if ((object.ingredient !== undefined) 
        && (object.quantity == undefined) 
        && (object.unit == undefined)) {
        ingredientsLi.innerHTML += `<li class="ingredient-quantity-unit"><b>${object.ingredient}</b></li>`;
      }
    });

    const createCardDom = `<div class="card-header"></div>
    <div class="card-body">
      <div class="card-body-top">
        <h6 class="card-title">${name}</h6>
        <h6 class="time"><i class="bi bi-clock"></i> ${time} min</h6>
      </div>
      <div class="card-body-bottom">
        <ul class="recipe-ingredients">${ingredientsLi.innerHTML}</ul>
        <p class="recipe-text card-text">${description}</p>
      </div>
    </div>`;
    return createCardDom;
  };

  if (recipesAfterSearchInput.length >= 1) {
      for (let i = 0; i < recipesAfterSearchInput.length; i++) {
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = createFactoryCard(recipesAfterSearchInput[i]);
      cardNode.append(div);
      noSearchResult.classList.add("hidden");
    }
  } else {
    noSearchResult.classList.remove("hidden"); // Error message 
  }
};