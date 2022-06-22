export const createTags = ($tags, $tagsContainer) => {
    $tagsContainer.innerHTML = "";
    $tags.forEach(tag => {
        const newTag = document.createElement("div");
        newTag.innerHTML = `<div>${tag.name}</div> <i class="bi bi-x-circle"></i>`;
        newTag.classList.add("tag");
        newTag.setAttribute("data-type", `${tag.datatype}`);
        newTag.setAttribute("data-name", `${tag.name}`) ;
        $tagsContainer.append(newTag);
    });
};

export const addTag = ($newTag, $tags) => {
    const tagObject = {name: $newTag.name, datatype: $newTag.datatype};
    $tags.push(tagObject);
};