let dashCont=document.querySelector(".dash_cont");
const baseURL="https://gold-lazy-newt.cyclic.app/";

getProducts();

function displayProducts(arr){
    dashCont.innerHTML="";
    arr.forEach((elem)=>{
        let tdiv=document.createElement("div");
        tdiv.setAttribute("class","tdiv");

        let t1=document.createElement("input");
        t1.setAttribute("readonly",true);
        t1.value="Avatar";
        let t2=document.createElement("input");
        t2.setAttribute("readonly",true);
        t2.value="Product ID";
        let t3=document.createElement("input");
        t3.setAttribute("readonly",true);
        t3.value="Product Title";
        let t4=document.createElement("input");
        t4.setAttribute("readonly",true);
        t4.value="Image URL";
        let t5=document.createElement("input");
        t5.setAttribute("readonly",true);
        t5.value="Category";
        let t6=document.createElement("input");
        t6.setAttribute("readonly",true);
        t6.value="Color";
        let t7=document.createElement("input");
        t7.setAttribute("readonly",true);
        t7.value="Price in Rs.";
        let t8=document.createElement("input");
        t8.setAttribute("readonly",true);
        t8.value="Exclusive";
        let t9=document.createElement("button");
        t9.innerText="EDIT";
        let t10=document.createElement("button");
        t10.innerText="DELETE";
        tdiv.append(t1,t2,t3,t4,t5,t6,t7,t8,t9,t10);


        let div=document.createElement("div");
        div.setAttribute("class","bdiv");

        let avt=document.createElement("img");
        avt.setAttribute("src",elem.avatar);

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
        price.value=elem.price.toFixed(2);

        let offer=document.createElement("input");
        offer.setAttribute("readonly",true);
        if(elem.offer==true){
            offer.value="Yes";
        }else{
            offer.value="No";
        }

        let edit=document.createElement("button");
        edit.innerText="EDIT";
        edit.addEventListener("click",(e)=>{
            //console.log(e);
            let a=e.path[1].children[2];
            let b=e.path[1].children[3];
            let c=e.path[1].children[4];
            let d=e.path[1].children[5];
            let f=e.path[1].children[6];
            let g=e.path[1].children[7];
            if(g.value.toLowerCase()=="yes"){
                off=true;
            }else{
                off=false;
            }
            if(edit.innerText=="EDIT"){
                e.path[1].style.backgroundColor="lightcyan";
                edit.innerText="SUBMIT";
                a.removeAttribute("readonly");
                b.removeAttribute("readonly");
                c.removeAttribute("readonly");
                d.removeAttribute("readonly");
                f.removeAttribute("readonly");
                g.removeAttribute("readonly");
            }else{
                e.path[1].style.backgroundColor="white";
                edit.innerText="EDIT";
                a.setAttribute("readonly",true);
                b.setAttribute("readonly",true);
                c.setAttribute("readonly",true);
                d.setAttribute("readonly",true);
                f.setAttribute("readonly",true);
                g.setAttribute("readonly",true);
                updateProduct(elem._id,a.value,b.value,c.value,d.value,f.value,off);
            }
        })

        let del=document.createElement("button");
        del.innerText="DELETE";
        del.addEventListener("click",(e)=>{
            deleteProduct(elem._id);
        })

        div.append(avt,pID,title,avatar,category,color,price,offer,edit,del);
        dashCont.append(tdiv,div);
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

// ----------------------- POST NEW PRODUCT-----------------------//
let dashForm=document.querySelector(".dash_form");
dashForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    createMens();
})

async function createMens(){
    let payload={
        title:dashForm.title.value,
        avatar:dashForm.avatar.value,
        category:dashForm.category.value,
        color:dashForm.color.value,
        price:dashForm.price.value,
        offer:dashForm.offer.value
    };

    try{
        let res=await fetch(`${baseURL}mens/create`,{
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        });
        if(res.ok){
            let data=await res.json();
            alert(data.msg);
            getProducts();
        }
    }catch(err){
        console.log(err);
    }
}


// ----------------------- UPDATE EXISTING PRODUCT-----------------------//

async function updateProduct(id,title,imgURL,cat,col,price,off){
    let payload={
        title:title,
        avatar:imgURL,
        category:cat,
        color:col,
        price:price,
        offer:off
    };
    try{
        let res=await fetch(`${baseURL}mens/update/${id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            },
            body: JSON.stringify(payload)
        });
        if(res.ok){
            let data=await res.json();
            alert(data.msg);
            getProducts();
        }
    }catch(err){
        console.log(err);
    }
}

// ----------------------- DELETE EXISTING PRODUCT-----------------------//

async function deleteProduct(id){
    try{
        let res=await fetch(`${baseURL}mens/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-type":"application/json",
                "Authorization":`${localStorage.getItem("token")}`
            }
        });
        if(res.ok){
            let data=await res.json();
            alert(data.msg);
            getProducts();
        }
    }catch(err){
        console.log(err);
    }
}

// ----------------------- SEARCH EXISTING PRODUCT-----------------------//

let dSearch=document.querySelector(".d-search>input");

dSearch.addEventListener("input", async(e)=>{
    let searchVal=dSearch.value;
    try{
        let res=await fetch(`${baseURL}mens/search?q=${searchVal}`);
        if(res.ok){
            let data=await res.json();
            displayProducts(data);
        }
    }catch(err){
        console.log(err);
    }
})