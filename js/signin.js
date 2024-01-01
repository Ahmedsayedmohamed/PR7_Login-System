// inputs
var emailInput = document.getElementById("emailInput");
var passInput = document.getElementById("passInput");

// Messages info & Alerts
var MessageEmailInfo = document.getElementById("MessageEmailInfo");
var MessagePassInfo = document.getElementById("MessagePassInfo");
var emailPassError = document.getElementById("emailPassError");
var emailError = document.getElementById("emailError");
var passError = document.getElementById("passError");
var emailPassNull = document.getElementById("emailPassNull");

// Sign in button
var singIn = document.getElementById("singIn");

// ready vars
var users = [];
var emails = [];
var pass;
var userName;

// update users list as local storage if found
if (localStorage.getItem("usersList") != null) {
  users = JSON.parse(localStorage.getItem("usersList"));
}

// storing all mails to check later & its call to run
function allMails() {
  if (users.length != 0) {
    for (var i = 0; i < users.length; i++) {
      emails.push(users[i].email);
    }
  }
}

allMails();

// check email
emailInput.addEventListener("input", checkEmail);
function checkEmail() {
  clearAlerts();
  if (emails.includes(emailInput.value)) {
    emailInput.classList.add("is-valid", "mb-4");
    emailInput.classList.remove("is-invalid", "mb-1");
    MessageEmailInfo.classList.add("d-none");
    for (var i = 0; i < users.length; i++) {
      if (emailInput.value == users[i].email) {
        pass = users[i].password;
        userName = users[i].name;
      }
    }
    return true;
  } else {
    clearAlerts();
    emailInput.classList.remove("is-valid", "mb-4");
    emailInput.classList.add("is-invalid", "mb-1");
    MessageEmailInfo.classList.remove("d-none");
    return false;
  }
}

// check pass
passInput.addEventListener("input", checkPass);
function checkPass() {
  clearAlerts();
  if (pass == passInput.value) {
    passInput.classList.add("is-valid", "mb-4");
    passInput.classList.remove("is-invalid", "mb-1");
    MessagePassInfo.classList.add("d-none");
    return true;
  } else {
    clearAlerts();
    passInput.classList.remove("is-valid", "mb-4");
    passInput.classList.add("is-invalid", "mb-1");
    MessagePassInfo.classList.remove("d-none");
    return false;
  }
}

// Sign in actions
singIn.addEventListener("click", function () {
  if (checkEmail() && checkPass()) {
    sessionStorage.setItem("userName", userName);
    singIn.setAttribute("href", "home.html");
  } else if (emailInput.value == "" && passInput.value == "") {
    emailPassNull.classList.remove("d-none");
  } else if (checkEmail() == true && checkPass() == false) {
    passError.classList.remove("d-none");
  } else if (checkEmail() == false && checkPass() == true) {
    emailError.classList.remove("d-none");
  } else {
    emailPassError.classList.remove("d-none");
  }
});

// clear Alerts function
function clearAlerts() {
  passError.classList.add("d-none");
  emailError.classList.add("d-none");
  emailPassError.classList.add("d-none");
}
