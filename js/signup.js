// inputs
var inputName = document.getElementById("inputName");
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");

// buttons
var signUp = document.getElementById("signUp");
var signIn = document.getElementById("signIn");

// Messages
var messageDuplicateEmail = document.getElementById("messageDuplicateEmail");
var createDone = document.getElementById("createDone");
var MessageNameInfo = document.getElementById("MessageNameInfo");
var MessageEmailInfo = document.getElementById("MessageEmailInfo");
var MessagePassInfo = document.getElementById("MessagePassInfo");
var missInputs = document.getElementById("missInputs");

// Array of users
var users = [];
var checkDuplicateMail = [];

// update users list as local storage if found
if (localStorage.getItem("usersList") != null) {
  users = JSON.parse(localStorage.getItem("usersList"));
}


// add user function
signUp.addEventListener("click", addUser);

function addUser() {
  if (validationName() && validationEmail() && validationPass()) {
    var user = {
      name: inputName.value,
      email: inputEmail.value,
      password: inputPassword.value,
    };
    users.push(user);
    localStorage.setItem("usersList", JSON.stringify(users));
    clearForm();
    createDone.classList.remove("d-none");
    inputName.classList.remove("is-valid");
    inputEmail.classList.remove("is-valid");
    inputPassword.classList.remove("is-valid");
  } else {
    missInputs.classList.remove("d-none");
  }
}

// clear form function
function clearForm() {
  inputName.value = "";
  inputEmail.value = "";
  inputPassword.value = "";
}

// Clear Alerts
function clearAlerts() {
  createDone.classList.add("d-none");
  createDone.classList.remove("d-block");
  missInputs.classList.add("d-none");
  missInputs.classList.remove("d-block");
}

//  input's function on clicking
inputName.addEventListener("input", validationName);
inputEmail.addEventListener("input", validationEmail);
inputPassword.addEventListener("input", validationPass);

// validation name function
function validationName() {
  var regaxName = /^[A-z]{1,}(\s|[A-z]){1,}[A-z]$/;
  if (regaxName.test(inputName.value)) {
    inputName.classList.add("is-valid", "mb-4");
    inputName.classList.remove("is-invalid", "mb-1");
    MessageNameInfo.classList.add("d-none");
    clearAlerts();
    return true;
  } else {
    inputName.classList.remove("is-valid", "mb-4");
    inputName.classList.add("is-invalid", "mb-1");
    MessageNameInfo.classList.remove("d-none");
    clearAlerts();
    return false;
  }
}

// validation email & check duplicate function function 
function validationEmail() {
  var regaxMail = /^\w{3,30}@(gmail|yahoo|mail)\.(com|net|io|info)$/;
  if (regaxMail.test(inputEmail.value)) {
    inputEmail.classList.add("is-valid", "mb-4");
    inputEmail.classList.remove("is-invalid", "mb-1");
    MessageEmailInfo.classList.add("d-none");
    if (users.length != 0) {
      for (var i = 0; i < users.length; i++) {
        if (users[i].email == inputEmail.value) {
          messageDuplicateEmail.classList.remove("d-none");
          inputEmail.classList.remove("is-valid", "mb-4");
          inputEmail.classList.add("is-invalid", "mb-1");
          return false;
        } else {
          clearAlerts();
          return true;
        }
      }
      return true;
    }
    return true;
  } else {
    inputEmail.classList.remove("is-valid", "mb-4");
    inputEmail.classList.add("is-invalid", "mb-1");
    MessageEmailInfo.classList.remove("d-none");
    clearAlerts();
    return false;
  }
}

// validation pass function
function validationPass() {
  var regaxMail = /^[(\w{1,}|@{0,}|#{0,}|\${0,}|&{0,}|\-{0,}){1,}]{3,}$/;
  if (regaxMail.test(inputPassword.value)) {
    inputPassword.classList.add("is-valid", "mb-4");
    inputPassword.classList.remove("is-invalid", "mb-1");
    MessagePassInfo.classList.add("d-none");
    clearAlerts();
    return true;
  } else {
    inputPassword.classList.remove("is-valid", "mb-4");
    inputPassword.classList.add("is-invalid", "mb-1");
    MessagePassInfo.classList.remove("d-none");
    clearAlerts();
    return false;
  }
}
