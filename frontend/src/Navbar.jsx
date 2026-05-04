import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
    <Link to="/create">Create travel</Link>
    <Link to="/">     travel list</Link>
    </div>
  )
}

export default Navbar