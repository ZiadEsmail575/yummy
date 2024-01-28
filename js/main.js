let mealsDataShow = document.querySelector("#mealsDataShow");
let searchingInputsSection = document.querySelector("searchingInputsSection");
let flag1, flag2, flag3, flag4, flag5, flag6;
// =====WEBSITE BURGER LOADER====================
function burgerLoader() {

    $(".burgerLoader").fadeOut(1500, function () {
        $("#loading").slideUp(500, function () {
            $("body").css("overflow", "auto")

        })
    })
    getMealsData()
    closeSideNavBar();
}
$(document).ready(burgerLoader);

function load() {
    return `
    <div id="innerloading">
    <img
    src="./img/CSS Burger loading animation [GIF].gif"
    class="burgerLoader2"
    alt=""
    />
  </div>
    `
}
// ??????????????CLOSE SIDE BAR FUNCTION??????????????
function closeSideNavBar() {
    let sideNavBar = $(".sideNavBar").innerWidth();
    $(".sideNav").animate({ left: `-${sideNavBar}` }, 500);
    $(".open-close-Toggle").addClass("fa-bars");
    $(".open-close-Toggle").removeClass("fa-xmark");

    for (let i = 0; i < 5; i++) {
        $("#links li").animate({ top: 100 }, (i + 5) * 50)

    }
};
// ??????????????OPEN SIDE BAR FUNCTION??????????????
function openSideNavBar() {
    $(".sideNav").animate({ left: 0 }, 500);
    $(".open-close-Toggle").removeClass("fa-bars");
    $(".open-close-Toggle").addClass("fa-xmark");

    for (let i = 0; i < 5; i++) {
        $("#links li").eq(i).animate({ top: 0 }, (i + 5) * 100)

    }
};
// ***********TOGGLE BETWEEN OPEN AND CLOSE SIDE BAR ****************
$(".sidNavControl .open-close-Toggle").on("click", function () {
    if ($(".sideNav").css("left") == "0px") {
        closeSideNavBar();
    } else {
        openSideNavBar();
    };
});


