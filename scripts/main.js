 import { toggleListBox, openOnInputListbox, getIngredients, getAppliances, getUstensils, createListboxsLists} from "./listboxs.js";
 import { addTag, createTags } from "./tags.js"; 
 import { search } from "./search.js";
 import {recipes} from "./data/recipes.js";

let tags = [];
const ingredients = getIngredients(recipes);
const ustensils = getUstensils(recipes);
const appliances = getAppliances(recipes);

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

search(recipes, tags, cardsContainer, searchInput.value);


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

searchInput.addEventListener("keyup", (e) => {
  search(recipes, tags, cardsContainer, e.target.value);
});