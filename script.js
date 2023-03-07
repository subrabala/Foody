const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal-result');

const mealDetailsContent = document.getElementById('meal-details');

// event listeners

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);



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
                   <a href="#" class="get-recipe" id="get-recipe">Get Recipe</a>
                 </div>
                 </div>
                </div>
                ${index %3 ===2 || index===data.meals.length-1 ? '</div>' : ''}
                `;

                
            })

            mealList.classList.remove('notFound');
        }
        else{
            html= "Sorry, no recipes found with this ingredient :(";
            mealList.classList.add('notFound');
        }

        // mealList content = the dynamic content we just wrote
        mealList.innerHTML = html;

    });
}




// onclick of get recipe
function getMealRecipe(e){
    e.preventDefault();
    // to prevent default action of html page
    if(e.target.classList.contains('get-recipe')){
        let mealItem = e.target.parentElement.parentElement.getAttribute('data-id');
        console.log(e.target.parentElement.parentElement.getAttribute('data-id'));
        fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem}`)
        .then(response =>response.json())
        .then(data => mealRecipeModal(data.meals[0]));

    }
    console.log('clicked');

}


// the data to be displayed
function mealRecipeModal(meal){
    console.log(meal);
    
    let html = `
        <button class="close recipe-close" id="recipe-close-btn">
        <i class="fas fa-times btn-close" "></i>
        </button>
        <div class="details-content">
        <div class="detail-title">
            ${meal.strMeal}
        </div>
        <div class="detail-category">
            ${meal.strCategory}
        </div>
        <h3>Instructions :</h3>
        <div class="detail-recipe">
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
    const recipeCloseBtn = document.getElementById('recipe-close-btn');
    recipeCloseBtn.addEventListener('click' , ()=>{
        mealDetailsContent.classList.remove('showRecipe');
        mealDetailsContent.classList.add('hidden');
        document.body.style.backgroundColor='white';
        document.body.style.opacity='1';
    });

    // the outer block's content is now the one displayed in 'html' variable
    mealDetailsContent.classList.add('showRecipe');
    

}