//GET DATA FROM API AND SHOW IT IN HOME SECTION
async function getMealsData() {
    $("#mealsDataShow").html(load());
    let mealApiREq = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let mealApiRes = await mealApiREq.json();
    let apiResponse = mealApiRes.meals;
    displayMealsData(apiResponse);

};
// SHOW DATa IN HOME SECTION
function displayMealsData(Array) {
    if (Array == null || Array == undefined || Array.length === 0) return
    let mealsContainer = ``;
    for (let i = 0; i < Array.length; i++) {
        mealsContainer += `<div class="col-md-3">
        <div class="mealCrad cursor rounded-4 overflow-hidden position-relative" onclick=getMealsInDetails(${Array[i].idMeal}) >
            <img src="${Array[i].strMealThumb}" class="w-100" alt="meal-1">
            <div class="layer position-absolute d-flex align-items-center">
            <h3 class="p-2 text-black">${Array[i].strMeal}</h3>
            </div>
        </div>
        </div>`

    };
    $("#mealsDataShow").html(mealsContainer);
};
//display Data in DETAILS ON CLICK ON DATA IN HOME SECTION
function displayMealsInDetails(Array) {
    let current = Array[0];
    let strIngredients = ``;
    for (let i = 0; i < 23; i++) {
        if (current[`strIngredient${i}`]) {
            strIngredients += `
            <li class=" bg-success d-inline-block px-3 py-2 mb-2 rounded-3">${current[`strMeasure${i}`]} ${current[`strIngredient${i}`]}</li>
            `;
        }
    };
    let emptyTag = [];
    let tagsDetails = current.strTags ? current.strTags.split(",") : emptyTag;

    let strTags = ``;
    for (let i = 0; i < tagsDetails.length; i++) {

        strTags += `
        <li class="tags bg-info d-inline-block px-3 py-2 rounded-3 text-white">${tagsDetails[i]}</li>
        `;
    };
    let mealsContainer = ``;
    for (let i = 0; i < Array.length; i++) {
        mealsContainer += `
        <div class="col-md-4 text-white">
        <div class="mb-2 rounnded-2 overflow-hidden">
        <img
        src="${current.strMealThumb}"
        class="w-100"
        alt="img"
        />
        </div>
        <h2 class="text-white">${current.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2 class="text-white">instructions</h2>
        <p class="text-white">
        ${current.strInstructions}
        </p>
        <h3 class="mb-2 text-white">Area :${current.strArea} </h3>
        <h3 class="mb-2 text-white">category : ${current.strCategory}</h3>
        <h4 class="mb-2 text-white">recipes :</h4>
        <ul class="g-3">
    ${strIngredients}
        </ul>
        <h4 class="text-white">Tags :</h4>
    <ul>
${strTags}
    </ul>
    <a href="${current.strYoutube}" class="bg-danger rounded-3 text-decoration-none text-black px-3 py-2">youtube</a>
    <a href="${current.strSource}" class="bg-success rounded-3 text-decoration-none text-black px-3 py-2">source</a>
    </div>
    </div>
        `
    };


    $("#mealsDataShow").html(mealsContainer);

};
//GET DATA TO DISPLAY DETAILS OF HOME SECTION
async function getMealsInDetails(mealId) {
    $("#mealsDataShow").html(load());
    let mealApiREq = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    let mealApiRes = await mealApiREq.json();
    closeSideNavBar();
    displayMealsInDetails(mealApiRes.meals);

};
function showSearchInputs() {
    $("#mealsDataShow").html("");
    let searchContainer = `
    <div class="container">
    <div class="form-group gx-2 d-flex ">
    <input type="text" class="form-control cursor bg-transparent text-white w-50 mx-3 px-3 py-2" id="searchByName" placeholder="Search By Name" oninput=searchDataByName(this.value)>
    <input type="text" class="form-control cursor bg-transparent text-white w-50 px-3 py-2" maxlength=1 id="SearchByLetter" placeholder="Search By Letter" oninput=searchDataByLetter(this.value)>
    </div>
    </div>
    `;
    $("#searchingInputsSection").html(searchContainer);
    closeSideNavBar();
};
$("#search").on("click", showSearchInputs);
async function searchDataByName(inputvalue) {

    $("#mealsDataShow").html(load());
    let mealApiREq = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputvalue}`);
    let mealApiRes = await mealApiREq.json();
    closeSideNavBar();
    let apiResponse = mealApiRes.meals;
    if (apiResponse) {
        displayMealsData(apiResponse);
        $("#mealsDataShow").removeClass("d-none");
        $("#mealsDataShow").addClass("d-flex");
        if ($("#mealsDataShow").hasClass("d-flex")) {
            $("#showMealsInDetails").removeClass("d-none");
            $("#showMealsInDetails").addClass("d-flex");
        };
    } else {

        displayMealsData([]);
    }

};
async function searchDataByLetter(letter) {
    letter == "" ? (letter = "a") : "";
    $("#mealsDataShow").html(load());
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    let data = await response.json();
    let searchedMeals = data.meals;
    searchedMeals ? displayMealsData(searchedMeals) : searchedMeals = []
    closeSideNavBar();
};
function displayDataByCategory(Array) {
    $("#searchingInputsSection").html("")
    let mealsContainer = ``;
    for (let i = 0; i < Array.length; i++) {
        mealsContainer += `<div class="col-md-3">
        <div onclick=getMealInDetailsByCategories("${Array[i].strCategory}") class="categoryCrad cursor rounded-4 overflow-hidden position-relative">
            <img src="${Array[i].strCategoryThumb}" class="w-100" alt="meal-1">
            <div class="layer position-absolute p-3 text-center">
            <h3 class="p-2 text-black">${Array[i].strCategory}</h3>
            <p class="w-80 mx-auto">${Array[i].strCategoryDescription.split(" ").slice(0, 15).join(" ")}</p>
            </div>
        </div>
    </div>`
    };
    $("#mealsDataShow").html((mealsContainer));
}
async function getMealsDataByCategory() {
    $("#mealsDataShow").html(load());
    let mealApiREq = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let mealApiRes = await mealApiREq.json();
    let apiResponse = mealApiRes.categories;
    displayDataByCategory(apiResponse);
    closeSideNavBar()

}
$("#categories").on("click", getMealsDataByCategory);

async function getMealInDetailsByCategories(category) {
    $("#mealsDataShow").html(load());
    let mealApiREq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let mealApiRes = await mealApiREq.json();
    let apiResponse = mealApiRes.meals

    closeSideNavBar()
    displayMealsData(apiResponse);
};
function DisplayDataByArea(Array) {
    let mealsContainer = ``;
    for (let i = 0; i < Array.length; i++) {
        mealsContainer += `<div class="col-md-3">
        <div class="areaCrad cursor rounded-4 overflow-hidden position-relative text-white text-center" onclick=getMealInDetailsByArea("${Array[i].strArea}") >
            <li class="fa-solid fa-house-laptop fa-4x"></li>
            <h3>${Array[i].strArea}</h3>
        </div>
        </div>`

    };
    $("#mealsDataShow").html(mealsContainer);
}
async function getAreaData() {
    $("#mealsDataShow").html(load());
    let mealApiREq = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let mealApiRes = await mealApiREq.json();
    let apiResponse = mealApiRes.meals
    closeSideNavBar()
    DisplayDataByArea(apiResponse);
};
$("#area").on("click", getAreaData);


async function getMealInDetailsByArea(Area) {
    $("#mealsDataShow").html(load());
    let mealApiREq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
    let mealApiRes = await mealApiREq.json();
    let apiResponse = mealApiRes.meals;
    closeSideNavBar()
    displayMealsData(apiResponse);
};
function displayDataByIngredients(Array) {
    $("#mealsDataShow").html("");
    let mealsContainer = ``;
    for (let i = 0; i < Array.length; i++) {
        mealsContainer += `<div class="col-md-3">
        <div class="areaCrad rounded-4 cursor overflow-hidden position-relative text-white text-center" onclick=getMealInDetailsByIngredients('${Array[i].strIngredient}')>
            <li class="fa-solid fa-drumstick-bite fa-4x"></li>
            <h3>${Array[i].strIngredient}</h3>
            <p class="w-75 mx-auto">"${Array[i].strDescription.slice(0, 100)}"</p>
        </div>
        </div>`

    };
    $("#mealsDataShow").html(mealsContainer);
}
async function getDataByIngredients() {
    $("#mealsDataShow").html(load());
    closeSideNavBar();
    let mealApiREq = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let mealApiRes = await mealApiREq.json();
    let apiResponse = mealApiRes.meals.slice(0, 20);
    displayDataByIngredients(apiResponse);
}
$("#Ingredients").on("click", getDataByIngredients);

async function getMealInDetailsByIngredients(Ingredients) {
    $("#mealsDataShow").html(load());
    let mealApiREq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
    let mealApiRes = await mealApiREq.json();
    let apiResponse = mealApiRes.meals;
    
    displayMealsData(apiResponse);
};
function showContactUs() {
    let inputContain = `
    <div class="col-md-6">
    <input id="nameInput" onkeyup="validateName();validateButton()" type="text" class="form-control bg-transparent text-white" placeholder="Enter Your Name">
    <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
        Special characters and numbers not allowed
    </div>
