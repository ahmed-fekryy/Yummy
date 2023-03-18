var meals = [];
var mealsByLetter = [];
var toggle = 0;
var details = [];
var ids = "52772";
var searchName = "";
var searchLetter = "s";
var mealname = "Seafood";
var Categories = [];
var area = [];
var mealarea = "Russian";
var inter = [];
var mealinter = "Bacon";

// navbar animations

$(".navIcon").click(() => {
  if (toggle == 0) {
    $(".nav1").animate({ left: "0" }, 400);
    $(".nav").animate({ left: "269px" }, 400);
    $(".navIcon").html(`<i class="fa-solid fa-xmark fs-1"></i>`);
    $(".p1").animate({ marginTop: "10px" }, 400);
    $(".p2").animate({ marginTop: "0px" }, 500);
    $(".p3").animate({ marginTop: "0px" }, 600);
    $(".p4").animate({ marginTop: "0px" }, 700);
    $(".p5").animate({ marginTop: "0px" }, 800);

    toggle = 1;
  } else {
    downTab();
  }
});

function downTab() {
  $(".nav1").animate({ left: "-270px" }, 400);
  $(".nav").animate({ left: "0" }, 400);
  $(".navIcon").html(`<i class="fa-solid fa-bars fs-3"></i>`);
  $(".p1").animate({ marginTop: "1000px" }, 400);
  $(".p2").animate({ marginTop: "1000px" }, 500);
  $(".p3").animate({ marginTop: "1000px" }, 600);
  $(".p4").animate({ marginTop: "1000px" }, 700);
  $(".p5").animate({ marginTop: "1000px" }, 800);
  toggle = 0;
}
// end of the animation funciton

// get meals in main page

async function getMeals() {
  api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`
  );
  var response = await api.json();
  meals = response.meals;
  console.log(meals);
}

function displayMeals() {

  var meal = "";

  for (let i = 0; i < meals.length; i++) {
    meal += `<div ids="${meals[i].idMeal}" class="col-xl-3 col-lg-4 col-md-6 rounded-3 pointer">

    <div ids="${meals[i].idMeal}" class="cards position-relative overflow-hidden p-0">

    
    <div ids="${meals[i].idMeal}" class="layer bg-gray w-100 h-100 position-absolute d-flex justify-content-start align-items-center rounded-3">
    <h2 ids="${meals[i].idMeal}" class="ms-2">${meals[i].strMeal}</h2>
    
    </div>
    <img ids="${meals[i].idMeal}" class="w-100 rounded-3" src="${meals[i].strMealThumb}" alt="">
    
    </div>
</div>`;
  }
  document.getElementById("meals").innerHTML = meal;
}

async function getDetiels() {
  api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`
  );
  var response = await api.json();
  details = response.meals;
  console.log(details);
}
function displayDetiels() {
  var recipes = "";
  var tags;
  if (details[0].strTags != null) {
    tags = details[0].strTags.split(",");
  } else {
    tags = "";
  }

  var tag = "";

  document.querySelector(
    ".mainDetails"
  ).innerHTML = `<img class="w-100" src="${details[0].strMealThumb}" alt="">
   <h2>${details[0].strMeal}</h2>`;

  document.querySelector(
    ".Instructions"
  ).innerHTML = ` <p>${details[0].strInstructions} </p>
   <h3>Area : ${details[0].strArea}</h3>
   <h3>Category : ${details[0].strCategory}</h3>`;

  for (let i = 1; i < 20; i++) {
    if (details[0]["strIngredient" + i] == "") {
      recipes += "";
    } else {
      recipes += `<li class="bg-milky py-1 px-2 m-2 rounded-2">${
        details[0]["strMeasure" + i]
      } ${details[0]["strIngredient" + i]}</li>`;
    }
  }
  document.querySelector(".recipes").innerHTML = recipes;

  for (let i = 0; i < tags.length; i++) {
    tag += `<p class="bg-secondary py-1 px-2 m-2 rounded-2 d-inline">${tags[i]}</p>`;
  }
  document.querySelector(".tags").innerHTML = tag;

  document.querySelector(
    ".btns"
  ).innerHTML = `<a href="${details[0].strSource}" Target=”_Blank”> <button class="btn btn-success">Source</button></a>
  <a href="${details[0].strYoutube}" Target=”_Blank”> <button class="btn btn-danger">YouTube</button></a>`;
}

