import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Spinner() {
    const [count,setCount] = useState(5)
    const navigate=useNavigate()
    const location=useLocation()
    useEffect(()=>{
        const interval=setInterval(()=>{
            setCount((prevValue)=>--prevValue)
        },1000)
        count===0 && navigate('/Signin',{
            state:location.pathname
        })
        return ()=>{
            clearInterval(interval)
        }
    },[count,navigate,location])
  return (
    <div>
      <div class="d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>
        <h1 className="text-center">Redirecting to you in {count} second</h1>
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}

export default Spinner;
