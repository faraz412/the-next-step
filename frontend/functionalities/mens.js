const baseURL="http://localhost:7777/";

let mensCont=document.querySelector(".m-item-cont");

getMensData();

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

        let minus=document.createElement("button");
        minus.innerText="-";
        minus.addEventListener("click",(e)=>{
            if(+size.innerText>=7 && +size.innerText<=13){
                +size.innerText--;
            }
        })

        let size=document.createElement("span");
        size.innerText="7";

        let plus=document.createElement("button");
        plus.innerText="+";
        plus.addEventListener("click",(e)=>{
            if(+size.innerText>=7 && +size.innerText<=13){
                +size.innerText++;
            }
        })

        let sizediv=document.createElement("div");
        sizediv.append(minus,size,plus);
        
        let title=document.createElement("p");
        title.innerText=elem.title;

        let category=document.createElement("p");
        category.innerText=elem.category;

        let color=document.createElement("p");
        color.innerText=elem.color;

        let exc=document.createElement("div");
        exc.innerText="EXCLUSIVE";
        if(!elem.offer){
            exc.style.color="white";
        }

        let rs=document.createElement("p");
        rs.innerText="Rs. ";
        let price=document.createElement("span");
        price.innerText=elem.price;
        rs.append(price);

        let leftdiv=document.createElement("div");
        leftdiv.setAttribute("class","shoe-left");
        leftdiv.append(sizediv,title,category);

        let rightdiv=document.createElement("div");
        rightdiv.setAttribute("class","shoe-right");
        rightdiv.append(color,exc,rs);

        let fulldiv=document.createElement("div");
        fulldiv.setAttribute("class","shoe-full");
        fulldiv.append(leftdiv,rightdiv);

        div.append(imgdiv,fulldiv);

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
        alert(err);
    }
}