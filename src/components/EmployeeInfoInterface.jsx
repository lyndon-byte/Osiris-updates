import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from "react";
import { app } from './firebaseconfig';
import { getStorage, ref , uploadBytes , getDownloadURL } from 'firebase/storage';
import  *  as Yup from 'yup';
import { Formik, Form ,Field } from "formik";
import { getFirestore, doc ,setDoc, getDoc, collection , query, where, getCountFromServer} from "firebase/firestore";
import { useNavigate } from "react-router";
import { Link } from 'react-router-dom'
import {getAuth} from 'firebase/auth'
import { async } from "@firebase/util";


const storage = getStorage(app);

const auth = getAuth(app);

const db = getFirestore(app);

const addEmployeeSchema = Yup.object().shape({


    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    emailaddress: Yup.string().required('Required')
    .email('Invalid Email'),
    contactnumber: Yup.string().required('Required')
    .min(10, 'must be 10 digits')
    .max(10, 'must be 10 digits'),
    addressline: Yup.string().required('Required'),
    province: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    postalcode: Yup.string().required('Required')
    .min(4, 'must be 4 digits')
    .max(4, 'must be 4 digits'),
    salaryrate: Yup.string().required('Required'),
    startdate: Yup.string().required('Invalid Date'),
    sss: Yup.string().required('Required'),
    philhealth: Yup.string().required('Required'),
    pagibig: Yup.string().required('Required'),
    tin: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    birthdate: Yup.string().required('Invalid Date'),
    designation: Yup.string().required('Required'),
    department: Yup.string().required('Required')
})


