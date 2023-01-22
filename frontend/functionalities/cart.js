const baseURL="https://gold-lazy-newt.cyclic.app/";

let subtotal=document.querySelectorAll(".total");
let checkout=document.querySelector("#checkout");
let cart_empty = document.querySelector(".cart-empty");
let cart_data=document.querySelector(".cart_data");

getCartdata();

function displayCart(data) {
    document.querySelector(".cartcont").innerHTML = "";
    data.forEach((elem, index) => {
        let maindiv = document.createElement("div");
        let leftdiv = document.createElement("div");
        let rightdiv = document.createElement("div");

        let pic = document.createElement("img");
        pic.setAttribute("src", elem.avatar);
        let title = document.createElement("h3")
        title.innerText = elem.title;
        let color = document.createElement("p");
        color.innerText = "Color: " + elem.color;
        let category = document.createElement("p");
        category.innerText = "Category: " + elem.category;
        let size=document.createElement("p");
        size.innerText = "Size: " + elem.size;
        let price = document.createElement("h3");
        price.innerText = "Rs: " + elem.price.toFixed(2);

        let calcdiv = document.createElement("div");

        let qty = document.createElement("span");
        qty.setAttribute("class", "qty");
        qty.innerText = elem.qty;

        let plus = document.createElement("button");
        plus.innerText = "+";
        plus.addEventListener("click", function () {
            qty.innerText++;
            updateQty(elem._id,qty.innerText);
        })

        let minus = document.createElement("button");
        minus.innerText = " - ";
        minus.addEventListener("click", function () {
            if (qty.innerText > 1) {
                qty.innerText--;
            }
            updateQty(elem._id,qty.innerText);
        })

        let del = document.createElement("button");
        del.innerText = "REMOVE";
        del.addEventListener("click", function () {
            deleteItem(elem._id);
        })

        calcdiv.append(minus, qty, plus);
        rightdiv.append(title, category, color,size, price, calcdiv, del);
        leftdiv.append(pic);
        maindiv.append(leftdiv, rightdiv)
        document.querySelector(".cartcont").append(maindiv);
    })
}

async function getCartdata(){
    try{
        let res=await fetch(`${baseURL}cart/`, {
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            }
        })
        if(res.ok){
            let data=await res.json();
            displayCart(data);
            totalCost(data);
            if (data.length != 0) {
                cart_empty.classList.add("hide-div");
                cart_data.classList.remove("hide-div");
            } else {
                cart_empty.classList.remove("hide-div");
                cart_data.classList.add("hide-div");
            }
        }
    }catch(err){
        console.log(err);
    }
}

async function updateQty(id,qty){
    let payload={
        qty:qty
    }
    try{
        let res=await fetch(`${baseURL}cart/update/${id}`, {
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            },
            body:JSON.stringify(payload)
        })
        if(res.ok){
            let data=await res.json();
            console.log(data);
            getCartdata();
        }
    }catch(err){
        console.log(err);
    }
}

async function deleteItem(id){
    try{
        let res=await fetch(`${baseURL}cart/delete/${id}`, {
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            }
        })
        if(res.ok){
            let data=await res.json();
            console.log(data);
            getCartdata();
        }
    }catch(err){
        console.log(err);
    }
}

checkout.addEventListener("click",(e)=>{
    emptyCart();
})

async function emptyCart(){
    try{
        let res=await fetch(`${baseURL}cart/delete/all`, {
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            }
        })
        if(res.ok){
            let data=await res.json();
            alert(data.msg1);
            window.location.href="order.html";
        }
    }catch(err){
        console.log(err);
    }
}

function totalCost(arr) {
    let qty = document.querySelectorAll(".qty");
    let sum = 0;
    for (let i = 0; i <= qty.length - 1; i++) {
        if (arr.length == 0) {
            sum = 0;
        } else {
            sum = sum + (Number(qty[i].innerText) * arr[i].price);
        }
    }

    for(let total of subtotal){
        total.innerText=sum;
    }
}