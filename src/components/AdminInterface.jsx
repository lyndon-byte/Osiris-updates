import React from "react";
import Employees from './Employees';
import Payroll from './Payroll';
import Benefits from './Benefits';
import Attendance from './Attendance';
import Performance from './Performance';
import Training from './Training';
import Reporting from "./Reporting";
import {useState} from 'react';
import { app } from './firebaseconfig';
import { getAuth} from "firebase/auth";
import { getFirestore, doc ,setDoc, getDoc, collection} from "firebase/firestore";
import { BrowserRouter as Router , Routes , Route, Link } from "react-router-dom";
import '../dashboard.css'


const auth = getAuth(app);


function Sidebar(){

    const [activesidebarbtn,setactivesidebarbtn] = useState('dashboardbtn');

    const [openSideBar,setOpenSideBar] = useState(true);

    const showSideBar = () => setOpenSideBar(false);

    return (

        <>


                
                <div className={openSideBar ? 'offcanvas offcanvas-start show' : 'offcanvas offcanvas-start'} style={{width: 195 + "px"}} data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                     <img src="/src/assets/osirislogo.png" width="22%" alt=""  />
                     
                    <button type="button" className="btn-close text-muted" data-bs-dismiss="offcanvas" onClick={showSideBar} aria-label="Close"></button>
                </div>
                <div className="offcanvas-body border-0" >
                  
                    <div className="row">
                        <div className="col">
                            <Link to="dashboard/reporting" className={ activesidebarbtn === "dashboardbtn" ? ' btn btn-outline-primary border-0 rounded-1 w-100 text-start active' : ' btn btn-outline-primary border-0 rounded-1 w-100 text-start'} onClick={ () => { setactivesidebarbtn("dashboardbtn") }}><span className="material-symbols-outlined material-icons">speed</span>&nbsp; <span className="sidebarbtntext">Dashboard</span></Link>
                        </div>
                        <div className="col">
                            <Link to="dashboard/employees" className={ activesidebarbtn === "employeesbtn" ? "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start active " : "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start"} onClick={ () => { setactivesidebarbtn("employeesbtn")}}><span className="material-symbols-outlined material-icons">group</span>&nbsp; <span className="sidebarbtntext">Employees</span></Link>
                        </div>
                        <div className="col-12">
                            <Link to="dashboard/payroll" className={ activesidebarbtn === "payrollbtn" ? "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start active" : "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start"} onClick={ () => {setactivesidebarbtn('payrollbtn')}} ><span className="material-symbols-outlined material-icons">payments</span>&nbsp; <span className="sidebarbtntext">Payroll</span></Link>
                        </div>
                        <div className="col-12">
                            <Link to="dashboard/benefits" className={activesidebarbtn ==="benefitsbtn" ? "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start active" : "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start"} onClick={ () => {setactivesidebarbtn("benefitsbtn")}}><span className="material-symbols-outlined material-icons">volunteer_activism</span>&nbsp; <span className="sidebarbtntext">Benefits</span></Link>
                        </div>
                        <div className="col-12">
                            <Link to="dashboard/attendance" className={activesidebarbtn ==="attendancebtn" ? "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start active" : "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start"} onClick={ () => {setactivesidebarbtn("attendancebtn")}}><span className="material-symbols-outlined material-icons">event_available</span>&nbsp; <span className="sidebarbtntext">Attendance</span></Link>
                        </div>
                        <div className="col-12">
                            <Link to="dashboard/performance" className={activesidebarbtn ==="performancebtn" ? "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start active" : "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start"} onClick={ () => {setactivesidebarbtn("performancebtn")}}><span className="material-symbols-outlined material-icons">psychology</span>&nbsp; <span className="sidebarbtntext">Performance</span></Link>
                        </div>
                        <div className="col-12">
                            <Link to="dashboard/training" className={activesidebarbtn ==="trainingbtn" ? "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start active" : "btn btn-outline-primary border-0 rounded-1 mt-2 w-100 text-start"} onClick={ () => {setactivesidebarbtn("trainingbtn")}}><span className="material-symbols-outlined material-icons">model_training</span>&nbsp; <span className="sidebarbtntext">Training</span></Link>
                        </div>
                        <div className="col-12">
                            <button className=" btn btn-outline-primary border-0 rounded-1  mt-2 w-100 text-start"><span className="material-symbols-outlined material-icons">widgets</span>&nbsp; <span className="sidebarbtntext">Time In App</span></button>
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
                <Routes>
                    <Route

                        path="dashboard/reporting"
                        element={ <Reporting/> }

                    />      
                    <Route

                        path="dashboard/employees"
                        element={ <Employees/> }

                    />
                    <Route

                        path="dashboard/payroll"
                        element={ <Payroll/> }

                    />
                    <Route

                        path="dashboard/benefits"
                        element={ <Benefits/> }

                    />
                     <Route

                        path="dashboard/Attendance"
                        element={ <Attendance/> }

                    />
                   <Route

                        path="dashboard/performance"
                        element={ <Performance/> }

                    />
                     <Route

                        path="dashboard/training"
                        element={ <Training/> }

                    />

                </Routes>


        </>

    );
  
    
}

export default AdminInterface;