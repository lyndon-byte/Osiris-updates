import React, { useEffect, useState } from "react";
import { getAuth , onAuthStateChanged } from "firebase/auth";
import { doc, getDoc , getFirestore , query , where , and,collection , getCountFromServer} from "firebase/firestore";
import holidays from 'date-holidays';
import ProductivityandQualityReport from './ProductivityandQualityReport';
import {Link} from 'react-router-dom';
import '../dashboard.css'

import {app} from './firebaseconfig';
import { async } from "@firebase/util";

const auth = getAuth(app);

const db =  getFirestore(app);




export default function Reporting (){

    const hd = new holidays('PH');
    const holiday = hd.getHolidays();
   

    const [currentUser,setCurrentUser] = useState(auth.currentUser)
    const [datetime,setDateTime] = useState(new Date().toLocaleTimeString());
    const [adminInfo,setAdminInfo] = useState([])
    const [numberOfActiveEmployees,setNumberOfActiveEmployees] = useState(0);

    const [day,setDay] = useState(['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'])

    useEffect(() => {

        console.log(holiday);

    },[])

    useEffect(() => {

        async function getAdminInfo(){

            const adminDocRef = doc(db, "superuser", currentUser.email,"personalinfo","info");

            const adminSnapDoc = await getDoc(adminDocRef);

            if (adminSnapDoc.exists()) {
                setAdminInfo(adminSnapDoc.data())
                console.log('admin info was fetch')
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        
        }
    
        getAdminInfo();

    },[])


   
    useEffect(() => {

        async function getTotalNumberOfEmployees() {
        
            const q = query(collection(db,"miniusers"),where("administrator", "==", currentUser.email))
    
            const dataCount = await getCountFromServer(q);
    
            setNumberOfActiveEmployees(dataCount.data().count)

            console.log('number of employees was shown')
    
        }          
        
        getTotalNumberOfEmployees();

    },[])
  
    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
        
            if (user) {
    
               console.log('login')
               
             
            } else {
    
                setCurrentUser('')
            }
        });
    

    },[currentUser])
    
    useEffect(() => {

        const timerID = setInterval(() => tick(), 1000);
        return () => {

            clearInterval(timerID);
         };

    },[])

    const tick = () => {

        setDateTime(new Date().toLocaleTimeString())

    }
   


    return (

        
        
        <>

            <div className="container" style={{marginBottom: 200 + "px"}}>
                
                    <div className="alert alert-primary mt-5 p-5" data-bs-theme="dark" role="alert">
                        
                         <div className="row">

                                <div className="col-lg-6 col-sm-12">
                                    <h2 className="mt-4">Good Day😃</h2>
                            
                                    <h5 className="text-white">{currentUser.displayName}</h5>

                                    <h6 className="text-muted">{adminInfo.position}</h6>
                                </div>
                                <div className="col-lg-6 text-end mt-3 col-sm-12">
                                 <h1 className="text-white">{day[new Date().getDay()]}</h1>
                                 <h3 className="text-white">{datetime}</h3>
                                 <h6 >{new Date().toLocaleDateString()}</h6>      
                                </div>
                         </div>

                        
                        
                    </div>

                <div className="row mt-5">
                        
                        <div className="col-lg-4 col-sm-12 mt-2">
                            <div className="card border-0 rounded-1">
                                <div className="card-header bg-success text-white">
                                    My Company
                                </div>
                                <div className="card-body ">

                                        <div className="col-lg-12  mb-3 d-flex justify-content-center">

                                            
                                            
                                            <img src="https://cdn-icons-png.flaticon.com/512/270/270023.png"   alt="" width="20%" />
                                           

                                    
                                        </div>
                                        
                                        {

                                          

                                              <div className="col-lg-12">

                                                    <ul className="list-group">
                                                        <li className="list-group-item fw-bold"><span className="fw-medium text-muted"> {adminInfo.companyname}</span></li>
                                                        <li className="list-group-item"> <span className="fw-medium text-muted"> {adminInfo.companyaddress}</span></li>
                                                       
                                                    </ul>

                                              </div>

                                        

                                        }
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-12 mt-2">
                            <div className="card border-0 rounded-1">
                                <div className="card-header bg-primary text-white">
                                    Active Employees
                                </div>
                                <div className="card-body ">
                                     
                                     <div className="row mb-5 mt-5">
                                        <div className="col text-center">
                                         <h1 className="card-title text-muted"><i className="fa-solid fa-user text-success"></i> {numberOfActiveEmployees} </h1>
                                         <p className="mt-3 text-muted">as of today {new Date().toLocaleDateString()}</p>
                                        </div>
                                     </div>
                                   
                                    <Link to="/dashboard/employees" className="btn btn-primary border-0 rounded-1 w-100">View</Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-12 mt-2">
                            <div className="card border-0 rounded-1">
                                <div className="card-header bg-dark text-white">
                                  Estimated Payroll Total 
                                </div>
                                <div className="card-body">
                                    
                                    
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-12 mt-2">
                                               <h5 className="text-success ">₱ 1,525,000</h5>
                                            </div>
                                            <div className="col-lg-6 col-sm-12">
                                                <button className="btn btn-primary rounded-1 border-0 float-end">View</button>
                                            </div>
                                        </div>
                                    
                                </div>
                            </div>

                            <div className="card border-0 rounded-1 mt-4">
                                <div className="card-header bg-dark text-white">
                                Estimated Benefits Total 
                                </div>
                                <div className="card-body">
                                    
                                    
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-12 mt-2">
                                               <h5 className="text-success">₱ 325,000</h5>
                                            </div>
                                            <div className="col-lg-6 col-sm-12">
                                                <button className="btn btn-primary rounded-1 border-0 float-end">View</button>
                                            </div>
                                        </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 col-sm-12 mt-5">
                            <div className="card border-0 rounded-1">
                                <div className="card-header bg-secondary text-white">
                                   Productivity and Quality Performance
                                </div>
                                <div className="card-body">
                                    <div className="row mt-3">
                                             <div className="col-6">
                                                    <div className="alert text-center text-white" role="alert" style={{backgroundColor: "#0d6efd"}}>
                                                            Productivity
                                                    </div>
                                            </div>
                                            <div className="col-6">
                                                    <div class="alert text-center text-white" role="alert" style={{backgroundColor: "#198754"}}>
                                                            Quality
                                                    </div>
                                            </div>
                                    </div>
                                    
                                    <div className="col mb-5">
                                     <ProductivityandQualityReport></ProductivityandQualityReport>    
                                    </div>        
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-12 mt-5">
                            <div className="card border-0 rounded-1">
                                <div className="card-header bg-danger text-white">
                                    Incidents & Violations 
                                </div>
                                <div className="card-body text-center">
                                    <h4 className="mt-3">0 Incidents and Violations 😇</h4>
                                    <p className="mt-3 text-muted">as of today {new Date().toLocaleDateString()}</p>
                                </div>
                            </div>
                           

                            <div className="card border-0 rounded-1 mt-4">
                                <div className="card-header bg-secondary text-white">
                                    Buisness Headlines
                                </div>
                                <div className="card-body">

                                    <div className="card border-0 mt-5" width="100%">
                                        <img src="https://i-invdn-com.investing.com/news/LYNXMPEC0409P_L.jpg" className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title mt-4">Shein eyes $90 billion valuation for US IPO, expands global operations</h5>
                                            <p className="text-muted"> Shein, the Chinese fast-fashion behemoth, is targeting a massive $90 billion valuation for its upcoming US initial public offering (IPO), according to filings made confidentially... <a href="">See More</a> </p>
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 col-sm-12 mt-5">
                        <div className="card border-0 rounded-1 mt-4">
                                <div className="card-header bg-success text-white">
                                    Holidays for this month
                                </div>
                                <div className="card-body">

                                        <div className="row">
                                            <div className="col-lg-4 col-sm-12">
                                                <div class="card text-center border-0">
                                                    <div class="card-header border-0 bg-danger text-white">
                                                        
                                                        Dec 8, 2023

                                                    </div>
                                                    <div class="card-body bg-light ">
                                                       
                                                        <p class="card-text"> Feast of the Immaculate Conception</p>
                                                        
                                                    </div>
                                                    <div class="card-footer text-body-secondary">
                                                        4 days to go
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-12">
                                                <div class="card text-center border-0">
                                                        <div class="card-header border-0 bg-danger text-white">
                                                            
                                                            Dec 25, 2023

                                                        </div>
                                                        <div class="card-body bg-light ">
                                                        
                                                            <p class="card-text"> Christmas Day</p>
                                                            
                                                        </div>
                                                        <div class="card-footer text-body-secondary">
                                                            21 days to go
                                                        </div>
                                                    </div>
                                            </div>
                                            <div className="col-lg-4 col-sm-12">
                                                <div class="card text-center border-0">
                                                    <div class="card-header border-0 bg-danger text-white">
                                                        
                                                        Dec 30, 2023

                                                    </div>
                                                    <div class="card-body bg-light ">
                                                       
                                                        <p class="card-text"> Rizal Day</p>
                                                        
                                                    </div>
                                                    <div class="card-footer text-body-danger">
                                                        26 days to go
                                                    </div>
                                                </div>
                                            </div>
                                           
                                        </div>
                                   
                                </div>
                            </div>
                        </div>

                        
                </div>
            </div>

        </>



    );


}