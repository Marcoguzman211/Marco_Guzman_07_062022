/* 
document.getElementById("holahola").addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("hidden");
}) */
 import { toggleListBox, openOnInputListbox, getIngredients, getAppliances, getUstensils, createListboxsLists} from "./listboxs.js";
 import { addTag, createTags } from "./tags.js"; 
 import { displayCards } from "./cards.js";
 import {recipes} from "./data/recipes.js";

let tags = [];
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

displayCards(recipes, document.querySelector(".cards"));


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

  const handleTagClick = listboxElementList => {
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
        handleTagClick(listboxIngredientsList); 
        handleTagClick(listboxAppliancesList);
        handleTagClick(listboxUstensilsList);
        handleRemoveTag();
      });
    });
  };

handleTagClick(listboxIngredientsList); 
handleTagClick(listboxAppliancesList);
handleTagClick(listboxUstensilsList);

const handleRemoveTag = () => {
  const tagListHtml = document.querySelectorAll("#tags .tag");
  tagListHtml.forEach(tag => {
      tag.querySelector("i").addEventListener("click", () => {
      const tagLabel = tag.getAttribute("data-name");
      tags = tags.filter(tag => tag.name !== tagLabel);
      createListboxsLists(recipes, getIngredients, listboxIngredientsList, "ingredients", tags);
      createListboxsLists(recipes, getAppliances, listboxAppliancesList, "appliances", tags);  
      createListboxsLists(recipes, getUstensils, listboxUstensilsList, "ustensils", tags);
      handleTagClick(listboxIngredientsList); 
      handleTagClick(listboxAppliancesList);
      handleTagClick(listboxUstensilsList);
      createTags(tags, tagsContainer);
      handleRemoveTag();
    });
  });
};