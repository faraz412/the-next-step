let nameSpan=document.querySelector("#userName");
let statusSpan=document.querySelector("#status");
let navLogin=document.querySelector(".nav_login");
let navCart=document.querySelector(".nav_cart");

let userName=localStorage.getItem("name");

if(userName){
    nameSpan.innerText=userName;
    statusSpan.innerText="LOG OUT";
    navCart.setAttribute("href","cart.html");
}else{
    navCart.setAttribute("href","login.html");
}

navLogin.addEventListener("click",(e)=>{
    if(statusSpan.innerText=="Register"){
        navLogin.setAttribute("href","login.html");
    }else{
        alert("YOU HAVE BEEN SUCCESSFULLY LOGGED OUT");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navLogin.setAttribute("href","../index.html");
    }
})




