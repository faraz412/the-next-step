let nameSpan=document.querySelector("#userName");
let statusSpan=document.querySelector("#status");
let navLogin=document.querySelector(".nav_login");
let navReg=document.querySelector(".nav_reg");
let navCart=document.querySelector(".nav_cart");

let userName=localStorage.getItem("name");

if(userName){
    nameSpan.innerText=userName;
    statusSpan.innerText="Log Out";
    navCart.setAttribute("href","cart.html");
}else{
    navCart.setAttribute("href","login.html");
}

navLogin.addEventListener("click",(e)=>{
    if(nameSpan.innerText=="Login"){
        navLogin.setAttribute("href","login.html");
    }else{
        navLogin.setAttribute("href","order.html");
    }
})


navReg.addEventListener("click",(e)=>{
    if(statusSpan.innerText=="Register"){
        navReg.setAttribute("href","register.html");
    }else{
        alert("YOU HAVE BEEN SUCCESSFULLY LOGGED OUT");
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        navReg.setAttribute("href","../index.html");
    }
})




