import React, { useState, useEffect } from "react";
import { app } from './firebaseconfig';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth , onAuthStateChanged} from "firebase/auth";
import {getFirestore, doc,getDoc,query,getDocs, collection, where, getCountFromServer,and, setDoc} from 'firebase/firestore';
import { async } from "@firebase/util";


const storage = getStorage(app);

const db = getFirestore(app);


export default function TimeInApp(){

    const auth = getAuth(app);
    const [dateToday,setDateToday] = useState('')
    const [currentUser,setCurrentUser] = useState('');
    const [idNumber,setIdNumber] = useState('');
    const [time,setTime] = useState(new Date().toLocaleTimeString());
    const [day,setDay] = useState(['Sun','Mon','Tue','Wed','Thurs','Fri','Sat'])
    const [employeePhoto,setEmployeePhoto] = useState('');
    const [employeeInforForViewing,setEmployeeInfoForViewing] = useState([])
    const [timeInRecords,setTimeinRecords] = useState([]);

  
    useEffect(() =>{

        onAuthStateChanged(auth, (user) => {

            if (user) {

                setCurrentUser(auth.currentUser);
                
                
            } else {
                
                setCurrentUser('');
            }
        });

    },[])


    useEffect(() => {

                const datewithslash = new Date().toLocaleDateString();

                const [month,day,year] = datewithslash.split('/')
            
                console.log(month)
                console.log(day)
                console.log(year)

                setDateToday(month + "-" + day + "-" + year)
                

    },[])

    useEffect(() => {

        const timerID = setInterval(() => tick(), 1000);
        return () => {

            clearInterval(timerID);
         };

    },[])

    const tick = () => {

        setTime(new Date().toLocaleTimeString())

    }


    const timeintimeout = () => {

       if(idNumber !== 0){

                getDownloadURL(ref(storage, `${currentUser.email}/${idNumber}`))
                .then((url) => {
                    
                    setEmployeePhoto(url);
                
                })
                .catch((error) => {
                    console.log(error)
                });

                async function addTimeInTimeOut(){

                    const docRef = query(collection(db,"miniusers"),and(where("administrator", "==", currentUser.email),where("employeenum", "==", idNumber)));
                    
                    const datacount = await getCountFromServer(docRef);

                    if (datacount.data().count === 0){

                        alert('Invalid Id number')

                    }else{
                          
                        const docSnap = await getDocs(docRef);
                        const employeeinfolistforviewing = docSnap.docs.map((doc) => ({...doc.data(), id: doc.id}));
                        setEmployeeInfoForViewing(employeeinfolistforviewing);

                        function recordTime(){
                            
                            timeInRecords.push({

                                id: idNumber,
                                time: time,
                                status: 'late'

                            });
                            
                            console.log(timeInRecords)
                        }

                        recordTime();
                    }
                    
                   
                }
    
                
                addTimeInTimeOut()

       }else{

            alert('enter your id number first!');

       }

    }

    return(

        <>
            <nav className="navbar bg-white ">
                <div className="container-fluid">
                    <a className="navbar-brand text-muted" href="" style={{fontSize: 16 + "px"}}>Time In App</a>
                    <a className="navbar-brand text-danger fw-bold" href="" style={{fontSize: 20 + "px"}}>{time} <span className="text-muted fw-medium">{day[new Date().getDay()]}</span></a>
                </div>
            </nav>  
            <div className="container mt-3">
                <div className="row">
                    <div className="col-lg-4 col-sm-12 mt-4">
                        <div className="card border-0 m-auto" data-bs-theme="dark" style={{width: 15 + "rem"}}>
                            <div className="col m-auto mt-4">
                                <button className="btn bg-light"></button>
                            </div>
                            <div className="col p-5">
                                    <img src={employeePhoto === '' ? 'https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png' : employeePhoto} className="card-img-top"  alt="..."/>
                            </div>
                            
                        
                            <div className="card-body text-center">
                                {

                                        employeeInforForViewing.map((data) => (

                                           
                                            <>
                                                <h5 className="card-title mb-4">{data.employeenum}</h5>
                                                <p className="card-text mb-5">{data.fullname}</p>
                                            </>


                                        ))
                                }
                                
                                
                            </div>
                        </div>

                        <div className="col-6 mt-5 m-auto">

                            <div className="mb-3">
                                <label  className="form-label">Enter your id number:</label>
                                <div className="input-group">

                                  

                                    <input type="number" className="form-control" id="basic-url" aria-describedby="basic-addon3 basic-addon4"  onKeyUp={(e) => {setIdNumber(e.target.value)}}/>
                                  
                                </div>
                                <div className="form-text" id="basic-addon4"></div>
                            </div>

                            <button className="btn btn-success rounded-1 w-100 mb-3" onClick={timeintimeout}>Submit</button>   
                           
                            <button className="btn btn-primary rounded-1 w-100"  onClick={()=> {alert('barcode scanner device was not found')}}><span className="material-symbols-outlined mt-1">barcode_scanner</span></button>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-5">
                            
                            <div className="col-4 m-auto">
                                <div className="alert alert-primary text-center" role="alert">
                                    {new Date().toLocaleDateString()}
                                </div>
                            </div>
                            
                            <div className="table-responsive">
                                    <table className="table caption-top border">
                                    
                                        <thead className="text-center" style={{position: "sticky"}}>
                                            <tr>

                                                <th scope="col">ID #</th>
                                                <th scope="col">Time In</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Time Out</th>
                                                <th scope="col">Status</th>
                                            
                                               
                                                

                                                    

                                                

                                            </tr>
                                        </thead>
                                        <tbody className="text-center">

                                        
                    
                                                        
                                                        {
                                                           
                                                           
                                                               timeInRecords.map((data) =>(

                                                                 <>
                                                                    <tr style={{lineHeight: 37 + "px"}}>
                                                                        <td className="data-row">{data.id}</td>
                                                                    
                                                                        <td className="data-row">{data.time}</td>
                                                                   
                                                                        <td className="data-row">{data.status}</td>
                                                                    </tr>
                                                                 </>
                                                               ))

                                                           
                                                        
                                                        }

                                                                  
                                                                   
                                                        
                                            

                                        

                                            
                                        </tbody>
                                    </table>   
                            </div> 
                    </div>
                </div>
            </div>

            <section>

                <div className="container-fluid bg-white " style={{marginTop: 200 + "px"}}>
                    <div className="row">
                        <div className="col-12">
                            <p className="py-5 small text-center text-muted mt-3">Osiris HRIS-Payroll Web Application V1.1</p>
                        </div>
                    </div>
                </div>  

            </section>  

        </>

    );


}