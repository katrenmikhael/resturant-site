/**variables to signup page */
var uname = document.getElementById("name");
var uemail = document.getElementById("email");
var upassword = document.getElementById("password");
var submit_btn = document.getElementById("submit");
var usersContainer = [];
var success = document.getElementById("success");
var failed = document.getElementById("failed");
var signinLink = document.getElementById("signin");
var loginBtn = document.getElementById("login-btn");
console.log(signinLink);
if (localStorage.getItem("users") != null) {
  usersContainer = JSON.parse(localStorage.getItem("users"));
}

submit_btn.addEventListener("click", addUser);
signinLink.addEventListener("click", goLogin);
loginBtn.addEventListener("click", goLogin);
function addUser() {
  if (verifyEmail()) {
    user = {
      name: uname.value,
      email: uemail.value,
      password: upassword.value,
    };
    usersContainer.push(user);
    failed.classList.add("d-none");
    success.classList.remove("d-none");
    localStorage.setItem("users", JSON.stringify(usersContainer));
  } else {
    failed.classList.remove("d-none");
    success.classList.add("d-none");
  }
}

function verifyEmail() {
  for (var i = 0; i < usersContainer.length; i++) {
    if (usersContainer[i].email == uemail.value || uemail.value == "") {
      return false;
    }
  }
  return true;
}

function goLogin() {
  window.location.assign("../html/login.html");
}
