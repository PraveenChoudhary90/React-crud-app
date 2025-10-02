const Insertdata =async ()=>{
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const number= document.querySelector("#number").value;
    const pass = document.querySelector("#pass").value;
    const cpass = document.querySelector("#cpass").value;
    console.log(name, email,number, pass, cpass);


if (!name || !email || !number || !pass || !cpass) {
        alert("Please fill all fields.");
        return;
    }


     if(name === ""){
    alert("Please Enter your name");
    return false;
   }
   if(email === ""){
  alert("Please Enter your email");
    return false;
   }
   else if(!(email.includes('@') && (email.includes('.com')))){
  alert("please enter your valid email with @");
  return false;
    
   }
  
   else if(number.length !== 10){
    alert("enter mobile number shoud be in 10 digit");
    return false;
   }
   else if(isNaN(number)){
   alert("enter mobile number shoud be in 10 digit only integer");
    return false;

   }
   
   if(pass === ""){
    alert("Please Enter your password");
    return false;
   }
   if(!
    (
     pass.match(/[1234567890]/)
     && 
     pass.match(/[qwertyuipasdfghjklzxcvbnmo]/) 
     && 
    pass.match(/[QWERTYUIOPASDFGHJKLZXCVBNM]/)
     && 
     pass.match(/[!@#$%^&*(){}|?><]/)
    )
) {
    alert("Please contain  ateast 1 lower case , upper case and storng pasword");
    return false;

   }
   if(pass !== cpass){
    window.alert("Password and confirm password not match");
    return false;


   }
   if(cpass === ""){
    alert("Please Enter your Re -Enter password");
    return false;
   }



   const add = {
        name,
        email,
        number,
        pass: cpass // use one field; no need to save confirm password
    };

     const response = await fetch("http://localhost:3000/students", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(add)
        }).then(res=>alert("data save"))
    console.log(add);
     
}



const loadData = async()=>{
    const res =await fetch("http://localhost:3000/students");
    const response  = await res.json();
    console.log(response);

    const ans  = response.map((key)=>`
        <tr>
           
            <td>${key.id}</td>
            <td>${key.name}</td>
            <td>${key.email}</td>
            <td>${key.number}</td>
            <td><button onclick ="deletedata('${key.id}');" >delete</button></td>
            <td><button onclick ="updatedata('${key.id}');" >update</button></td>
        </tr>
    `).join("")
    document.querySelector("#showdata").innerHTML= ans;
}

loadData();


function deletedata(id){
    fetch(`http://localhost:3000/students/${id}`,{
        method:'DELETE'
    }).then(()=>{
        alert("data delete");
    })
}

async function updatedata(id){
     let upmydata = await fetch(`http://localhost:3000/students/${id}`);
    let redata = await upmydata.json();
    let senddata = `
<input type="text" value="${redata.id}" id="id1" readonly> <br>
<input type="text" value="${redata.name}" id="name1"> <br>
<input type="text" value="${redata.email}" id="age1"> <br>
<input type="text" value="${redata.number}" id="address1"> <br>
<input type="submit" onclick= "finalupdate('${redata.id}')">
`
document.querySelector("#edittable").innerHTML = senddata;
}



function finalupdate(id){
    let fdata = {
        name:document.querySelector("#name1").value,
        age:document.querySelector("#age1").value,
        address:document.querySelector("#address1").value,
    }
    fetch(`http://localhost:3000/students/${id}`,{
        method:'PUT',
       headers:{'content-type':'application/json'
       },
       body:JSON.stringify(fdata)
    })
    .then(res=>window.alert("update....!!!!!!"))
}