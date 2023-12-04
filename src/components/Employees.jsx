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
                                <i className="fa-regular fa-user"></i> &nbsp; Employee Info
                                </Modal.Title>
                                
                         </Modal.Header>
                         <Modal.Body className='text-center rounded-1 border-0'  >
                            
                            <Container >
                                
                                <Row>

                                    <Col lg={4} sm={12}>
                                        <Card style={{ width: '18rem' }} className="m-auto mt-5" data-bs-theme="dark">
                                            <Card.Img variant="top" src={employeePhoto} className="w-50 m-auto mt-5" />
                                            <Card.Body style={{marginBottom: 20 + "px"}}>
                                               
                                                
                                                    

                                                    {



                                                        employeeInfoForViewing.map((info,i) =>(
                                                            <>
                                                                <p className="mt-5">ID: {info.employeenum}</p>
                                                                <Card.Title>{info.fullname}</Card.Title>
                                                                <p className="mt-4" style={{fontSize: 35 + "px"}}><i className="fa-solid fa-barcode"></i><i className="fa-solid fa-barcode"></i><i className="fa-solid fa-barcode"></i><i className="fa-solid fa-barcode"></i></p>
                                                            </>
                                                           
                                                             

                                                        ))


                                                    }
                                                
                                                
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col lg={8} sm={12}>

                                                
                                            {



                                                employeeInfoForViewing.map((info,i) =>(
                                                    <>
                                                        <Row style={{marginTop: 90 + "px"}}>

                                                            <Col lg={6} sm={12} className="text-start">

                                                                <p className="fw-bold">Gender: &nbsp; <span className="fw-medium text-muted">{info.gender}</span></p>
                                                                <p className="fw-bold">Birthdate: &nbsp; <span className="fw-medium text-muted">{info.birthdate}</span></p>
                                                                <p className="fw-bold">Address: &nbsp; <span className="fw-medium text-muted">{info.address}</span></p>
                                                                <p className="fw-bold">Contact Number: &nbsp; <span className="fw-medium text-muted">{info.contactnumber}</span></p>
                                                                <p className="fw-bold">Email Address: &nbsp; <span className="fw-medium text-muted">{info.email}</span></p>
                                                                
                                                            </Col>
                                                            
                                                            <Col lg={6} sm={12} className="text-start">

                                                                <p className="fw-bold">Salary Rate: &nbsp; <span className="fw-medium text-muted">₱{info.salaryrate}</span></p>
                                                                <p className="fw-bold">Start Date: &nbsp; <span className="fw-medium text-muted">{info.startdate}</span></p>
                                                                <p className="fw-bold">Department: &nbsp; <span className="fw-medium text-muted">{info.department}</span></p>
                                                                <p className="fw-bold">Designation: &nbsp; <span className="fw-medium text-muted">{info.designation}</span></p>
                                                                <p className="fw-bold">SSS: &nbsp; <span className="fw-medium text-muted">{info.sssid}</span></p>
                                                                <p className="fw-bold">PAG-IBIG: &nbsp; <span className="fw-medium text-muted">{info.pagibigid}</span></p>
                                                                <p className="fw-bold">Philhealth: &nbsp; <span className="fw-medium text-muted">{info.philhealthid}</span></p>
                                                                <p className="fw-bold">TIN: &nbsp; <span className="fw-medium text-muted">{info.tinid}</span></p>
                                                            </Col>
                                                            

                                                            

                                                        </Row>
                                                    </>
                                                
                                                    

                                                ))


                                            }
                                        
                                      
                                       
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 100 + "px", marginBottom: 200 + "px"}} className="">
                                    
                                        
                                        
                                        <Col lg={11} sm={12} className="m-auto border rounded-2 p-5">

                                            <Col lg={12}> 
                                                    <h5 className="text-muted mb-5 mt-4">Set or change schedule</h5>
                                            </Col>
                                                
                                                <Row>

                                                        <Col lg={4} sm={12} className="text-start m-auto rounded-1 mt-5">
                                                                
                                                            
                                                            <Form.Label htmlFor="basic-url">Rest Day</Form.Label>
                                                            <Form.Select aria-label="Default select example">
                                                                        <option>select</option>
                                                                        <option value="1">Mon-Tue</option>
                                                                        <option value="2">Tue-Wed</option>
                                                                        <option value="2">Wed-Thu</option>
                                                                        <option value="3">Thu-Fri</option>
                                                                        <option value="3">Fri-Sat</option>
                                                                        <option value="3">Sat-Sun</option>
                                                                        <option value="3">Sun-Mon</option>
                                                            </Form.Select>
                                                            
                                                            
                                                        </Col>
                                                        <Col lg={4} sm={12} className="text-start m-auto rounded-1 mt-5">
                                                            
                                                        
                                                            <Form.Label htmlFor="basic-url">Start of shift time</Form.Label>
                                                            <InputGroup className="mb-3">
                                                            
                                                                <Form.Control id="basic-url" aria-describedby="basic-addon3" type="time" onChange={handleSetStartShiftTime} />
                                                            </InputGroup>

                                                        
                                                        
                                                        </Col>
                                                        <Col lg={4} sm={12} className="text-start m-auto rounded-1 mt-5">
                                                            
                                                            
                                                            <Form.Label htmlFor="basic-url">End of shift time</Form.Label>
                                                            <InputGroup className="mb-3" >
                                                                
                                                                <Form.Control id="basic-url" aria-describedby="basic-addon3"  type="time" />

                                                            </InputGroup>

                                                        
                                                        
                                                        </Col>
                                                        <Col lg={4} sm={12} className="text-start m-auto rounded-1 mt-5">
                                                            
                                                            
                                                            <Form.Label htmlFor="basic-url">First 15 minutes break</Form.Label>
                                                            <InputGroup className="mb-3" >
                                                                
                                                                <Form.Control id="basic-url" aria-describedby="basic-addon3"   type="time" />

                                                            </InputGroup>

                                                        
                                                        
                                                        </Col>
                                                        <Col lg={4} sm={12} className="text-start m-auto rounded-1 mt-5">
                                                            
                                                            
                                                            <Form.Label htmlFor="basic-url">Lunch Break</Form.Label>
                                                            <InputGroup className="mb-3" >
                                                                
                                                                <Form.Control id="basic-url" aria-describedby="basic-addon3"   type="time" />

                                                            </InputGroup>

                                                        
                                                        
                                                        </Col>
                                                        <Col lg={4} sm={12} className="text-start m-auto rounded-1 mt-5">
                                                            
                                                            
                                                            <Form.Label htmlFor="basic-url">Last 15 minutes break</Form.Label>
                                                            <InputGroup className="mb-3" >
                                                                
                                                                <Form.Control id="basic-url" aria-describedby="basic-addon3"   type="time" />

                                                            </InputGroup>

                                                        
                                                        
                                                        </Col>
                                                        <Col lg={12} sm={12} className="text-start m-auto rounded-1 mt-5">
                                                
                                                
                                                                <Button variant="primary" className="float-end border-0 rounded-1">Submit</Button>
                                                        
                                                        
                                                        </Col>

                                            </Row>
                                        
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
                        <div className="col-lg-7 col-sm-12 m-auto">
                            <div className="alert alert-primary p-5" data-bs-theme="dark" role="alert">
                                <span>Number of Active Employees</span>
                                <i className="fa-solid fa-people-group float-end text-white mt-3" style={{fontSize: 40 + "px"}}></i>
                                <h1 className="text-white">{activeEmployee}</h1>

                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 m-auto">
                            <div className="alert alert-primary" style={{fontSize: 15 + "px"}} role="alert">
                            <i className="fa-solid fa-circle-info"></i> Search employee using their ID #
                            </div>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2 rounded-1" type="number" onChange={(e) => {setsearchByNameandId(e.target.value)} } placeholder="Search Employee" aria-label="Search"/>
                                
                                
                            </form>
                            <div className="form-text" id="basic-addon4">{ searchSuccess ? '' : 'No results found'}</div>
                        </div>
                    </div>
                    <div className="row mt-5">

                        <div className="col-lg-12 col-sm-12 float-start">
                                <Link to="/dashboard/employeeinterface" className="btn btn-primary border-0 rounded-1 mb-4 m-1" style={{fontSize: 16 + "px"}}><i className="fa-solid fa-plus"></i> Add new employee</Link>
                                <button className="btn btn-success border-0 rounded-1 mb-4 m-1" style={{fontSize: 16 + "px"}}><i className="fa-solid fa-file-csv"></i> Add using spreadsheet</button>
                                <div className="float-end">
                                    <select className="form-select mb-4 rounded-1" aria-label="Default select example" onChange={(e) => {setFilterByDepartmentkeyword(e.target.value)  }}>
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
                                      
                                        <th scope="col">Action</th>
                                        

                                            

                                        

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
                                                    <td> <button className=" btn btn-primary rounded-1 border-0" id="viewbutton" onClick={(e) => {setViewValue(info.employeenum)}}> <i className="fa-regular fa-eye"></i> </button>  </td>

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