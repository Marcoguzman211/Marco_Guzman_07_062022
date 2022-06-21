export const createTags = ($tags, $tagsContainer) => {
    $tagsContainer.innerHTML = "";
    $tags.forEach(tag => {
        console.log(tag.datatype);
        const newTag = document.createElement("div");
        newTag.innerHTML = `<div>${tag.name}</div> <i class="bi bi-x-circle"></i>`;
        newTag.classList.add("tag");
        newTag.setAttribute("data-type", `${tag.datatype}`);
        newTag.setAttribute("data-name", `${tag.name}`) ;
        console.log(newTag.innerHTML);
        $tagsContainer.append(newTag);
    });
};

export const addTag = ($newTag, $tags) => {
    const tagObject = {name: $newTag.textContent, datatype: $newTag.getAttribute("data-type")};
    $tags.push(tagObject);
};