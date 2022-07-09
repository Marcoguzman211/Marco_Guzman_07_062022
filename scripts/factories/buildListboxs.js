// No dupicates items in listboxs :
const noDuplicates = ($value, $index, $self) => { 
    return $self.indexOf($value) === $index; 
};

// Get items for listboxs : 
export const getIngredients = ($recipes) => {
    const allIngredients = [];
    $recipes.forEach(recipe => { 
        recipe.ingredients.forEach(object => allIngredients.push(object.ingredient));
    });
    const noDuplicatesIngredients = allIngredients.filter(noDuplicates);
    noDuplicatesIngredients.sort((a, b) => a.localeCompare(b));
    return noDuplicatesIngredients; 
};
export const getAppliances = ($recipes) => {
    const allAppliances = [];
    $recipes.forEach(recipe => {
        allAppliances.push(recipe.appliance);
    });
    const noDuplicatesAppliances = allAppliances.filter(noDuplicates);
    noDuplicatesAppliances.sort((a, b) => a.localeCompare(b));
    return noDuplicatesAppliances;
};
export const getUstensils = ($recipes) => {
    const allUstensils = [];
    $recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => allUstensils.push(ustensil)));
    const noDuplicatesUstensils = allUstensils.filter(noDuplicates);
    noDuplicatesUstensils.sort((a, b) => a.localeCompare(b));
    return noDuplicatesUstensils;
};

// Create listboxs lists :
export const createListboxsLists = ($recipes, $functionGetItems, $listboxElementsList, $attribute, $tags) => { 
    const items = $functionGetItems($recipes);
    $listboxElementsList.innerHTML = "";
    items.forEach(item => {
        const elementList = document.createElement("li");
        elementList.textContent = item;
        elementList.setAttribute("data-type", $attribute); 
        if (!$tags.find(tag => tag.name.toLowerCase() === item.toLowerCase())) { // if item ≠ tag... 
            $listboxElementsList.append(elementList); // ... append each item in listboxList
        }     
    });
};

// Refresh listboxs lists
export const refreshListboxsLists = ($filteredItemsListboxs, $listboxElementsList, $tags, $attribute) => {
    $filteredItemsListboxs.forEach(filteredItemListbox => {
        if (!$tags.find(tag => tag.name.toLowerCase() === filteredItemListbox.toLowerCase())) { 
            const element = document.createElement("li");
            element.textContent = filteredItemListbox.toLowerCase();
            element.setAttribute("data-type", $attribute);
            $listboxElementsList.append(element);
        }     
    });
};
