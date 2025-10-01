function insertdata()
{
    let add =
    {
        name:document.querySelector("#name").value,
        age:document.querySelector("#age").value,
        address:document.querySelector("#address").value,
    }
    
    fetch("http://localhost:3000/students",{
        metdod:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(add)

    })
    .tden(ress=>window.alert("addon data is sucessfully insert"));
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
            <td>${key.age}</td>
            <td>${key.address}</td>
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
<input type="text" value="${redata.age}" id="age1"> <br>
<input type="text" value="${redata.address}" id="address1"> <br>
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