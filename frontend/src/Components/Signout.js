import React from 'react'
import { useNavigate } from 'react-router-dom'

function Signout() {
    const navigate = useNavigate()
    localStorage.clear()
    navigate("/Signup")
  return (
    <div>Signout</div>
  )
}

export default Signout