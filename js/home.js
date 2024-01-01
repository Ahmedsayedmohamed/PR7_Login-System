
// Get User name from session storage 
var user = sessionStorage.getItem("userName");     
document.getElementById("userMessage").innerHTML = `Welcome, ${user}`;


// clear session storage when logout
var logOut = document.getElementById("logOut")
logOut.addEventListener("click" , function(){
    sessionStorage.removeItem("userName")
})
