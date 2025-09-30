import axios from "axios";
import { useEffect, useState } from "react";


const Home = ()=>{
    const [mydata, setMydata] = useState([]);
    const [input, setInput] = useState({});


    
    const handelInput = (e)=>{
        const name  =e.target.name;
        const value = e.target.value;
        setInput(values=>({...values, [name]:value}))
        console.log(input);

    }

    
    const LoadData =async ()=>{
        const api = "http://localhost:3000/student";
        const response  =await axios.get(api)
        console.log(response.data);
        setMydata(response.data);
    }


    useEffect(()=>{
        LoadData();
    },[])



const Delete = async (id) => {
    const api = `http://localhost:3000/student/${id}`;
    try {
        await axios.delete(api);
        alert("Data deleted successfully");
        LoadData(); // Refresh the list after deletion
    } catch (error) {
        console.error("Error deleting data:", error);
    }
};

const Update = async(id)=>{
        const api = `http://localhost:3000/student/${id}`;
        const response =await axios.get(api)
    console.log(response.data);
    setInput(response.data)
}


const HandelUpdateSubmit = async(e)=>{
        e.preventDefault();
        const api = "http://localhost:3000/student";
        const response = await axios.put(`${api}/${input.id}`, input);
        console.log(response);
        alert("update data save")
        LoadData();

    }



    let count = 0;
    const ans = mydata.map((key)=>{
        count++
        return(
            <>
            <tr>
                <td>{count}</td>
                <td>{key.name}</td>
                <td>{key.email}</td>
                <td>{key.city}</td>
                <td>{key.number}</td>
                <td>
                    <button onClick={()=>{Delete(key.id)}}>Delete</button></td>
                <td>
                    <button onClick={()=>{Update(key.id)}} >Update</button></td>
            </tr>
            </>
        )
    })
    return(
        <>
        <h1>Home page</h1>
        <table  border="1px" align="center" width="800px" bgcolor="lightpink" >
            <thead> 
                <th>Count</th>
                <th>Name</th>
                <th>Email</th>
                <th>City</th>
                <th>Number</th>
                <th>Delete</th>
                <th>Update</th>
            </thead>
            <tbody>
                {ans}
            </tbody>
        </table>



<h1>Update Page</h1>

<form>
            <label htmlFor="">My Name</label>
            <input type="text" name="name" value={input.name} onChange={handelInput} />
            <br></br>
            <br></br>
            <label htmlFor="">My Email</label>
            <input type="text" name="email" value={input.email} onChange={handelInput}  />
            <br></br>
            <br></br>
            <label htmlFor="">My City</label>
            <input type="text" name="city" value={input.city} onChange={handelInput}  />
            <br></br>
            <br></br>
            <label htmlFor="">My Number</label>
            <input type="text" name="number" value={input.number} onChange={handelInput}  />
            <br></br>
            <br></br>
            <button type="submit" onClick={HandelUpdateSubmit} >Submit</button>
        </form>

        </>
    )
}

export default Home;