export const toggleListBox = ($listboxList, $chevron ) => {
    if ($listboxList.classList.contains("hidden")) {
        $listboxList.classList.remove("hidden");
        $listboxList.classList.add("show");
        $chevron.classList.add("fa-chevron-up"); 
        $chevron.classList.remove("fa-chevron-down"); 
      } else {
        $listboxList.classList.add("hidden");
        $listboxList.classList.remove("show");
        $chevron.classList.remove("fa-chevron-up"); 
        $chevron.classList.add("fa-chevron-down"); 
      }
};

export const openOnInputListbox = ($listboxList, $chevron) => {
    $listboxList.classList.remove("hidden");
    $listboxList.classList.add("show");
    $chevron.classList.add("fa-chevron-up"); 
    $chevron.classList.remove("fa-chevron-down"); 
  };

//Functions to get ingredients, ustensils and appliances

// No dupicates items in listboxs :
const noDuplicates = ($value, $index, $self) => { 
  return $self.indexOf($value) === $index;
};

export const getIngredients = ($recipes) => {
  const allIngredients = [];
    $recipes.forEach(recipe => { 
        recipe.ingredients.forEach(object => allIngredients.push(object.ingredient));
    });
    const noDuplicatesIngredients = allIngredients.filter(noDuplicates).sort((a,b) => a.localeCompare(b));
    return noDuplicatesIngredients;
}; 

export const getAppliances = ($recipes) => {
  const allAppliances = [];
  $recipes.forEach(recipe => {
      allAppliances.push(recipe.appliance);
  });
  const noDuplicatesAppliances = allAppliances.filter(noDuplicates).sort((a, b) => a.localeCompare(b));
  return noDuplicatesAppliances;
};

export const getUstensils = ($recipes) => {
  const allUstensils = [];
  $recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => allUstensils.push(ustensil)));
  const noDuplicatesUstensils = allUstensils.filter(noDuplicates).sort((a, b) => a.localeCompare(b));
  return noDuplicatesUstensils;
};

// Create listboxs lists :
export const createListboxsLists = ($recipes, $functionGetItems, $listboxElementsList, $attribute, $tags) => { 
  const items = $functionGetItems($recipes);
  $listboxElementsList.innerHTML = "";
  items.forEach(item => {
      const elementList = document.createElement("li");
      elementList.textContent = item;
      elementList.setAttribute("data-type", $attribute) ;
      if (!$tags.find(tag => tag.name.toLowerCase() === item.toLowerCase())) { // if item ≠ tag... 
          $listboxElementsList.append(elementList); // ... append each item in listboxList
      }     
  });
};