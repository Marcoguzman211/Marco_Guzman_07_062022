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

// Create listboxs lists on load :
createListboxsLists(recipes, getIngredients, listboxIngredientsList, "ingredients", tags);
createListboxsLists(recipes, getAppliances, listboxAppliancesList, "appliances", tags); 
createListboxsLists(recipes, getUstensils, listboxUstensilsList, "ustensils", tags); 

search(recipes, tags, cardsContainer);


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

  /* input.addEventListener("keyup", (e) => {
    const parentElement = input.closest(".listbox"); 
    const listboxList = parentElement.querySelector(".listbox-list");
    const elements = listboxList.querySelectorAll("li");
    searchInListbox(elements, e.target.value);
  }); */
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
        search(recipes, tags, cardsContainer, searchInput.value);
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
      search(recipes, tags, cardsContainer, searchInput.value);
      handleRemoveTag();
    });
  });
};

searchInput.addEventListener("keyup", (e) => {
  search(recipes, tags, cardsContainer, e.target.value);
});