async function getCategories() {
  api = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  var response = await api.json();
  Categories = response.categories;
  console.log(Categories);

  var meal = "";

  for (let i = 0; i < Categories.length; i++) {
    meal += `<div Category="${Categories[i].strCategory}" ids="${
      Categories[i].idCategory
    }" class="col-xl-3 col-lg-4 col-md-6 rounded-3 pointer">

    <div Category="${Categories[i].strCategory}" ids="${
      Categories[i].idCategory
    }" class="cards position-relative overflow-hidden p-0">

    
    <div Category="${Categories[i].strCategory}" ids="${
      Categories[i].idCategory
    }" class="layer bg-gray w-100 h-100 position-absolute d-flex flex-column justify-content-start align-items-center rounded-3 p-3 text-center">
    <h2 Category="${Categories[i].strCategory}" ids="${
      Categories[i].idCategory
    }" class="ms-2">${Categories[i].strCategory}</h2>
    <p Category="${Categories[i].strCategory}" ids="${
      Categories[i].idCategory
    }">${Categories[i].strCategoryDescription
      .split(" ")
      .slice(0, 20)
      .join(" ")}</p>
    
    </div>
    <img Category="${Categories[i].strCategory}" ids="${
      Categories[i].idCategory
    }" class="w-100 rounded-3" src="${Categories[i].strCategoryThumb}" alt="">
    
    </div>
</div>`;
  }
  document.getElementById("meals").innerHTML = meal;

  $(".cards").click((e) => {
    mealname = e.target.getAttribute("Category");
    console.log(mealname);
    getallcat();
  });
}

async function fillterCat() {
  api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealname}`
  );
  var response = await api.json();
  meals = response.meals;
  console.log(meals);
}
async function getallcat() {
  await fillterCat();
  await getDetiels();
  displayMeals();
  displayDetiels();

  $(".cards").click((e) => {
    ids = e.target.getAttribute("ids");
    $(".detiels").removeClass("d-none");
    $("#meals").addClass("d-none");

    getAll2();
  });
  $(".exit").click(() => {
    $(".detiels").addClass("d-none");
    $("#meals").removeClass("d-none");

    getAll2();
  });
}

$(".p2").click(() => {
  getCategories();
  downTab();
});

// end od categoris function

async function getAll2() {
  await getDetiels();
  displayDetiels();
}

async function getAll() {
  await getMeals();
  await getDetiels();
  displayMeals();
  displayDetiels();

  $(".cards").click((e) => {
    ids = e.target.getAttribute("ids");
    $(".detiels").removeClass("d-none");
    $("#meals").addClass("d-none");

    getAll2();
  });
  $(".exit").click(() => {
    $(".detiels").addClass("d-none");
    $("#meals").removeClass("d-none");

    getAll2();
  });
}
getAll();

$(".p1").click(() => {
  $(".search").removeClass("d-none");
  downTab();
});

function search(index) {
  searchName = index;
  console.log(searchName);
  getAll();
  downTab();
}
function search(index) {
  searchName = index;
  console.log(searchName);
  searchLetter = "f";
  getAll();
}

// new functions for area
async function getarea() {
  api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  var response = await api.json();
  area = response.meals;
  console.log(area);

  var meal = "";

  for (let i = 0; i < area.length; i++) {
    meal += `<div area="${area[i].strArea}" ids="${area[i].strArea}" class="col-xl-3 col-lg-4 col-md-6 rounded-3 pointer">

    <div area="${area[i].strArea}" ids="${area[i].strArea}" class="cards position-relative overflow-hidden p-0">
    <i  area="${area[i].strArea}" class="fa-brands fa-discord fs-10 text-bg-primary"></i>

  
    <h2 area="${area[i].strArea}" ids="${area[i].strArea}" class="ms-2 text-info">${area[i].strArea}</h2>
    </div>
</div>`;
  }
  document.getElementById("meals").innerHTML = meal;

  $(".cards").click((e) => {
    mealarea = e.target.getAttribute("area");
    console.log(mealarea);
    getallarea();
  });
}
async function fillterarea() {
  api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealarea}`
  );
  var response = await api.json();
  meals = response.meals;
  console.log(meals);
}
async function getallarea() {
  await fillterarea();
  await getDetiels();
  displayMeals();
  displayDetiels();

  $(".cards").click((e) => {
    ids = e.target.getAttribute("ids");
    $(".detiels").removeClass("d-none");
    $("#meals").addClass("d-none");

    getAll2();
  });
  $(".exit").click(() => {
    $(".detiels").addClass("d-none");
    $("#meals").removeClass("d-none");

    getAll2();
  });
}

