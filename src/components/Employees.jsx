import React, { useEffect, useState } from "react";
import {app} from './firebaseconfig';
import {getFirestore, doc,getDoc,query,getDocs, collection, where, getCountFromServer,and} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
import { async } from "@firebase/util";

const auth = getAuth(app);

const db = getFirestore(app);




export default function Employee (){

    const user =  auth.currentUser;

    const [employeeInfoId,setEmployeeInfoId] = useState([]);
    const [activeEmployee,setActiveEmployee] = useState(0)
    const [filterByDepartmentkeyword,setFilterByDepartmentkeyword] = useState('all')
    const [searchByNameandId,setsearchByNameandId] = useState("")
    const [searchSuccess,setSearchSuccess] = useState(true);
    const [viewValue,setViewValue] = useState('')

    const fetchEmployeesDocument = async () => {


        const q = query(collection(db,"miniusers"),where("administrator", "==", user.email))

            const dataCount = await getCountFromServer(q);

            setActiveEmployee(dataCount.data().count  )

            const employeeidlist = await getDocs(q);
            
            const employeelist =  employeeidlist.docs.map((doc) => ({...doc.data(), id: doc.id}));
            
            setEmployeeInfoId(employeelist);
            
              
            
        

    }

    useEffect(() => {

        console.log(viewValue);

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


    useEffect(() =>{


        fetchEmployeesDocument()

        
    },[]);



    return (

        
        
        <>

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
                                
                                <button className="btn btn-secondary w-50 border-0 rounded-1" type="submit"><i className="fa-solid fa-magnifying-glass"></i> Search</button>
                                
                            </form>
                            <div className="form-text" id="basic-addon4">{ searchSuccess ? '' : 'No results found'}</div>
                        </div>
                    </div>
                    <div className="row mt-5">

                        <div className="col-lg-12 col-sm-12 float-start">
                                <button className="btn btn-primary border-0 rounded-1 mb-4 m-1" style={{fontSize: 16 + "px"}}><i className="fa-solid fa-plus"></i> Add new employee</button>
                                <button className="btn btn-success border-0 rounded-1 mb-4 m-1" style={{fontSize: 16 + "px"}}><i className="fa-solid fa-file-csv"></i> Add using spreadsheet</button>
                                <div className="float-end">
                                    <select className="form-select mb-4 rounded-1" aria-label="Default select example" onChange={(e) => {setFilterByDepartmentkeyword(e.target.value)  }}>
                                                <option defaultValue value="all">Select Department</option>
                                                <option value="all" >All</option>
                                                <option value="Accounting">Accounting</option>
                                                <option value="production">Production</option>
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
                                        <th scope="col">Department</th>
                                        <th scope="col">Designation</th>
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
                                                    <td> <button className=" btn btn-primary rounded-1 border-0"  onClick={(e) => {setViewValue(info.employeenum)}}> <i className="fa-regular fa-eye"></i> </button>  <button className=" btn btn-secondary rounded-1 border-0"> <i className="fa-regular fa-pen-to-square"></i> </button>   </td>

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