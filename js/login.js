/**variables to signin page */
var uEmail = document.getElementById("email");
var uPassword = document.getElementById("password");
var loginBtn = document.getElementById("btn-login");
var usersContainer = [];
var failed = document.getElementById("failed");
var signUp = document.getElementById("signUp");
var registerBtn = document.getElementById("register-btn");
if (localStorage.getItem("users") != null) {
  usersContainer = JSON.parse(localStorage.getItem("users"));
}
signUp.addEventListener("click", signup);
loginBtn.addEventListener("click", login);
registerBtn.addEventListener("click", signup);
function login() {
  if (verifyLogin()) {
    window.location.href = "../html/home.html";
  } else {
    failed.classList.remove("d-none");
  }
}

function verifyLogin() {
  for (var i = 0; i < usersContainer.length; i++) {
    if (
      usersContainer[i].email == uEmail.value &&
      usersContainer[i].password == uPassword.value
    ) {
      localStorage.setItem("index", i);
      return true;
    }
  }
  return false;
}

function signup() {
  window.location.href = "../index.html";
}