function EmployeeInfoInterface(){


    const [getphoto,setGetPhoto] = useState('');

    const [getphotoforviewing,setGetPhotoForViewing] = useState('')

    const [idnumber,setIdNumber] = useState(0);

    const [newidnumber,setNewIdnumber] = useState(0);

    const [screenloading, setscreenloading] = useState(false)

    const [employeeAddedModal,setEmployeeAddedModal] = useState(false)

    const navigate = useNavigate();

    const user = auth.currentUser

    const fetchEmployeesDocument = async () => {


        const q = query(collection(db,"miniusers"),where("administrator", "==", user.email))

            const dataCount = await getCountFromServer(q);

            setIdNumber(dataCount.data().count + 1 )
            setNewIdnumber(idnumber.toString().padStart(6,'0'))
    }
    
    fetchEmployeesDocument();


    const addemployeeagain = () => {

        setscreenloading(false);
        setGetPhoto('');
    }

    useEffect(() =>  {

        if(getphoto !== ""){


            try {
                
                setGetPhotoForViewing(URL.createObjectURL(getphoto))

            } catch (error) {
                
                console.log(error)
            }


        }


    },[getphoto])

    
    function EmployeeAddedModal(){

        return (
     
             <>
                 

                 <Modal
                     show={screenloading}
        
                     backdrop="static"
                     keyboard={false}
                     style={{marginTop: 350 + "px"}}
                 >
                    
                     <Modal.Body className='text-center rounded-1 border-0'  >
                        <p className='mt-5 text-muted'>Employee was added successfully!</p>
                        <p>Go back to employees information page to view the newly added employee or add other employee again</p>
                     </Modal.Body>
                     <Modal.Footer className='border-0 rounded-1' >
                     <Button variant="primary" className='rounded-1 m-auto w-25 border-0 mb-3' onClick={addemployeeagain}>
                         Ok
                     </Button>
                     </Modal.Footer>
                 </Modal>
     
     
     
         </>
     
         );
     
       }




    if (screenloading){

        return (

        
        
            <>

                    <EmployeeAddedModal></EmployeeAddedModal>

                    <div className="container" style={{marginTop: 800 + "px", marginBottom: 500 + "px"}}>
                        <div className="row">
                            <div className="col-lg-12 col-sm-12" >
                            <div className="card bg-light border-0">
                                <div className="card-body m-auto">
                                    <div className="spinner-border text-primary m-auto" role="status">
    
                                    </div>
                                </div>
                            </div>
                                
                            </div>
                        </div>
                    </div>
    
    
                
            
            </>
    
    
    
        );

    }else{

            


        return (

            <>

            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-sm-12 mt-5 m-auto text-center">

                        <div className="alert alert-primary" role="alert">
                            Add new employee
                        </div>

                    </div>
                </div>
            </div>
        
           <div className="container bg-white rounded-3 p-5" style={{marginTop: 40 + "px", marginBottom: 100 + "px"}} >
            
                <Formik 

                    initialValues={{

                        firstname: '',
                        lastname:'',
                        emailaddress:'',
                        contactnumber:'',
                        gender: '',
                        birthdate: '',
                        addressline:'',
                        addressline2:'',
                        province:'',
                        city:'',
                        postalcode:'',
                        salaryrate:'',
                        designation: '',
                        department:'',
                        startdate: '',
                        sss:'',
                        philhealth: '',
                        tin:'',
                        pagibig:'',
                        
                      


                    }}
                    validationSchema={addEmployeeSchema}
                    onSubmit={values  =>{

                        
                        const addEmployee  = async () => {


                            setscreenloading(true);

                            const photoStorageRef = ref(storage, `${user.email}/${newidnumber}`);

                            uploadBytes(photoStorageRef, getphoto).then((snapshot) => {
                                console.log('Uploaded a blob or file!');
                            });

                            await setDoc(doc(db, "miniusers", values.emailaddress), {
                                
                                
                                
                                    employeenum: newidnumber,
                                    fullname: values.firstname + " " + values.lastname,
                                    email: values.emailaddress,
                                    contactnumber: values.contactnumber,
                                    gender: values.gender,
                                    birthdate: values.birthdate,
                                    address: values.addressline + " " + values.addressline2 + " " + values.province + " " + values.city + " " + "Philippines" + " " + values.postalcode,
                                    salaryrate: values.salaryrate,
                                    designation: values.designation,
                                    department: values.department,
                                    administrator: user.email,
                                    startdate: values.startdate,
                                    sssid: values.sss,
                                    philhealthid: values.philhealth,
                                    tinid: values.tin,
                                    pagibigid: values.pagibig,


                                   

                                   
                                

                            });

                           
                           
                            console.log('data was added!')
                            
                            
                        }
                        
                        
                       if (getphoto !== ""){

                            addEmployee();

                       }else {

                            alert('Please upload employee picture')

                       }





                    }}
                >
                    {({errors,touched}) => (


                        <Form>  

                                    {console.log(errors)}

                                    <div>
                                        <div className="row">
                                                <div className="col-lg-12 mb-5">
                                                    <h4 className="text-muted text-center">Personal Info</h4>
                                                </div>
                                                <div className="col-lg-4 col-sm-12">
                                                    <div className="card p-3 border-0 m-auto" style={{width: 18 + "rem"}}>
                                                        <img src={getphoto === '' ? '/src/assets/Gallery-icon.png' :  getphotoforviewing} className="card-img-top m-auto w-75"  alt="..."/>
                                                        <div className="card-body text-center">
                                                            


                                                        </div>
                                                        <div className="filebtn btn btn-lg btn-outline-primary w-75 m-auto rounded-1">
                                                        <i className="fa-solid fa-cloud-arrow-up"></i> Upload Photo
                                                            <input className="fileinput" type="file" name="file" onChange={(e) => {setGetPhoto(e.target.files[0])}}/>
                                                        </div>
                                                        <div className="col text-center mt-3">
                                                            <p className="text-muted">ID#: {newidnumber}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            <div className="col-lg-8">
                                                    
                                                    <div className="row">

                                                            <div className="col-lg-5 mt-3   ">
                                                                <div className="mb-3">
                                                                    <label className="form-label">First Name</label>
                                                                    <div className="input-group">
                                                                        
                                                                        <Field name="firstname" type="text" className={touched.firstname && errors.firstname ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                    </div>
                                                                    <div className="form-text text-danger" id="basic-addon4">{touched.firstname && errors.firstname && <p>{errors.firstname}</p>}</div>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-5 mt-3 ">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Last Name</label>
                                                                    <div className="input-group">
                                                                        
                                                                        <Field name="lastname" type="text" className={touched.lastname && errors.lastname ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                    </div>
                                                                    <div className="form-text text-danger" id="basic-addon4">{touched.lastname && errors.lastname && <p>{errors.lastname}</p>}</div>
                                                                </div>

                                                            </div>
                                                            <div className="col-lg-5 mt-3 ">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Email Address</label>
                                                                    <div className="input-group">
                                                                        
                                                                        <Field name="emailaddress" type="text" className={touched.emailaddress && errors.emailaddress ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                    </div>
                                                                    <div className="form-text text-danger" id="basic-addon4">{touched.emailaddress && errors.emailaddress && <p>{errors.emailaddress}</p>}</div>
                                                                </div>

                                                            </div>
                                                            <div className="col-lg-5 mt-3 ">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Contact Number</label>
                                                                    <div className="input-group">
                                                                        <span className="input-group-text border-0 bg-white">+63</span>

                                                                        <Field name="contactnumber" type="text"  className={touched.contactnumber && errors.contactnumber ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                    </div>
                                                                    <div className="form-text text-danger" id="basic-addon4">{touched.contactnumber && errors.contactnumber && <p>{errors.contactnumber}</p>}</div>
                                                                </div>

                                                            </div>    
                                                            <div className="col-lg-3 col-sm-12 mt-3 ">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Birthdate</label>
                                                                    <div className="input-group">


                                                                        <Field name="birthdate" type="date" className={touched.birthdate && errors.birthdate ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                    </div>
                                                                    <div className="form-text text-danger" id="basic-addon4">{ touched.birthdate && errors.birthdate && <p>{ errors.birthdate }</p> }</div>
                                                                </div>

                                                            </div>
                                                            <div className="col-lg-4 col-sm-12 mt-3 ">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Gender</label>
                                                                    <div className="input-group">


                                                                        <Field component="select" name="gender" className={touched.gender && errors.gender ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} aria-label="Default select example">
                                                                            <option value="" defaultValue>Select</option>
                                                                            <option value="Male">Male</option>
                                                                            <option value="Female">Female</option>
                                                                            <option value="Not mentioned">Prefer not to say</option>
                                                                        </Field>

                                                                    </div>
                                                                    <div className="form-text text-danger" id="basic-addon4">{touched.gender && errors.gender && <p>{errors.gender}</p>}</div>
                                                                </div>

                                                            </div>        
                                                    </div>

                                            </div>

                                        </div>
                                        <div className="row">
                                                <div className="col-lg-10 m-auto">
                                                    <div className="row">
                                                        <div className="col-lg-4 m-auto">
                                                                <div className="mb-3">
                                                                        <label className="form-label">Address Line 1</label>
                                                                        <div className="input-group">
                                                                                <Field name="addressline" type="text" className={touched.addressline && errors.addressline ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text text-danger" id="basic-addon4">{touched.addressline && errors.addressline && <p>{errors.addressline}</p>}</div>
                                                                </div>
                                                        </div>
                                                        <div className="col-lg-4 m-auto">
                                                                <div className="mb-3">
                                                                        <label className="form-label">Address Line 2</label>
                                                                        <div className="input-group">
                                                                                <input type="text" className="form-control rounded-1"  placeholder="optional" aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>

                                                                </div>
                                                        </div>
                                                        <div className="col-lg-4 m-auto">
                                                                <div className="mb-3">
                                                                        <label className="form-label">State/Province</label>
                                                                        <div className="input-group" style={{width: 290 + "px"}}>
                                                                                <Field name="province" type="text"className={touched.province && errors.province ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text text-danger" id="basic-addon4">{touched.province && errors.province && <p>{errors.province}</p>}</div>
                                                                </div>
                                                        </div>
                                                        <div className="col-lg-4 m-auto">
                                                                <div className="mb-3">
                                                                        <label className="form-label">City</label>
                                                                        <div className="input-group">
                                                                                <Field name="city" type="text" className={touched.city && errors.city ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text text-danger" id="basic-addon4">{touched.city && errors.city && <p>{errors.city}</p>}</div>
                                                                </div>
                                                        </div>
                                                        <div className="col-lg-4 m-auto">
                                                                <div className="mb-3">
                                                                        <label className="form-label">Country</label>
                                                                        <div className="input-group">
                                                                                <input type="text" className="form-control rounded-1" value="Philippines" aria-describedby="basic-addon3 basic-addon4" disabled/>
                                                                        </div>
                                                                        
                                                                </div>
                                                        </div>
                                                        <div className="col-lg-4 m-auto ">
                                                                <div className="mb-3">
                                                                        <label className="form-label">Postal Code</label>
                                                                        <div className="input-group w-50">
                                                                                <Field name="postalcode" type="text" className={touched.postalcode && errors.postalcode ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} placeholder="0000" aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text text-danger" id="basic-addon4">{touched.postalcode && errors.postalcode && <p>{errors.postalcode}</p>}</div>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12 mt-5 text-center">

                                            <h4 className="text-muted">Work Info</h4>

                                            </div>
                                            <div className="col-lg-10 m-auto mt-5">
                                                    <div className="row">
                                                        <div className="col-lg-4 m-auto">
                                                                <div className="mb-3">
                                                                        <label className="form-label">Salary Rate/Monthly-In Pesos</label>
                                                                        <div className="input-group">
                                                                                <Field name="salaryrate" type="number" className={touched.salaryrate && errors.salaryrate ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text text-danger" id="basic-addon4">{touched.salaryrate && errors.salaryrate && <p>{errors.salaryrate}</p>}</div>
                                                                </div>
                                                        </div>
                                                        <div className="col-lg-4 m-auto">
                                                                <div className="mb-3">
                                                                        <label className="form-label">Starting Date</label>
                                                                        <div className="input-group">
                                                                                <Field name="startdate" type="date" className={touched.startdate && errors.startdate ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  placeholder="optional" aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text text-danger" id="basic-addon4">{ touched.startdate && errors.startdate && <p>{errors.startdate}</p> }</div>
                                                                </div>
                                                        </div>
                                                        <div className="col-lg-4 m-auto">
                                                                <div className="mb-3">
                                                                        <label className="form-label">Position</label>
                                                                        <div className="input-group">
                                                                                <Field name="designation" type="text" className={touched.designation && errors.designation ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text text-danger" id="basic-addon4">{touched.designation && errors.designation && <p>{errors.designation}</p>}</div>
                                                                </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                        <label className="form-label">Department</label>
                                                                        <div className="input-group">
                                                                            <Field component="select" name="department" className={touched.department && errors.department ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} aria-label="Default select example">
                                                                                <option value="" defaultValue>Select</option>
                                                                                <option value="Accounting">Accounting</option>
                                                                                <option value="Production">Production</option>
                                                                                <option value="Marketing">Marketing</option>
                                                                            </Field>
                                                                        </div>
                                                                        <div className="form-text text-danger" id="basic-addon4">{touched.department && errors.department && <p>{errors.department}</p>}</div>
                                                                </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                                <div className="mb-3">
                                                                        <label className="form-label">Administrator</label>
                                                                        <div className="input-group" >
                                                                                <input type="text" className="form-control rounded-1" value="cuarterolyndon06@gmail.com" aria-describedby="basic-addon3 basic-addon4" disabled/>
                                                                        </div>
                                                                    
                                                                </div>
                                                        </div>
                                                        
                                                       
                                                        
                                                    </div>
                                                    <div className="row mt-5">
                                                        <h4 className="mt-5 mb-5 text-center text-muted">
                                                            Government Benefits
                                                        </h4>
                                                        <div className="col-lg-4 m-auto">
                                                                    <div className="mb-3">
                                                                            <label className="form-label">SSS</label>
                                                                            <div className="input-group">
                                                                                    <Field name="sss" type="text" className={touched.sss && errors.sss ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} aria-describedby="basic-addon3 basic-addon4"/>
                                                                            </div>
                                                                            <div className="form-text text-danger" id="basic-addon4">{touched.sss && errors.sss && <p>{errors.sss}</p>}</div>
                                                                    </div>
                                                            </div>
                                                            <div className="col-lg-4 m-auto">
                                                                    <div className="mb-3">
                                                                            <label className="form-label">Philhealth</label>
                                                                            <div className="input-group">
                                                                                    <Field name="philhealth" type="text" className={touched.philhealth && errors.philhealth ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4" />
                                                                            </div>
                                                                            <div className="form-text text-danger" id="basic-addon4">{touched.philhealth && errors.philhealth && <p>{errors.philhealth}</p>}</div>
                                                                    </div>
                                                            </div>
                                                            <div className="col-lg-4 m-auto ">
                                                                    <div className="mb-3">
                                                                            <label className="form-label">PAG-IBIG</label>
                                                                            <div className="input-group">
                                                                                    <Field name="pagibig" type="text" className={touched.pagibig && errors.pagibig ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} aria-describedby="basic-addon3 basic-addon4"/>
                                                                            </div>
                                                                            <div className="form-text text-danger" id="basic-addon4">{touched.pagibig && errors.pagibig && <p>{errors.pagibig}</p>}</div>
                                                                    </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                    <div className="mb-3">
                                                                            <label className="form-label">TIN</label>
                                                                            <div className="input-group">
                                                                                    <Field name="tin" type="text" className={touched.tin && errors.tin ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} aria-describedby="basic-addon3 basic-addon4"/>
                                                                            </div>
                                                                            <div className="form-text text-danger" id="basic-addon4">{touched.tin && errors.tin && <p>{errors.tin}</p>}</div>
                                                                    </div>
                                                            </div>
                                                            <div className="col-lg-12 col-sm-12">

                                                                 <button type="submit" className="btn btn-primary float-end border-0 rounded-1 mt-4">Submit</button>

                                                            </div>
                                                    </div>
                                            </div>
                                        </div>

                                    </div>

                        </Form>

                    )}

                        

                </Formik>

           </div>

            
            
            </>

        );





    }


    


}


export default EmployeeInfoInterface;