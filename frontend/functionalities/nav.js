let nameSpan=document.querySelector("#userName");
let statusSpan=document.querySelector("#status");
let navLogin=document.querySelector(".nav_login");

let userName=localStorage.getItem("name");

if(userName){
    nameSpan.innerText=userName;
    statusSpan.innerText="LOG OUT";
}

navLogin.addEventListener("click",(e)=>{
    if(statusSpan.innerText=="Register"){
        navLogin.setAttribute("href","login.html");
    }else{
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navLogin.setAttribute("href","../index.html");
    }
})




