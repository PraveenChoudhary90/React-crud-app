import { useState } from "react";
import axios from "axios";

const Insert  = ()=>{
    const [input, setInput] = useState("");
    


    const handelInput = (e)=>{
        const name  =e.target.name;
        const value = e.target.value;
        setInput(values=>({...values, [name]:value}))
        console.log(input);

    }

    const HandelSubmit = async(e)=>{
        e.preventDefault();
        const api = "http://localhost:3000/student";
        const response = await axios.post(api, input);
        console.log(response);
        alert("data save")

    }
    return(
        <>
        <h1>Insert Page</h1>
        <from>
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
            <button type="submit" onClick={HandelSubmit} >Submit</button>
        </from>
        </>
    )
}


export default Insert;