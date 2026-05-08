import React from 'react'
import { Link } from 'react-router-dom'
import "../src/styles/Navbar.scss"

const Navbar = () => {
  
  return (
    <div className="navbar">
    <Link to="/create">Create travel</Link>
    <Link to="/">travel list</Link>
    </div>
  )
}

export default Navbar