/* 
document.getElementById("holahola").addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("hidden");
}) */
 import { toggleListBox, openOnInputListbox, getIngredients, getAppliances, getUstensils, createListboxsLists} from "./listboxs.js";
 import { addTag, createTags } from "./tags.js"; 
 import {recipes} from "./data/recipes.js";

/* const tags = [{name: "Broche", datatype: "ustensils"}, {name: "Ail", datatype: "ingredients"}, {name: "Casserole", datatype: "appliances"}]; */
const tags = [];
const ingredients = getIngredients(recipes);
const ustensils = getUstensils(recipes);
const appliances = getAppliances(recipes);

// Listboxs lists nodes :
const listboxIngredientsList = document.getElementById("ingredients-list");
const listboxAppliancesList = document.getElementById("appliances-list");
const listboxUstensilsList = document.getElementById("ustensils-list");

//TEST CREATE TAGS 
const tagsContainer = document.getElementById("tags");

// Create listboxs lists on load :
createListboxsLists(recipes, getIngredients, listboxIngredientsList, "ingredients", tags);
createListboxsLists(recipes, getAppliances, listboxAppliancesList, "appliances", tags); 
createListboxsLists(recipes, getUstensils, listboxUstensilsList, "ustensils", tags); 


// Listboxs opening with chevron event 
document.querySelectorAll(".listbox-controls .chevron").forEach(element => {
    element.addEventListener("click", () => {
      const parentElement = element.closest(".listbox"); 
      const listboxList = parentElement.querySelector(".listbox-list");
      const chevron = parentElement.querySelector(".chevron");
      toggleListBox(listboxList, chevron);
    });
  });

  // Listboxs opening on input event
document.querySelectorAll(".listbox-input").forEach(element => {
    element.addEventListener("click", () => {
      const parentElement = element.closest(".listbox"); 
      const listboxList = parentElement.querySelector(".listbox-list");
      const chevron = parentElement.querySelector(".chevron");
      openOnInputListbox(listboxList, chevron);
    });
  });

  //AddingTags
  document.querySelectorAll(".listbox-list li").forEach(element => {
    element.addEventListener("click", () => {
      addTag(element, tags);
      createTags(tags, tagsContainer);
    });
  });