</div>
<div class="col-md-6">
    <input id="emailInput" onkeyup="validateEmail();validateButton()" type="email" class="form-control bg-transparent text-white" placeholder="Enter Your Email">
    <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
        Email not valid *exemple@yyy.zzz
    </div>
</div>
<div class="col-md-6">
    <input id="phoneInput" onkeyup="validatePhone();validateButton()" type="text" class="form-control bg-transparent text-white" placeholder="Enter Your Phone">
    <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid Phone Number
    </div>
</div>
<div class="col-md-6">
    <input id="ageInput" onkeyup="validateAge();validateButton()" type="number" class="form-control bg-transparent text-white" placeholder="Enter Your Age">
    <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid age
    </div>
</div>
<div class="col-md-6">
    <input  id="passwordInput" onkeyup="validatePassword();validateButton()" type="password" class="form-control bg-transparent text-white" placeholder="Enter Your Password">
    <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid password *Minimum eight characters, at least one letter and one number:*
    </div>
</div>
<div class="col-md-6">
    <input  id="repasswordInput" onkeyup="repasswordValidation();validateButton()" type="password" class="form-control bg-transparent text-white" placeholder="Repassword">
    <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
        Enter valid repassword 
    </div>
</div>
<div class="col-md-12 text-center">
<button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
</div>
`;
    closeSideNavBar()
    $("#mealsDataShow").html(inputContain)
}
$("#contact").on("click", showContactUs)
function validateButton() {
    if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
        if (validateName() && validateEmail() && validateAge() && validatePhone && validatePassword() && repasswordValidation()) {
            document.querySelector("#submitBtn").removeAttribute("disabled");
        } else {
            document.querySelector("#submitBtn").setAttribute("disabled", true);
        }
    }
}
function validateName() {
    flag1 = true;
    let value = document.querySelector("#nameInput").value
    let regex = /^[a-zA-Z ]+$/;
    if (regex.test(value)) {
        $("#nameAlert").addClass("d-none");
        return true;
    }
    else {
        $("#nameAlert").removeClass("d-none");
        return false;
    }
}

function validateEmail() {
    flag2 = true;
    let value = document.querySelector("#emailInput").value
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(value)) {
        $("#emailAlert").addClass("d-none");
        return true;
    }
    else {
        $("#emailAlert").removeClass("d-none");
        return false;
    }
}

function validatePhone() {
    flag3 = true;
    let value = document.querySelector("#phoneInput").value
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (regex.test(value)) {
        $("#phoneAlert").addClass("d-none");
        return true;
    }
    else {
        $("#phoneAlert").removeClass("d-none");
        return false;
    }
}

function validateAge() {
    flag4 = true;
    let value = document.querySelector("#ageInput").value
    let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    if (regex.test(value)) {
        $("#ageAlert").addClass("d-none");
        return true;
    }
    else {
        $("#ageAlert").removeClass("d-none");
        return false;
    }
}
function validatePassword() {
    flag5 = true;
    let value = document.querySelector("#passwordInput").value
    let regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (regex.test(value)) {
        $("#passwordAlert").addClass("d-none");
        return true;
    }
    else {
        $("#passwordAlert").removeClass("d-none");
        return false;
    }
}
function repasswordValidation() {
    flag6 = true;
    let pw = document.getElementById("repasswordInput").value;
    let rePassword = document.getElementById("passwordInput").value;
    if (pw == rePassword) return true;
    else return false;
}