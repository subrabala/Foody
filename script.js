const searchBtn = document.getElementById('search-btn');
const getRecipie = document.getElementById('get-recipie');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const mealDetailsContent = document.querySelector('.meal-details');

// event listeners

searchBtn.addEventListener('click', getMealList);
getRecipie.addEventListener('click', getMealRecipie);

recipeCloseBtn.addEventListener('click' , ()=>{
    mealDetailsContent.parentElement.classList.remove('showRecipie');
});

// get the list of meals with this ingredient 

function getMealList(){
    let ingredient=document.getElementById('search-input').value.trim();
    
    // adding search input to api's address
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)

    //  FETCHING API
    .then(response => response.json())
    .then(data => {
        let html = "";
        // if meal is available
        if(data.meals){
            // then for every meal
            data.meals.forEach(meal => {
                // the html content will be changed
                html += `
                <div class="meal-result">
                <div id="meal">
                   <img src="PotatoChips.jpeg" class="image" alt="food">
                 <div class="meal-name">
                   <h3>Potato chips</h3>
                   <a href="#" class="get-recipie" id="get-recipie">Get Recipie</a>
                 </div>
               </div>
             </div>
                `
            })
        }
    })

}
