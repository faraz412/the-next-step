const baseURL="https://gold-lazy-newt.cyclic.app/";

/*---------------------User/Admin switch functionality------------------*/

const optBtn1=document.querySelector(".default-a");
optBtn1.addEventListener("click",(e)=>{
    //console.log(e);
    e.target.classList.add("click_effect");
    e.path[1].children[1].classList.remove("click_effect");
    e.path[2].children[4].classList.add("form_hide");
    e.path[2].children[3].classList.remove("form_hide");    
})

const optBtn2=document.querySelector(".default-b");
optBtn2.addEventListener("click",(e)=>{
    //console.log(e);
    e.target.classList.add("click_effect");
    e.path[1].children[0].classList.remove("click_effect");
    e.path[2].children[3].classList.add("form_hide");
    e.path[2].children[4].classList.remove("form_hide");    
})


/*---------------------Form input functionality------------------*/
const userRegForm=document.querySelector(".user_reg_form>form");
const adminRegForm=document.querySelector(".admin_reg_form>form");

userRegForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    let payload={
        name:userRegForm.name.value,
        email:userRegForm.email.value,
        password:userRegForm.password.value
    };

    try{
        let res= await fetch(`${baseURL}user/register`,{
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        if(res.ok){
            let data=await res.json();
            alert(data.msg);
            window.location.href="login.html";
        }
    }catch(err){
        alert(err);
    }
})

adminRegForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    let payload={
        name:adminRegForm.name.value,
        email:adminRegForm.email.value,
        password:adminRegForm.password.value,
        verification:adminRegForm.verification.value
    };

    try{
        let res= await fetch(`${baseURL}admin/register`,{
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        if(res.ok){
            let data=await res.json();
            alert(data.msg);
            window.location.href="login.html";
        }
    }catch(err){
        aler(err);
    }
})




