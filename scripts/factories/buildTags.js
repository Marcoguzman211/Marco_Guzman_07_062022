const tagsNode = document.getElementById("tags");

// Add tag(s) :
export const addTags = (tag, $tags) => { // $tags' main []
    $tags.push(tag);
    refreshTagList($tags); // $tags' main []
    document.getElementById("ingredients-input").value = "";
    document.getElementById("appliances-input").value = ""; 
    document.getElementById("ustensils-input").value = ""; 
};

// Refresh list of tag(s) :
export const refreshTagList = ($tags) => { // $tags' main []
    tagsNode.innerHTML = ""; // Empty display, not tags' datas
    $tags.forEach(tag => { 
        const tagCard = document.createElement("div");
        tagCard.innerHTML = `<div>${tag.name}</div> <i class="bi bi-x-circle"></i>`;
        tagCard.classList.add("tag");
        tagCard.setAttribute("data-type", `${tag.attribute}`);
        tagCard.setAttribute("data-name", `${tag.name}`); 
        tagsNode.append(tagCard);
    });
};
