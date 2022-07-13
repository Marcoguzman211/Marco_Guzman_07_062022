import {
  toggleListBox,
  openOnInputListbox,
} from "./displays/displayListboxs.js";
import {
  getIngredients,
  getAppliances,
  getUstensils,
  createListboxsLists,
  refreshListboxsLists, //
} from "./factories/buildListboxs.js";
import {
  addTags, //
  refreshTagList,
} from "./factories/buildTags.js"; 
import {
  search, 
  displayRecipes,
} from "./factories/search.js";
import { 
  recipes // array with recipes 
} from "./data/recipes.js";

let tags = []; 

// Listboxs lists nodes :
const listboxIngredientsList = document.getElementById("ingredients-list");
const listboxAppliancesList = document.getElementById("appliances-list");
const listboxUstensilsList = document.getElementById("ustensils-list");

const listboxInputs = document.querySelectorAll(".listbox-input");

// Display all recipes on load :
displayRecipes(recipes);

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
listboxInputs.forEach(element => {
  element.addEventListener("click", () => {
    const parentElement = element.closest(".listbox"); 
    const listboxList = parentElement.querySelector(".listbox-list");
    const chevron = parentElement.querySelector(".chevron");
    openOnInputListbox(listboxList, chevron);
  });
});

// Tags, add click events :
export const handleTagClick = (listboxElementList) => { 
  const elements = listboxElementList.querySelectorAll("li"); 
  elements.forEach(element => {
    element.addEventListener("click", (e) => {
      const dataType = e.target.dataset.type;
      const name = e.target.textContent;
      const object = {name: name, attribute: dataType}; 
      addTags(object, tags); //
      createListboxsLists(recipes, getIngredients, listboxIngredientsList, "ingredients", tags); 
      createListboxsLists(recipes, getAppliances, listboxAppliancesList, "appliances", tags); 
      createListboxsLists(recipes, getUstensils, listboxUstensilsList, "ustensils", tags);
      handleTagClick(listboxIngredientsList); 
      handleTagClick(listboxAppliancesList);
      handleTagClick(listboxUstensilsList);
      handleRemoveTag();
      search(recipes, tags); 
    });
  });
};

//Crate a version of handleTagClick with a for loop
/* export const handleTagClick = (listboxElementList) => {
  const elements = listboxElementList.querySelectorAll("li");
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", (e) => {
      const dataType = e.target.dataset.type;
      const name = e.target.textContent;
      const object = {name: name, attribute: dataType};
      addTags(object, tags);
      createListboxsLists(recipes, getIngredients, listboxIngredientsList, "ingredients", tags);
      createListboxsLists(recipes, getAppliances, listboxAppliancesList, "appliances", tags);
      createListboxsLists(recipes, getUstensils, listboxUstensilsList, "ustensils", tags);
      handleTagClick(listboxIngredientsList);
      handleTagClick(listboxAppliancesList);
      handleTagClick(listboxUstensilsList);
      handleRemoveTag();
      search(recipes, tags);
    });
  }
}; */

handleTagClick(listboxIngredientsList); 
handleTagClick(listboxAppliancesList);
handleTagClick(listboxUstensilsList);

// Tags, remove click events : 
const handleRemoveTag = () => {
  const tagListHtml = document.querySelectorAll("#tags .tag");
  tagListHtml.forEach(tag => {
      tag.addEventListener("click", () => {
          const tagLabel = tag.getAttribute("data-name");
          tags = tags.filter(tag => tag.name !== tagLabel);
          createListboxsLists(recipes, getIngredients, listboxIngredientsList, "ingredients", tags);
          createListboxsLists(recipes, getAppliances, listboxAppliancesList, "appliances", tags);  
          createListboxsLists(recipes, getUstensils, listboxUstensilsList, "ustensils", tags);
          handleTagClick(listboxIngredientsList); 
          handleTagClick(listboxAppliancesList);
          handleTagClick(listboxUstensilsList);
          refreshTagList(tags);
          handleRemoveTag();
          search(recipes, tags);
        });
  });
};

// Main input search keyup event :
document.querySelector("#search-input").addEventListener("keyup", () => { 
    search(recipes, tags); // searchTextInput
});

// Listboxs input search keyup event
const handleFilterListboxs = (listboxElementList, $listboxInput, $functionTag, $attribute) => { 
  // Search inputs keyup event :
  const listboxsInputs = document.querySelector($listboxInput);
    listboxsInputs.addEventListener("keyup", (e) => {
      const refreshedRecipes = search(recipes, tags, false);
      const elementsArray = $functionTag(refreshedRecipes);
      const searchString = e.target.value;
      
      if (searchString.length >= 3) {
        const filteredItemsListboxs = elementsArray.filter((element) => { 
          return element.toLowerCase().includes(searchString.toLowerCase()); //
        });
        //console.log('filtered', filteredItemsListboxs);
        listboxElementList.innerHTML = "";
        refreshListboxsLists(filteredItemsListboxs, listboxElementList, tags, $attribute); //
        handleTagClick(listboxElementList); 
      } else {
        listboxElementList.innerHTML = "";
        refreshListboxsLists(elementsArray, listboxElementList, tags, $attribute); //
        handleTagClick(listboxElementList);
      }
    });
};
handleFilterListboxs(listboxIngredientsList, "#ingredients-input", getIngredients, "ingredients");
handleFilterListboxs(listboxAppliancesList, "#appliances-input", getAppliances, "appliances");
handleFilterListboxs(listboxUstensilsList, "#ustensils-input", getUstensils, "ustensils");
