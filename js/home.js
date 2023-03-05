var indexUser = JSON.parse(localStorage.getItem("index"));
var logoutBtn = document.getElementById("logOut");
var callName = document.getElementById("callname");
var selectedRecipe = document.getElementById("recipes");
var usersContainer = [];
var cardImg = [];
var postsPlace = document.getElementById("posts");
var index = 0;
var boxItem = document.getElementById("boxItem");
var boxContainer = document.getElementById("boxContainer");
var closeBtn = document.getElementById("close");
var prevBtn = document.getElementById("prev");
var nextBtn = document.getElementById("next");
if (localStorage.getItem("index")) {
  usersContainer = JSON.parse(localStorage.getItem("users"));
}
//add action when select recipe
selectedRecipe.addEventListener("change", function () {
  DisplayRecipe();
});
//add action to close btn
closeBtn.addEventListener("click", close);

//add action when click on log out button
logoutBtn.addEventListener("click", logOut);
//add to html user name to say welcome
callName.innerHTML = usersContainer[indexUser].name;

function logOut() {
  window.location.href = "../html/login.html";
}
function DisplayRecipe() {
  var httpReq = new XMLHttpRequest();
  var recipesAllObject = [];
  var postsContainer = ``;

  httpReq.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/search?q=${selectedRecipe.value}`
  );
  httpReq.send();

  httpReq.addEventListener("readystatechange", function () {
    if (httpReq.readyState == 4) {
      recipesAllObject = JSON.parse(httpReq.response).recipes;

      for (var i = 0; i < recipesAllObject.length; i++) {
        postsContainer += `
         
        <div class="col-md-4 my-3">
        <div class="card" style="height: 500px;">
         <div class="card-img w-100 h-75">
           <img src="${recipesAllObject[i].image_url}" class="image" alt="recipe">
           </div>
           <div class="card-body text-center">
             <h5 class="card-title">${recipesAllObject[i].title}</h5>
             <a class="btn btn-outline-dark" href="${recipesAllObject[i].source_url}" id="source-recipe">GoTo Source</a>
           </div>
        </div>
       </div>

      </div>
              `;
      }
      postsPlace.innerHTML = postsContainer;
      cardImg = Array.from(document.getElementsByClassName("image"));
      //add action when click on image
      for (var i = 0; i < cardImg.length; i++) {
        cardImg[i].addEventListener("click", function (e) {
          index = cardImg.indexOf(e.target);
          boxItem.style.backgroundImage = `url(${e.target.src})`;
          boxContainer.style.display = "flex";
        });
      }
      //add action to next btn
      nextBtn.addEventListener("click", nextMove);
      prevBtn.addEventListener("click", prevMove);
    }
  });
}

function close() {
  boxContainer.style.display = "none";
}
function nextMove() {
  // cardImg = Array.from(document.getElementsByClassName("image"));
  index++;

  if (index == cardImg.length) {
    index = 0;
  }
  boxItem.style.backgroundImage = `url(${cardImg[index].src})`;
}
function prevMove() {
  // cardImg = Array.from(document.getElementsByClassName("image"));

  if (index == 0) {
    index = cardImg.length;
  }

  index--;
  boxItem.style.backgroundImage = `url(${cardImg[index].src})`;
}
