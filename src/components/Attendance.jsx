import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {app} from './firebaseconfig';
import { Link } from 'react-router-dom';
import {getFirestore, doc,getDoc,query,getDocs, collection, where, getCountFromServer,and} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import {getAuth} from 'firebase/auth'
import { async } from "@firebase/util";

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);




export default function Employee (){

    const user =  auth.currentUser;

    const [employeeInfoId,setEmployeeInfoId] = useState([]);
    const [activeEmployee,setActiveEmployee] = useState(0)
    const [filterByDepartmentkeyword,setFilterByDepartmentkeyword] = useState('all')
    const [searchByNameandId,setsearchByNameandId] = useState("")
    const [searchSuccess,setSearchSuccess] = useState(true);
    const [viewValue,setViewValue] = useState(0);
    const [employeeInfoForViewing,setEmployeeInfoForViewing] = useState([]);
    const [employeePhoto,setEmployeePhoto] = useState('')
    const [showModal,setShowModal] = useState(false);


    const fetchEmployeesDocument = async () => {


        const q = query(collection(db,"miniusers"),where("administrator", "==", user.email))

            const dataCount = await getCountFromServer(q);

            setActiveEmployee(dataCount.data().count  )

            const employeeidlist = await getDocs(q);
            
            const employeelist =  employeeidlist.docs.map((doc) => ({...doc.data(), id: doc.id}));
            
            setEmployeeInfoId(employeelist);
            
              
            
        

    }

    useEffect(() =>{

        if(viewValue !== 0){

         

            getDownloadURL(ref(storage, `${user.email}/${viewValue}`))
                .then((url) => {
                    
                     setEmployeePhoto(url);

                })
                .catch((error) => {
                    console.log(error)
                });

            async function getEmployeeInfoForViewing(){

                const docRef = query(collection(db,"miniusers"),and(where("administrator", "==", user.email),where("employeenum", "==", viewValue)));
                const docSnap = await getDocs(docRef);
                const employeeinfolistforviewing = docSnap.docs.map((doc) => ({...doc.data(), id: doc.id}));
                setEmployeeInfoForViewing(employeeinfolistforviewing);
                setShowModal(true);
            }


            getEmployeeInfoForViewing()



        }   

    },[viewValue])
   

    useEffect(() => {


            const filterByNameorId = async () => {

                if(searchByNameandId !== ""){

                    const q = query(collection(db,"miniusers"),and (where("administrator", "==", user.email),where("employeenum","==",searchByNameandId)))

                    const dataCount = await getCountFromServer(q);

                    setActiveEmployee(dataCount.data().count)

                    if(dataCount.data().count !== 0){

                        const employeeidlist = await getDocs(q);
                        
                        const employeelist =  employeeidlist.docs.map((doc) => ({...doc.data(), id: doc.id}));
                        
                        setEmployeeInfoId(employeelist);

                        setSearchSuccess(true)

                    }else{

                        setSearchSuccess(false)
                    
                    }
                        
                    
                
                
            } else{

                setSearchSuccess(true)
                fetchEmployeesDocument();
                
            }
        

        }

        
        filterByNameorId();

    },[searchByNameandId])

    
    useEffect(() =>{


            const filterByDepartment = async () => {

                if(filterByDepartmentkeyword !== "all"){


                        const q = query(collection(db,"miniusers"),and (where("administrator", "==", user.email),where("department","==",filterByDepartmentkeyword)))

                        const dataCount = await getCountFromServer(q);

                        setActiveEmployee(dataCount.data().count  )

                        const employeeidlist = await getDocs(q);
                        
                        const employeelist =  employeeidlist.docs.map((doc) => ({...doc.data(), id: doc.id}));
                            
                        setEmployeeInfoId(employeelist);

                        

                

                } else{

                fetchEmployeesDocument();
    
                }
        

        }
          
            filterByDepartment();
        
    },[filterByDepartmentkeyword]);



    const handleCloseForEmployeeInfoModal = () => {

        setShowModal(false);
        setViewValue(0);

    }


    useEffect(() =>{


        fetchEmployeesDocument()

        
    },[]);

    function ViewEmployeeInfoModal (){

       
        const [startOfShiftTimeMins,setStartOfShiftTimeMins] = useState(0);
        const [hourForEndOfShift,setHourForEndOfShift] = useState(0)
        const [timePeriodForEndofShift,setTimePeriodForEndofShift] = useState('');


        const handleSetStartShiftTime = (e) => {

               let [hours, mins] = e.target.value.split(':');

              

              

        }


        return (
    
            <>
            
                    <Modal
                         show={showModal}
            
                         backdrop="static"
                         keyboard={false}
                         fullscreen={true}
                         
                     >
                         <Modal.Header closeButton onClick={handleCloseForEmployeeInfoModal}>
                            
                                <Modal.Title id="example-modal-sizes-title-sm" style={{fontSize: 17 + "px"}}>
                                <i className="fa-regular fa-user"></i> &nbsp; Attendance Info
                                </Modal.Title>
                                
                         </Modal.Header>
                         <Modal.Body className='text-center rounded-1 border-0'  >
                            
                            <Container >
                                
                                <Row>

                                    <Col lg={4} sm={12}>
                                        
                                           
                                               
                                                
                                                    

                                                
                                          
                                        
                                    </Col>
                                    <Col lg={8} sm={12}>

                                                
                                           

                                            
                                        
                                        
                                       
                                    </Col>
                                </Row>
                                
                                        
                                      
                                       
                                
                            </Container>
                            
                         </Modal.Body>

                         <Modal.Footer className='border-0 rounded-1 p-4'>
                      
                      
                                 Osiris HRIS-Payroll Web Application V1.1
      
                           
                         </Modal.Footer>
                     </Modal>
         
    
            </>
    
        );
    
    }



    return (

        
        
        <>


            <ViewEmployeeInfoModal></ViewEmployeeInfoModal>

                <div className="container mt-5">
                    <div className="row" style={{marginBottom: 80 + "px"}}>
                    <div className="col-lg-6 col-sm-12 mt-3">
                        <div className="card border-0">
                            <div className="card-header border-0 bg-danger text-white text-center">
                                Absentees for today
                            </div>
                            <div className="card-body p-5 text-center">
                                
                                <h1 className="mt-4"><i className="fa-solid fa-user text-success"></i> 0</h1>
                               
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12 mt-3">
                        <div className="card border-0">
                            <div className="card-header border-0 bg-warning text-dark text-center">
                                Tardiness for today
                            </div>
                            <div className="card-body p-5 text-center">
                                
                                <h1 className="mt-4"><i className="fa-solid fa-user text-success"></i> 0</h1>
                                
                            </div>
                        </div>  
                    </div>
                    <div className="col-lg-4 col-sm-12 mt-5">
                            <div className="alert alert-primary w-75" style={{fontSize: 15 + "px"}} role="alert">
                                <i className="fa-solid fa-circle-info"></i> Search employee using their ID #
                            </div>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2 rounded-1 w-75" type="number" onChange={(e) => {setsearchByNameandId(e.target.value)} } placeholder="Search Employee" aria-label="Search"/>
                                
                                
                                
                            </form>
                            <div className="form-text" id="basic-addon4">{ searchSuccess ? '' : 'No results found'}</div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-lg-12 col-sm-12 float-start">
                                <div className="float-end">
                                    <select className="form-select mb-3 rounded-1" aria-label="Default select example" onChange={(e) => {setFilterByDepartmentkeyword(e.target.value)  }}>
                                                <option defaultValue value="all">Select Department</option>
                                                <option value="all" >All</option>
                                                <option value="Accounting">Accounting</option>
                                                <option value="Production">Production</option>
                                                <option value="Marketing">Marketing</option>
                                    </select>
                                </div>
                        </div>
                       
                    </div>
                    <div className="row" style={{marginBottom: 490 + "px"}}>


                        <div className="table-responsive">
                            <table className="table caption-top border">
                               
                                <thead className="text-center" style={{position: "sticky"}}>
                                    <tr>

                                        <th scope="col">ID #</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Email Address</th>
                                        <th scope="col">Designation</th>
                                        <th scope="col">Department</th>
                                      
                                        <th scope="col">Attendance</th>
                                        

                                            

                                        

                                    </tr>
                                </thead>
                                <tbody className="text-center">

                                   {

                                        employeeInfoId.map((info,i) =>(
            
                                                <tr key={i}  style={{lineHeight: 37 + "px"}}>

                                                    <td className="data-row">{info.employeenum}</td>
                                                    <td className="data-row">{info.fullname}</td>
                                                    <td className="data-row">{info.email}</td>
                                                    <td className="data-row">{info.designation}</td>
                                                    <td className="data-row">{info.department}</td>
                                                    <td> <button className=" btn btn-primary rounded-1 border-0"  onClick={(e) => {setViewValue(info.employeenum)}}> <i className="fa-regular fa-eye"></i> </button> </td>

                                                </tr>

                                        ))

                                   }

                                    
                                </tbody>
                            </table>    
                                
                        </div>
                                   
                    </div>
                     
                </div>
           
        </>



    );


}