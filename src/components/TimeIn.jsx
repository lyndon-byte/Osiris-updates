import React, { useState, useEffect } from "react";
import { app } from './firebaseconfig';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth , onAuthStateChanged} from "firebase/auth";
import {getFirestore, doc,getDoc,query,getDocs, collection, where, getCountFromServer,and, setDoc} from 'firebase/firestore';
import { async } from "@firebase/util";


const storage = getStorage(app);

const db = getFirestore(app);

const auth = getAuth(app);

export default function TimeInApp(){

    


   

    const [dateToday,setDateToday] = useState('')
    const [currentUser,setCurrentUser] = useState('');
    const [idNumber,setIdNumber] = useState('');
    const [time,setTime] = useState(new Date().toLocaleTimeString());
    const [day,setDay] = useState(['Sun','Mon','Tue','Wed','Thurs','Fri','Sat'])
    const [employeePhoto,setEmployeePhoto] = useState('');
    const [employeeInforForViewing,setEmployeeInfoForViewing] = useState([])
    const [timeInRecords,setTimeinRecords] = useState([]);
    const [adminInformation,setAdminInformation] = useState([]);
    const [idInput,setIdInput] = useState('')

  
    useEffect(() =>{

        onAuthStateChanged(auth, (user) => {

            if (user) {

                setCurrentUser(auth.currentUser)
                
                
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

    

        async function getAdminInfo(){

            const adminDocRef = doc(db, "superuser",currentUser.email,"personalinfo","info");

            const adminSnapDoc = await getDoc(adminDocRef);

            if (adminSnapDoc.exists()) {
                setAdminInformation(adminSnapDoc.data())
                console.log(adminSnapDoc.data())
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        
        }
    
        getAdminInfo();

    },[currentUser])

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
                            
                            
                               
                                setIdInput('');
                                
                                const isFound = timeInRecords.some(element => {
                                    if (element.id == idNumber) {
                                    return true;
                                    }
                                
                                    return false;
                                });
                                
                                if (isFound) {
                                    
                                    alert('Time out success')
                                    
                                    timeInRecords.push({

                                        id: idNumber,
                                        time: time,
                                        status: 'On Time',
                                        timeout: 'Undertime'
                                    })
                        
                                }else{

                                    alert('Time in success')
                                    
                                    timeInRecords.push({

                                        id: idNumber,
                                        time: time,
                                        status: 'On Time',
                                        timeout: 'Pending'
                                    })
                                }
                           
                            
                        }

                        recordTime()

                       
                    
                        
                        
                    }
                    
                   
                }
    
                
                addTimeInTimeOut()

       }else{

            alert('enter your id number first!');

       }

    }

   useEffect(() =>{

        

   },[])

   const handleIdInput = (e) =>{

        setIdInput(e.target.value)

   }

    return(

        <>
            <nav className="navbar bg-white ">
                <div className="container-fluid">
                    <a className="navbar-brand text-muted" href="" style={{fontSize: 16 + "px"}}>Time In App</a>
                    <a className="navbar-brand " href="" style={{fontSize: 20 + "px"}}>{time} <span className="text-muted fw-medium">{day[new Date().getDay()]}</span></a>
                </div>
            </nav>  
           
            <div className="container mt-5">
                <div className="col-lg-8 col-sm-12 mb-5 m-auto">
                    <div className="alert alert-primary" style={{fontSize: 20 + "px"}} data-bs-theme="dark" role="alert">
                        
                            Good Day! <span className="text-white">{adminInformation.companyname} Peeps! 😃 </span>
                       
                    </div>
                </div>
                <div className="row">
                    
                    <div className="col-lg-4 col-sm-12 mt-4 ">
                        
                        <div className="card border-0 m-auto" data-bs-theme="dark" style={{width: 15 + "rem"}}>
                            
                            <div className="col-lg-5 m-auto mt-5">
                                    <img src={employeePhoto === '' ? 'https://static.vecteezy.com/system/resources/previews/024/983/914/non_2x/simple-user-default-icon-free-png.png' : employeePhoto} width="25%" className="card-img-top"  alt="..."/>
                            </div>
                            
                        
                            <div className="card-body text-center">
                                {

                                        employeeInforForViewing.map((data) => (

                                           
                                            <>
                                                <h5 className="card-title mb-4 mt-3">{data.employeenum}</h5>
                                                <p className="card-text mb-5">{data.fullname}</p>
                                            </>


                                        ))
                                }
                                
                                
                            </div>
                        </div>

                        
                    </div>
                    <div className="col-lg-8 mt-4">
                            
                    <div className="col-4">

                        <div className="row g-2">
                           
                            <div className="col-lg-8 ">
                                
                                <div className="mb-3">
                                    
                                    <div className="input-group">

                                    

                                        <input type="number" className="form-control rounded-1" id="basic-url" aria-describedby="basic-addon3 basic-addon4" placeholder="Id num" value={idInput} onChange={handleIdInput} onKeyUp={(e) => {setIdNumber(e.target.value)}}/>
                                    
                                    </div>
                                    <div className="form-text" id="basic-addon4"></div>
                                    
                                </div>
                            </div>
                            <div className="col-lg-4 mb-4">
                                <button className="btn btn-primary rounded-1 w-100 rounded-1" onClick={timeintimeout}>ok</button> 
                            </div>
                        </div>
                            


                        
                    </div>
                          
                            
                            <div className="table-responsive w-100">
                                    <table className="table caption-top border">
                                    
                                        <thead className="text-center" style={{position: "sticky"}}>
                                            <tr>

                                                <th scope="col">ID #</th>
                                                <th scope="col">Time In</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Time Out</th>
                                               
                                            
                                            </tr>
                                        </thead>
                                        <tbody className="text-center">

                                        
                    
                                                      
                                                        {
                                                           
                                                            
                                                               timeInRecords.map((data) =>(

                                                                 <>
                                                                    
                                                                    <tr style={{lineHeight: 37 + "px"}}>
                                                                        <td className="data-row">{data.id}</td>
                                                                    
                                                                        <td className="data-row">{data.time}</td>
                                                                   
                                                                        <td className="data-row bg-success text-white">{data.status}</td>
                                                                        <td className={data.timeout === 'Undertime' ? 'data-row bg-danger text-white' : 'data-row bg-warning text-dark'}>{data.timeout}</td>
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

                <div className="container-fluid bg-white " style={{marginTop: 510 + "px"}}>
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