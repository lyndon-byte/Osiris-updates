import React from "react";
import {useState} from 'react';
import { app } from './firebaseconfig';
import { getAuth} from "firebase/auth";
import { getFirestore, doc ,setDoc, getDoc, collection} from "firebase/firestore";


const auth = getAuth(app);


function Sidebar(){

    const [openSideBar,setOpenSideBar] = useState(true)

    const showSideBar = () => setOpenSideBar(false)

    return (

        <>


                
                <div className={openSideBar ? 'offcanvas offcanvas-start show' : 'offcanvas offcanvas-start'} style={{width: 215 + "px"}} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                     <img src="./src/assets/osirislogo.png" width="22%" alt=""  />
                     
                    <button type="button" className="btn-close text-muted" data-bs-dismiss="offcanvas" onClick={showSideBar} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body border-0" >
                  
                    <div className="row">
                        <div className="col">
                            <div className="dropdown mt-3">
                                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    Dropdown button
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Action</a></li>
                                    <li><a className="dropdown-item" href="#">Another action</a></li>
                                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        
        </>


    );


}



function AdminInterface (){




    return (

        <>
                <Sidebar></Sidebar>
                <h1> this is the admin interface </h1>

        </>

    );
  
    
}

export default AdminInterface;