let dashCont=document.querySelector(".dash_cont");
const baseURL="http://localhost:7777/";

getProducts();

function displayProducts(arr){
    dashCont.innerHTML="";
    arr.forEach((elem)=>{
        let div=document.createElement("div");

        let pID=document.createElement("input");
        pID.setAttribute("readonly",true);
        pID.value=elem._id;

        let title=document.createElement("input");
        title.setAttribute("readonly",true);
        title.value=elem.title;

        let avatar=document.createElement("input");
        avatar.setAttribute("readonly",true);
        avatar.value=elem.avatar;

        let category=document.createElement("input");
        category.setAttribute("readonly",true);
        category.value=elem.category;

        let color=document.createElement("input");
        color.setAttribute("readonly",true);
        color.value=elem.color;

        let price=document.createElement("input");
        price.setAttribute("readonly",true);
        price.value=elem.price;

        let offer=document.createElement("input");
        offer.setAttribute("readonly",true);
        if(elem.offer==true){
            offer.value="Yes";
        }else{
            offer.value="No";
        }

        let edit=document.createElement("button");
        edit.innerText="EDIT";

        let del=document.createElement("button");
        del.innerText="DELETE";

        div.append(pID,title,avatar,category,color,price,offer,edit,del);
        dashCont.append(div);
    })
}

async function getProducts(){
    try{
        let res=await fetch(`${baseURL}mens/`);
        if(res.ok){
            let data=await res.json();
            displayProducts(data);
        }
    }catch(err){
        console.log(err);
    }
}