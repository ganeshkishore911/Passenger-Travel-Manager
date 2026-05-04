import React, { useEffect, useState } from 'react'
import API from '../services/Api'
import { useParams } from 'react-router-dom'

const PassengerDetail = () => {
    const {id}=useParams()
    const [data,setData]=useState(null)

    useEffect(()=>{
        fetchData()
    },[])
   const fetchData=async()=>{
    try{
        const res=await API.get(`api/passenger/${id}/`)
        console.log(res.data)
        setData(res.data);
    }catch(err){
        console.error(err)
    }
   }
   if (!data) return <p>Loading...</p>;
  return (
    <div><h1>PassengerDetail</h1>
    
    <h2>{data.name}</h2>
    <h4>Travel History</h4>
    {data.Travel.map((t,index)=>(
        <div key={index}> 
        <p>{t.source}  to {t.destination}   ({t.travel_date})</p></div>
    ))}
    </div>
  )
}

export default PassengerDetail