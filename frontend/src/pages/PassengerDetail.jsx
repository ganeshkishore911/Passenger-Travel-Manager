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
    <table  border={1}
    style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
            <tr>
                <th>source</th>
                <th>destination</th>
                <th>travel_date</th>
        </tr>
        </thead>
        <tbody>
    {data.Travel.map((t,index)=>(
       <tr key={index}> 
       <td>{t.source}</td>   <td>{t.destination}</td>   <td>({t.travel_date})</td></tr>
    ))}</tbody></table>
    </div>
  )
}

export default PassengerDetail