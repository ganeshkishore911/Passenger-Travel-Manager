import React, { useEffect, useState } from 'react'
import API from '../services/Api'
import { useParams } from 'react-router-dom'
import {useReactTable,getCoreRowModel,flexRender} from "@tanstack/react-table"

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
   const columns=[
 {header:"Source",accessorKey:"source"},
 {header:"Destination",accessorKey:"destination"},
 {header:"Travel Date",accessorKey:"travel_date"},
]
const table=useReactTable({
 data: data?.Travel || [],
 columns,
 getCoreRowModel:getCoreRowModel()
})

   
  return (
    <div><h1>PassengerDetail</h1>
    
    <h2>{data.name}</h2>
    <h4>Travel History</h4>
    <table  border={1}
    style={{ borderCollapse: "collapse", width: "100%" }}>
        {/* <thead>
            <tr>
                <th>source</th>
                <th>destination</th>
                <th>travel_date</th>
        </tr>
        </thead> */}
        <thead>
            {table.getHeaderGroups().map((headerGroup)=>(
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header)=>(
                        <th key={header.id}>
                            {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                            )}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>

        {/* <tbody>
    {data.Travel.map((t,index)=>(
       <tr key={index}> 
       <td>{t.source}</td>   <td>{t.destination}</td>   <td>({t.travel_date})</td></tr>
    ))}</tbody>*/}

    <tbody>
  {table.getRowModel().rows.map((row) => (
    <tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {/* {cell.getValue()} */}
           {flexRender(
    cell.column.columnDef.cell,
    cell.getContext()
  )}
        </td>
      ))}
    </tr>
  ))}
</tbody>
    </table> 
    </div>
  )
}

export default PassengerDetail