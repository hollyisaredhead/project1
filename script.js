var recipeSet = [];

$(document).ready(function() {



// input    
// var input = document.querySelector('#searchBar').value
// var queryURL = "https://api.edamam.com/search?q=" + input + "&from=0&to=100&app_id=de5d421e&app_key=3b067d8684260b2f7abcb8eb43481d4c" 
// health labels
var healthLabel = "&health=";
// diets
var keto = "keto-friendly";
var pesca = "pescatarian";

// allowable filters
var balanced = "balanced";
var highProtein = "high-protein"
var lowFat = "low-fat";
var lowCarb = "low-carb";
var sugarConscious = "sugar-conscious";
var peanutFree = "peanut-free";
var treeNutFree = "tree-nut-free";
var alcoholFree = "alcohol-free";
var vegan = "vegan";
var vegetarian = "vegetarian";


// intolerances
var gluten = "gluten-free";
var lactoseIntolerant = "dairy-free";
// meal type
var mealType = "&mealType=";
var breakfast = "Breakfast";
var lunch = "Lunch";
var dinner = "Dinner";
// cuisine type
var cuisineType = "&cuisineType=";
var american = "American";
var asian = "Asian";
var british = "British";
var caribbean = "Caribbean";
var centralEurope = "Central Europe";
var chinese = "Chinese";
var easternEurope = "Eastern Europe";
var french = "French";
var indian = "Indian";
var italian = "Italian";
var japanese = "Japanese";
var kosher = "Kosher";
var mediterranean = "Mediterranean";
var mexican = "Mexican";
var middleEastern = "Middle Eastern";
var nordic = "Nordic";
var southAmerican = "South American";
var southEastAsian = "South East Asian";




var setnumber = 0;

// getRecipe();


$("#nextSet").on("click", function (event) {
    

    if(setnumber > 8) {
        return;
    }

    else {
    event.preventDefault();
    setnumber++
    renderList();
    }
})


$("#previousSet").on("click", function (event) {
    if(setnumber <= 0) {
        return
    }

    else {
        
        event.preventDefault();
        setnumber--
        renderList();
    }
    
})

$("#searchButton").on("click", function(event) {
    event.preventDefault();
    
    
    

    // var input = encodeURI(input)
    
    
    // if (input === "") {
    
    // return;
    
    //  }
    
     
    
    getRecipe();
    
    
    })
    
function getRecipe() {
    
    var input = document.querySelector('#searchBar').value
    var queryURL = "https://api.edamam.com/search?q=" + input + "&from=0&to=100&app_id=de5d421e&app_key=3b067d8684260b2f7abcb8eb43481d4c"
    


    if (document.getElementById("vegan").checked = true) {
        
        var queryURL = queryURL.concat(healthLabel, vegan)

    }



    // if ( document.getElementById("balanced").checked = true) {

    //     var queryURL = queryURL.concat(healthLabel, balanced)
    // }

    // if ( document.getElementById("low-fat").checked = true) {

    //     var queryURL = queryURL.concat(healthLabel, lowFat)
    // }

    // if ( document.getElementById("low-carb").checked = true) {

    //     var queryURL = queryURL.concat(healthLabel, lowCarb)
    // }

    // if ( document.getElementById("sugar-conscious").checked = true) {

    //     var queryURL = queryURL.concat(healthLabel, sugarConscious)
    // }

    // if ( document.getElementById("peanut-free").checked = true) {

    //     var queryURL = queryURL.concat(healthLabel, peanutFree)
    // }

    // if ( document.getElementById("tree-nut-free").checked = true) {

    //     var queryURL = queryURL.concat(healthLabel, treeNutFree)
    // }

    // if ( document.getElementById("alcohol-free").checked = true) {

    //     var queryURL = queryURL.concat(healthLabel, vegan)
    // }

    // if ( document.getElementById("vegetarian").checked = true) {

    //     var queryURL = queryURL.concat(healthLabel, vegetarian)
    // }

    // if ( document.getElementById("high-protein").checked = true) {

    //     var queryURL = queryURL.concat(healthLabel, highProtein)
    // }


    $.ajax({
        url: queryURL,
        method: "GET"


    }).then(function(response) {
        
        
        console.log(queryURL);
       
        setnumber = 0;
        recipeSet = response.hits
        
        renderList();
        
    

        
// user click on next set




    })
    
}


function renderList () {

    $("#accordion").text("")

    for(var i = 0; i <= 9; i++){
        
        // recipe labels
        recipeSet[ setnumber*10+i ];
            
        li = $("<li>")
        
        
        addRecipeButton = $("<button>" + "+" + "</button>")
        addRecipeButton.addClass("uk-margin-left")
        
        recipeLabel = $("<a>" + recipeSet[ setnumber*10+i ].recipe.label + "</a>")
        recipeLabel.append(addRecipeButton)
        
        


        recipeLabel.attr("href", "#")
        recipeLabel.attr("data-recipe-id", recipeSet[ setnumber*10+i ].recipe.uri)
        // recipeLabel.attr("data", `label-${i}`)
        // recipeLabel.data("recipeId",recipeSet[ setnumber*10+i ].recipe.uri)
        recipeLabel.addClass("uk-accordion-title")
        
        
        
        // accordion div
        accordionDiv = $("<div>");
        accordionDiv.addClass("uk-accordion-content")
        // accordionDiv.attr("data", `details-${i}`)

        // ingredients header ul

        ingredientsUl = $("<ul>" + 'Ingredients' + "</ul>");
        ingredientsUl.addClass("")

        

        // recipe ingredients

        

        
        $.each(recipeSet[ setnumber*10+i ].recipe.ingredientLines, function (index, value) {
            
            

            recipeIngredients = $("<li>" + value + "</li>")
            recipeIngredients.addClass("uk-padding-small")
    
            ingredientsUl.append(recipeIngredients)

            
        })


        // recipe image

            recipeImg = $("<img>").css({ 'height': '150px', 'width': '200px' });

            recipeImg.attr("src", recipeSet[ setnumber*10+i ].recipe.image);
            
           

        // recipe url

            recipeUrl = $("<div>");
            recipeUrlLink = $("<a>" + recipeSet[ setnumber*10+i ].recipe.url + "</a>");
            recipeUrl.append(recipeUrlLink);
            
        

            accordionDiv.append(recipeImg, ingredientsUl, recipeUrl)
            li.append(recipeLabel, accordionDiv)
            $("#accordion").append(li)
            
    }
    
   

}

});