$(".p3").click(() => {
  getarea();
  downTab();
});

// #####################################
async function getingredient() {
  api = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  var response = await api.json();
  inter = response.meals;
  console.log(inter);

  var meal = "";

  for (let i = 0; i < inter.length; i++) {
    meal += `<div inter="${inter[i].strIngredient}" ids="${
      inter[i].idIngredient
    }" class="col-xl-3 col-lg-4 col-md-6 rounded-3 pointer">

    <div inter="${inter[i].strIngredient}" ids="${
      inter[i].idIngredient
    }" class="cards position-relative overflow-hidden p-0">
    <i inter="${inter[i].strIngredient}"
    }" class="fa-brands fa-discord fs-10 text-bg-primary"></i>
    

  
    <h2 inter="${inter[i].strIngredient}" ids="${
      inter[i].strIngredient
    }" class="ms-2 text-info">${inter[i].strIngredient}</h2>
    </div>
    <p inter="${inter[i].strIngredient}">${
      inter[i].strDescription != null
        ? inter[i].strDescription.split(" ").slice(0, 20).join(" ")
        : inter[i].strDescription
    }</p>

</div>`;
  }
  document.getElementById("meals").innerHTML = meal;

  $(".cards").click((e) => {
    mealinter = e.target.getAttribute("inter");
    console.log(mealinter);
    getallinter();
  });
}
async function fillterinter() {
  api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealinter}`
  );
  var response = await api.json();
  meals = response.meals;
  console.log(meals);
}
async function getallinter() {
  await fillterinter();
  await getDetiels();
  displayMeals();
  displayDetiels();

  $(".cards").click((e) => {
    ids = e.target.getAttribute("ids");
    $(".detiels").removeClass("d-none");
    $("#meals").addClass("d-none");

    getAll2();
  });
  $(".exit").click(() => {
    $(".detiels").addClass("d-none");
    $("#meals").removeClass("d-none");

    getAll2();
  });
}

$(".p4").click(() => {
 getingredient();
  downTab();
});


// ########################333


const inputs = $('#contact input');

const passwordInput = $('#contact input').eq(4);
const repasswordInput = $('#contact input').eq(5);
const submitBtn = $('#contact button');


const nameRegex = /^.{3,}$/;
const emailRegex = /^.+@[a-zA-Z]+(\.[a-zA-Z]+)+$/;
const phoneRegex = /^(\+2)*01(1|0|2|5){1}[0-9]{8}$/;
const ageRegex = /^[1-9]{1}[0-9]{0,1}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).{8,}$/;

const regexMap = {
    'name' : nameRegex,
    'email' : emailRegex,
    'phone' : phoneRegex,
    'age' : ageRegex,
    'password' : passwordRegex,
}

function validHandler(elem)
{
    elem.removeClass('non-valid');
    elem.addClass('valid');
    elem.next().slideUp()
    elem.parent().children('i').eq(1).fadeOut()
    elem.parent().children('i').eq(0).fadeIn()
}

function nonValidHandler(elem)
{
    elem.removeClass('valid');
    elem.addClass('non-valid');
    elem.next().slideDown()
    elem.parent().children('i').eq(0).fadeOut()
    elem.parent().children('i').eq(1).fadeIn()
}

inputs.on('input',(elem)=>
{
    const input = $(elem.target);

    if( input.attr('name') === 'repassword' || input.attr('name') === 'password' )
    {
        if( passwordInput.val() === repasswordInput.val() ){ console.log('in 1');  validHandler(repasswordInput);  }
        else{ console.log('in 2');  nonValidHandler(repasswordInput);  }
        if( input.attr('name') === 'repassword'){ return; }
    }

    if(regexMap[input.attr('name')].test(elem.target.value) ){   validHandler(input);  }
    else{   nonValidHandler(input);  }

});

$(".p5").click(() => {
  $(".search").addClass("d-none");
  $("#meals").addClass("d-none");
  $(".cont").removeClass("d-none");
  $(".detiels").addClass("d-none");
  downTab();
});