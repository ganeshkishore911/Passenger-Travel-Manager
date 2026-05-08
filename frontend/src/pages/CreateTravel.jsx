import { useState } from "react";
import API from "../services/Api";
import Logger from "../services/Loggers";
import "../styles/CreateTravel.scss"
import * as Yup from "yup"

const travelSchema = Yup.object({
    name:Yup.string().required("Name is required").min(3,"Minimum 3 Characters"),
    source:Yup.string().required("Source is required"),
    destination:Yup.string().required("Destination is required"),
    travel_date:Yup.date().typeError("Travel date is required").required("travel date is required")

})

const CreateTravel = () => {
    const [form,setForm]=useState({
        name:"",
        source:"",
        destination:"",
        travel_date:""

    })
    const [errors,SetErrors]=useState({})
    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
            Logger.info("posting the data")
            await travelSchema.validate(form,{abortEarly:false})
        const res=await API.post("api/create/",form)
        Logger.info("Travel created",res.data)
        alert("Travel Created Successfully")
        setForm({name:"",source:"",destination:"",travel_date:""})
        SetErrors({})
        }catch(err){
            Logger.error("Failed to create travel",err)
            let new_errors={}
            err.inner.forEach((e)=>{
                    new_errors[e.path]=e.message
            })
            SetErrors(new_errors)
            // alert(err.message)
            console.log(err.inner)
        }
    }

  return (
    <div className="create-travel"><h1>CreateTravel</h1>
            <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} />
        <p className="error">{errors.name}</p>


        <input name="source" value={form.source} placeholder="Source" onChange={handleChange} />
        <p className="error">{errors.source}</p>
        <input name="destination" value={form.destination} placeholder="Destination" onChange={handleChange} />
        <p className="error">{errors.destination}</p>

        <input type="date" value={form.travel_date} name="travel_date" onChange={handleChange} />
<p className="error">{errors.travel_date}</p>


        <button type="submit">Submit</button>
            </form>
    </div>
  )
}
export default CreateTravel