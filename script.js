const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal-result');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const mealDetailsContent = document.querySelector('.meal-details');

// event listeners

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

recipeCloseBtn.addEventListener('click' , ()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipie');
});

// get the list of meals with this ingredient 

function getMealList(){
    let ingredient=document.getElementById('search-input').value.trim();

    // adding search input to api's address
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)

    //  FETCHING API
    .then(response => response.json())
    .then(data => {
        let html = "";
        // if meal is available
        if(data.meals){
            // then for every meal
            data.meals.forEach((meal, index) => {
                // the html content will be changed
                console.log(index);
                html += `
                ${index %3 ===0 ? '<div class="meal-row">' : ''}
                <div class="meal-cell">
                <div class="meal" data-id="${meal.idMeal}"/>
                   <img src="${meal.strMealThumb}" class="image" alt="food"/>
                 <div class="meal-name">
                   <h3>${meal.strMeal}</h3>
                   <a href="#" class="get-recipie" id="get-recipie">Get Recipe</a>
                 </div>
                 </div>
                </div>
                ${index %3 ===2 || index===data.meals.length-1 ? '</div>' : ''}
                `;

                
            })

            mealList.classList.remove('notFound');
        }
        else{
            html= "Sorry, no recipies found with this ingredient :(";
            mealList.classList.add('notFound');
        }

        // mealList content = the dynamic content we just wrote
        mealList.innerHTML = html;

    });
}




// onclick of get recipie
function getMealRecipe(e){
    e.preventDefault()
    // to prevent default actio of html page
    if(e.target.classList.contains('recipie-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
        .then(response =>response.json())
        .then(data => mealRecipeModal(data.meals));

    }
    console.log('clicked');

}

// the data to be displayed
function mealRecipeModal(meal){
    console.log(meal);
    meal=meal[0];
    let html = `
        <button class="close recipie-close" id="recipie-close">
        <i class="fas fa-times btn-close"></i>
        </button>
        <div class="details-content">
        <div class="detail-title">
            ${meal.strMeal}
        </div>
        <div class="detail-category">
            ${meal.strCategory}
        </div>
        <h3>Instructions :</h3>
        <div class="detail-recipie">
        ${meal.strInstructions}
            </div>
        <div class="detail-image">
            <img src="${meal.strMealThumb}" class="detail-image" alt="">
        </div>
        <div class="link">
            <a href="${meal.strYoutube}" class="link-el">Watch Video</a>
        </div>
        </div>
    `;
    mealDetailsContent.innerHTML =html;
    // the outer block's content is now the one displayed in 'html' variable
    mealDetailsContent.parentElement.classList.add('showRecipie');

}




