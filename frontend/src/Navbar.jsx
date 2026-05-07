import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  
  return (
    <div style={{
      width:"100%",display:"flex",gap:"20px", padding:"30px",justifyContent:"center" 
    }}>
    <Link to="/create">Create travel</Link>
    <Link to="/">     travel list</Link>
    </div>
  )
}

export default Navbar