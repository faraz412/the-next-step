const baseURL="http://localhost:7777/";

/*---------------------User/Admin switch functionality------------------*/

const logBtn1=document.querySelector(".default-a");
logBtn1.addEventListener("click",(e)=>{
    //console.log(e);
    e.target.classList.add("click_effect");
    e.path[1].children[1].classList.remove("click_effect");
    e.path[2].children[4].classList.add("form_hide");
    e.path[2].children[3].classList.remove("form_hide");    
})

const logBtn2=document.querySelector(".default-b");
logBtn2.addEventListener("click",(e)=>{
    //console.log(e);
    e.target.classList.add("click_effect");
    e.path[1].children[0].classList.remove("click_effect");
    e.path[2].children[3].classList.add("form_hide");
    e.path[2].children[4].classList.remove("form_hide");    
})


/*---------------------Form input functionality------------------*/
const userLogForm=document.querySelector(".user_login_form>form");
const adminLogForm=document.querySelector(".admin_login_form>form");

userLogForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    let payload={
        email:userLogForm.email.value,
        password:userLogForm.password.value
    };

    try{
        let res= await fetch(`${baseURL}user/login`,{
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        if(res.ok){
            let data=await res.json();
            console.log(data);
            localStorage.setItem("token",data.token);
            localStorage.setItem("name",data.userName);
            alert(data.msg);
            window.location.href="../index.html";
        }
    }catch(err){
        alert(err);
    }
})

adminLogForm.addEventListener("submit", async (e)=>{
    e.preventDefault();

    let payload={
        email:adminLogForm.email.value,
        password:adminLogForm.password.value,
    };

    try{
        let res= await fetch(`${baseURL}admin/login`,{
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body:JSON.stringify(payload)
        })
        if(res.ok){
            let data=await res.json();
            //console.log(data);
            localStorage.setItem("token",data.token);
            localStorage.setItem("admin",data.admin);
            alert(data.msg);
            window.location.href="dash.html";
        }
    }catch(err){
        aler(err);
    }
})




