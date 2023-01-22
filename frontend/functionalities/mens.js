const baseURL="https://gold-lazy-newt.cyclic.app/";

let mensCont=document.querySelector(".m-item-cont");

window.addEventListener("load",(e)=>{
    getMensData();
})

function displayItems(arr){
    mensCont.innerHTML="";
    arr.forEach((elem)=>{
        let div=document.createElement("div");
        div.setAttribute("class","single-shoe");

        let imgdiv=document.createElement("div");
        imgdiv.setAttribute("class","shoe-img");

        let img=document.createElement("img");
        img.src=elem.avatar;

        imgdiv.append(img);

        let sizeSelect=document.createElement("p");
        sizeSelect.innerText="Select Size:";

        let minus=document.createElement("button");
        minus.innerText=" - ";
        minus.addEventListener("click",(e)=>{
            if(+size.innerText>7 && +size.innerText<=13){
                +size.innerText--;
            }
        })

        let size=document.createElement("span");
        size.innerText="7";

        let plus=document.createElement("button");
        plus.innerText="+";
        plus.addEventListener("click",(e)=>{
            if(+size.innerText>=7 && +size.innerText<13){
                +size.innerText++;
            }
        })

        let sizediv=document.createElement("div");
        sizediv.setAttribute("class","shoe-size");
        sizediv.append(sizeSelect,minus,size,plus);
        
        let title=document.createElement("h4");
        title.innerText=elem.title;

        let category=document.createElement("p");
        category.innerText=elem.category;

        let color=document.createElement("p");
        color.innerText=elem.color;

        let exc=document.createElement("div");
        exc.setAttribute("class","shoe-exc");
        exc.innerText="EXCLUSIVE";
        if(!elem.offer){
            exc.style.color="white";
            exc.style.backgroundColor="white";
        }

        let rs=document.createElement("p");
        rs.innerText="Rs. ";
        let price=document.createElement("span");
        price.innerText=elem.price.toFixed(2);
        rs.append(price);

        let leftdiv=document.createElement("div");
        leftdiv.setAttribute("class","shoe-left");
        leftdiv.append(title,category,color);

        let rightdiv=document.createElement("div");
        rightdiv.setAttribute("class","shoe-right");
        rightdiv.append(exc,rs);

        let fulldiv=document.createElement("div");
        fulldiv.setAttribute("class","shoe-full");
        fulldiv.append(leftdiv,rightdiv);

        let cartdiv=document.createElement("div");
        cartdiv.innerText="ADD TO CART";
        cartdiv.setAttribute("class","shoe-cart");
        cartdiv.addEventListener("click",(e)=>{
            if(!localStorage.getItem("token")){
                alert("Please Login");
                window,location.href="login.html";
            }else{
                addCart(elem._id,elem.title,elem.avatar,elem.price,elem.category,elem.color,1,size.innerText);
            }
        })

        div.append(imgdiv,fulldiv,sizediv,cartdiv);

        mensCont.append(div);
    })
}

async function getMensData(){
    try{
        let res=await fetch(`${baseURL}mens/`);
        if(res.ok){
            let data=await res.json();
            displayItems(data);
        }
    }catch(err){
        console.log(err);
    }
}

async function addCart(productID,title,avatar,price,category,color,qty,size){
    let payload={
        productID,title,avatar,price,category,color,qty,size
    }
    try{
        let res= await fetch(`${baseURL}cart/create`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            },
            body:JSON.stringify(payload)
        })
        if(res.ok){
            let data=await res.json();
            alert(data.msg);
        }
    }catch(err){
        console.log(err);
    }
}

// ------------------ FILTER FUNCTIONALITY -----------------------//

let mensCat=document.querySelector(".m-category");
let mensCol=document.querySelector(".m-color");
let mensExc=document.querySelector(".m-exc");
let mensClr=document.querySelector(".m-clr");


mensCat.addEventListener("change",async (e)=>{
    let catValue=mensCat.value;
    let colValue=mensCol.value;
    try{
        let res=await fetch(`${baseURL}mens/filter?category=${catValue}&color=${colValue}`);
        if(res.ok){
            let data=await res.json();
            displayItems(data);
        }
    }catch(err){
        console.log(err);
    }
})

mensCol.addEventListener("change",async (e)=>{
    let catValue=mensCat.value;
    let colValue=mensCol.value;
    try{
        let res=await fetch(`${baseURL}mens/filter?category=${catValue}&color=${colValue}`);
        if(res.ok){
            let data=await res.json();
            displayItems(data);
        }
    }catch(err){
        console.log(err);
    }
})

mensExc.addEventListener("click",async (e)=>{
    try{
        let res=await fetch(`${baseURL}mens/exc`);
        if(res.ok){
            let data=await res.json();
            displayItems(data);
        }
    }catch(err){
        console.log(err);
    }
})

mensClr.addEventListener("click",(e)=>{
    mensCat.value="";
    mensCol.value="";
    getMensData();
})

// ------------------ SEARCH & SORT FUNCTIONALITY -----------------------//

let mSearch=document.querySelector(".m-search>input");
let mSort=document.querySelector(".m-sort>select");

mSearch.addEventListener("input", async(e)=>{
    let searchVal=mSearch.value;
    try{
        let res=await fetch(`${baseURL}mens/search?q=${searchVal}`);
        if(res.ok){
            let data=await res.json();
            displayItems(data);
        }
    }catch(err){
        console.log(err);
    }
})

mSort.addEventListener("change", async(e)=>{
    let sortVal=mSort.value;
    try{
        let res=await fetch(`${baseURL}mens/sort?sort=${sortVal}`);
        if(res.ok){
            let data=await res.json();
            displayItems(data);
        }
    }catch(err){
        console.log(err);
    }
})