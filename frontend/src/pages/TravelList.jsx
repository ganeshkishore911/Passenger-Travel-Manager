import React, { useEffect, useState } from 'react'
import API from '../services/Api'
import { useNavigate } from 'react-router-dom'

const TravelList = () => {
    const [data,setdata]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        fetchdata()
    },[])

    const fetchdata=async ()=>{
        try{
            const res=await API.get("api/travels/")
            setdata(res.data)
        }catch(err){
            console.error(err)
        }
    }

    // const handleUpdate=(e,id)=>{
    //     e.stopPropagation()
    //     try{
    //         await API.delete(`travelDelete/${id}/`)
    //     }catch(err){
    //         console.error(err)
    //     }
    // }
    const handleDelete=async (e,id)=>{
        e.stopPropagation();
        try{
            await API.delete(`api/travelDelete/${id}/`)
            fetchdata()
        }catch(err){
            console.error(err)
        }
    }
  return (
    <div>
        <h2>Passenger Travel List</h2>
        {data.length === 0 ? (
    <p>No travels found</p>
) : (
    data.map((item) => (
        <div key={item.id}
        onClick={()=>navigate(`/passenger/${item.passenger}`)}style={{ cursor: "pointer" }}>
            <h3>{item.passenger_name}</h3>
            <p>{item.source} to {item.destination} ({item.travel_date})</p>

            {/* <button onClick={(e)=> handleUpdate(e,item.id)}>Edit</button> */}
            <button onClick={(e)=>{
            e.stopPropagation();
                handleDelete(e,item.id)}}>Delete</button>
        </div>
    ))
)}
    </div>
  )
}
export default TravelList