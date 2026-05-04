import { useState } from "react";
import API from "../services/Api";


const CreateTravel = () => {
    const [form,setForm]=useState({
        name:"",
        source:"",
        destination:"",
        travel_date:""

    })
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
        const res=await API.post("api/create/",form)
        console.log(res.data)
        alert("Travel Created Successfully")
        }catch(err){
            console.error(err)
            alert("error")
        }
    }

  return (
    <div><h1>CreateTravel</h1>
            <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="source" placeholder="Source" onChange={handleChange} />
        <input name="destination" placeholder="Destination" onChange={handleChange} />
        <input type="date" name="travel_date" onChange={handleChange} />

        <button type="submit">Submit</button>
            </form>
    </div>
  )
}
export default CreateTravel