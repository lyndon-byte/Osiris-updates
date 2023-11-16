import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"




function CheckingPermission (){

    const navigate = useNavigate();

    const [seconds, setSeconds] = useState(0);

    useEffect(() => { 
        const interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    
  
    return (

        <>

                <div className="container-fluid p-3">
                    <p className="text-muted" style={{fontSize: 14 + "px"}}>{seconds >= 4 ? "Unauthorized Token" : "Checking Permission..."}</p>
                 </div>
               
        </>

    );





}

export default CheckingPermission;