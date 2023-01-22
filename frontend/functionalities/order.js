const baseURL="http://localhost:7777/";

let order_empty = document.querySelector(".order-empty");
let order_data=document.querySelector(".order_data");
let order_cont=document.querySelector(".ordercont");

getOrderdata();

function displayOrder(data) {
    document.querySelector(".ordercont").innerHTML = "";
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
        let qty = document.createElement("p");
        qty.innerText = "Qty: " + elem.qty;

        rightdiv.append(title, category, color,size, price, qty);
        leftdiv.append(pic);
        maindiv.append(leftdiv, rightdiv)
        document.querySelector(".ordercont").append(maindiv);
    })
}

async function getOrderdata(){
    try{
        let res=await fetch(`${baseURL}order/`, {
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            }
        });
        if(res.ok){
            let data=await res.json();
            displayOrder(data);
            if (data.length != 0) {
                order_empty.classList.add("hide-div");
                order_data.classList.remove("hide-div");
            } else {
                order_empty.classList.remove("hide-div");
                order_data.classList.add("hide-div");
            }
        }
    }catch(err){
        console.log(err);
    }
}

let oSearch=document.querySelector(".o-search>input");

oSearch.addEventListener("input", async(e)=>{
    let searchVal=oSearch.value;
    try{
        let res=await fetch(`${baseURL}order/search?q=${searchVal}`, {
            method:"GET",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            }
        });
        if(res.ok){
            let data=await res.json();
            displayOrder(data);
            if (data.length != 0) {
                order_empty.classList.add("hide-div");
                order_data.classList.remove("hide-div");
            } else {
                order_empty.classList.remove("hide-div");
                order_data.classList.add("hide-div");
            }
        }
    }catch(err){
        console.log(err);
    }
})
