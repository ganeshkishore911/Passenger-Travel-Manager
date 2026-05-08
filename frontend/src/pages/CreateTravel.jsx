import { useState } from "react";
import API from "../services/Api";
import Logger from "../services/Loggers";
import "../styles/CreateTravel.scss"
import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

const travelSchema = Yup.object({
    name:Yup.string().required("Name is required").min(3,"Minimum 3 Characters"),
    source:Yup.string().required("Source is required"),
    destination:Yup.string().required("Destination is required"),
    travel_date:Yup.string().required("travel date is required")

})

const CreateTravel = () => {
    // const [form,setForm]=useState({
    //     name:"",
    //     source:"",
    //     destination:"",
    //     travel_date:""

    // })
    // const [errors,SetErrors]=useState({})
    // const handleChange=(e)=>{
    //     setForm({
    //         ...form,
    //         [e.target.name]:e.target.value
    //     })
    // }


    // const handleSubmit=async (e)=>{
    //     e.preventDefault()
    //     try{
    //         Logger.info("posting the data")
    //         await travelSchema.validate(form,{abortEarly:false})
    //     const res=await API.post("api/create/",form)
    //     Logger.info("Travel created",res.data)
    //     alert("Travel Created Successfully")
    //     setForm({name:"",source:"",destination:"",travel_date:""})
    //     SetErrors({})
    //     }catch(err){
    //         Logger.error("Failed to create travel",err)
    //         let new_errors={}
    //         err.inner.forEach((e)=>{
    //                 new_errors[e.path]=e.message
    //         })
    //         SetErrors(new_errors)
    //         // alert(err.message)
    //         console.log(err.inner)
    //     }
    // }


        const{register,handleSubmit,reset,formState:{errors}}=useForm({resolver:yupResolver(travelSchema)})
        const onSubmit=async (data)=>{
            console.log(data)
                try{
                    Logger.info("posting the data")
                    const res=await API.post("api/create/",data)
                    Logger.info("Travel created",res.data)
                    alert("Travel Created Successfully")
                    reset()
                }catch(err){
                        Logger.error("Failed to create travel",err)
                }
        }

        


  return (
    <div className="create-travel"><h1>CreateTravel</h1>
            {/* <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} />
        <p className="error">{errors.name}</p>

        <input name="source" value={form.source} placeholder="Source" onChange={handleChange} />
        <p className="error">{errors.source}</p>
        <input name="destination" value={form.destination} placeholder="Destination" onChange={handleChange} />
        <p className="error">{errors.destination}</p>

        <input type="date" value={form.travel_date} name="travel_date" onChange={handleChange} />
<p className="error">{errors.travel_date}</p>

        <button type="submit">Submit</button>
            </form> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input  {...register("name")} placeholder="Name"/> <p className="error">{errors.name?.message}</p>
                <input   {...register("source")} placeholder="Source"/><p className="error">{errors.source?.message}</p>
                <input   {...register("destination")} placeholder="Destination"/><p className="error">{errors.destination?.message}</p>
                <input type="date"  {...register("travel_date")} placeholder="Travel date"/><p className="error">{errors.travel_date?.message}</p>
                <button type="submit">Submit</button>
            </form>
    </div>
  )
}
export default CreateTravel