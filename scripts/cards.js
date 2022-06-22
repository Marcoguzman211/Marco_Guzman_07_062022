export const displayCards = ($recipes, $container) => {
    $recipes.forEach(recipe => {
        const { name, ingredients, time, description } = recipe;
        const newCard = document.createElement("div");
        newCard.classList.add("card");
        const ingredientsLi = document.createElement("ul");
        ingredients.forEach((object) => {
            // no undefined :
            if ((object.ingredient !== undefined) 
             && (object.quantity !== undefined) 
             && (object.unit !== undefined)) {
               ingredientsLi.innerHTML += `<li class="ingredient-quantity-unit"><b>${object.ingredient}</b> : ${object.quantity} ${object.unit}</li>`;
            } 
            // unit undefined : 
            if ((object.ingredient !== undefined) 
             && (object.quantity !== undefined) 
             && (object.unit == undefined)) {
              ingredientsLi.innerHTML += `<li class="ingredient-quantity-unit"><b>${object.ingredient}</b> : ${object.quantity}</li>`;
            } 
            // unit and quantity undefined :
            if ((object.ingredient !== undefined) 
              && (object.quantity == undefined) 
              && (object.unit == undefined)) {
              ingredientsLi.innerHTML += `<li class="ingredient-quantity-unit"><b>${object.ingredient}</b></li>`;
            }
          });
        newCard.innerHTML = `<div class="card-header"></div>
        <div class="card-body">
            <div class="card-body-top">
                <h6 class="card-title">${name}</h6>
                <h6 class="time"><i class="bi bi-clock"></i> ${time} min</h6>
            </div>
            <div class="card-body-bottom">
                <ul class="recipe-ingredients">${ingredientsLi.innerHTML}</ul>
                <p class="recipe-text card-text">${description}</p>
            </div>
        </div>`;
        $container.appendChild(newCard);
    });
};