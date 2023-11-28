import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {useState} from 'react'
import '../register.css';
import {Form,Formik,Field} from 'formik';
import * as Yup from 'yup';
import {ref} from 'yup';
import { useNavigate } from "react-router-dom";
import { app } from './firebaseconfig';
import { getAuth, sendEmailVerification, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


const auth = getAuth(app);

const actionCodeSettings = {

    url: 'https://osiris-3670f.firebaseapp.com'

    
  };

const RegistrationSchema = Yup.object().shape({
    


    firstname: Yup.string().required('Required'),
    lastname: Yup.string().required('Required'),
    contactnumber: Yup.string().required('Required')
    .min(10,'Must be 10 digits')
    .max(10,'Must be 10 digits'),
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string()
    .required('Please Enter your password')
    .matches(/[0-9]/, "Must contain number")
    .matches(/[A-Z]/, "Must contain uppercase letter")
    .matches( /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "Must contain special character"),
    confirmpassword: Yup.string()
    .required("Please re-type your password")
    .oneOf([ref("password")], "Passwords does not match"),


});


function RegistrationForm(){
    
    const navigate = useNavigate(); 

    const [passwordeye1,setpasswordeye1] = useState(false);
    const [passwordeye2,setpasswordeye2] = useState(false);
    const [screenloading,setscreenloading] = useState(false);
    


    function showpassword(){

        if(passwordeye1 === false){

            setpasswordeye1(true)

        }else if(passwordeye1 === true){

            setpasswordeye1(false)

        }

    }

    function showconfirmpassword(){

       
        if(passwordeye2 === false){

            setpasswordeye2(true)

        }else if(passwordeye2 === true){

            setpasswordeye2(false)

        }

    }


   if (screenloading){


        return (

            <>
                
                <div className="container" style={{marginTop: 400 + "px", marginBottom: 500 + "px"}}>
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
                <div className="row" style={{marginTop: 190 + "px",marginBottom: 200 + "px"}} >
               
                    <div className="col-lg-6 col-sm-12 mt-5" >
                        <img src="https://img.freepik.com/free-vector/recruiting-professionals-studying-candidate-profiles_1262-21404.jpg"   width="100%" alt=""  />
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="text-center">
                            <h5>Create an admin account</h5>
                        </div>

                        <div className="card m-auto border-0 mt-4" style={{width: 21 + 'rem'}}>
                      
                            <div className="card-body p-4">
                            <Formik

                                    initialValues={{

                                        firstname:'',
                                        lastname:'',
                                        contactnumber:'',
                                        email: '',
                                        password:'',
                                        confirmpassword:''
                                    }}
                                    validationSchema={RegistrationSchema}
                                    onSubmit={values =>{
                                        
                                       
                                       
                                        const fname = values.firstname;
                                        const lname = values.lastname;
                                        const pnumber = values.contactnumber;
                                        const useremail = values.email;
                                        const pword = values.password;
                                        const fullname = values.firstname + " " + values.lastname
                                      
                                        
                                                                                   
                                        localStorage.setItem('registeredemail',useremail);
                                        localStorage.setItem('firstname',fname);
                                        localStorage.setItem('lastname',lname);
                                        localStorage.setItem('phonenumber',pnumber);
                                        localStorage.setItem('password',pword);
                                        
                                        setscreenloading(true);
                                        
                                        
                                        createUserWithEmailAndPassword(auth, useremail, pword)
                                        .then((userCredential) => {
                                           
                                            
                                            
                                            updateProfile(auth.currentUser, {
                                                displayName: fullname, 
                                               
                                            }).then(() => {
                                        
                                                sendEmailVerification(auth.currentUser, actionCodeSettings)
                                                .then(() => {
                                                    
                                                    navigate('/emailverification');
                                                    console.log('email verification was already sent!');
                                                    
                                                });
                                        
                                            }).catch((error) => {
                                            
                                            });

                                           

                                        })
                                        .catch((error) => {

                                            const errorCode = error.code;
                                            const errorMessage = error.message;
                                            alert('The email ' + useremail + ' was already taken')
                                            setscreenloading(false);

                                        });



                                    

                                    }}
                                    >
                                    {({errors,touched})=>(

                                        <Form>
                                            
                                                    <div className="mb-3">
                                                        
                                                        <label className="form-label">First Name</label>
                                                        <div className="input-group">

                                                            <Field type="text" name="firstname" className={touched.firstname && errors.firstname ? 'form-control rounded-1 border-danger': 'form-control rounded-1'} id="fname" aria-describedby="basic-addon3 basic-addon4"/>

                                                        </div>
                                                        <div className="form-text text-danger" id="basic-addon4">{touched.firstname && errors.firstname ? <p>{errors.firstname}</p> : ''}</div>
                                                        
                                                    </div>
                                                    <div className="mb-3">
                                                        
                                                        <label className="form-label">Last Name</label>
                                                        <div className="input-group">

                                                            <Field type="text" name="lastname" className={touched.lastname && errors.lastname ? 'form-control rounded-1 border-danger': 'form-control rounded-1'} aria-describedby="basic-addon3 basic-addon4"/>

                                                        </div>
                                                        <div className="form-text text-danger" id="basic-addon4">{touched.lastname && errors.lastname ? <p>{errors.lastname}</p> : ''}</div>
                                                        
                                                    </div>
                                                    
                                                    <div className="mb-3">
                                                        
                                                        <label className="form-label">Contact Number</label>
                                                        <div className="input-group">
                                                            <span className="input-group-text border-0 bg-white">+63</span>
                                                            <Field type="number" name="contactnumber" className={touched.contactnumber && errors.contactnumber ? 'form-control rounded-1 border-danger': 'form-control rounded-1'} aria-describedby="basic-addon3 basic-addon4"/>

                                                        </div>
                                                        <div className="form-text text-danger" id="basic-addon4">{touched.contactnumber && errors.contactnumber ? <p>{errors.contactnumber}</p> : ''}</div>
                                                        
                                                    </div>
                                                    <div className="mb-3">
                                                        
                                                        <label className="form-label">Email Address</label>
                                                        <div className="input-group">
                                                        
                                                            <Field type="email" name="email" className={touched.email && errors.email ? 'form-control rounded-1 border-danger': 'form-control rounded-1'} id="emailinput" aria-describedby="basic-addon3 basic-addon4"/>

                                                        </div>
                                                        <div className="form-text text-danger" id="basic-addon4">{touched.email && errors.email ? <p>{errors.email}</p> : ''}</div>
                                                        
                                                    </div>
                                                    <div className="mb-3">
                                                        
                                                        <label className="form-label">Password</label>
                                                        <div className="input-group">
                                                        
                                                            <Field type={passwordeye1 ? 'text' : 'password'} name="password" className={touched.password && errors.password ? 'form-control rounded-1 border-danger': 'form-control rounded-1'} id="pwordinput1" aria-describedby="basic-addon3 basic-addon4"/>
                                                            <span className="input-group-text bg-white" onClick={showpassword}  id="pwordeye1"><i className={passwordeye1 ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}></i></span>
                                                        </div>
                                                        <div className="form-text text-danger" id="basic-addon4">{touched.password && errors.password ? <p>{errors.password}</p> : ''}</div>
                                                        
                                                    </div>
                                                    <div className="mb-3">
                                                        
                                                        <label className="form-label">Confirm Password</label>
                                                        <div className="input-group">
                                                        
                                                            <Field type={passwordeye2 ? 'text' : 'password'} name="confirmpassword" className={touched.confirmpassword && errors.confirmpassword ? 'form-control rounded-1 border-danger': 'form-control rounded-1'} id="pwordinput2" aria-describedby="basic-addon3 basic-addon4"/>
                                                            <span className="input-group-text bg-white" id="pwordeye2" onClick={showconfirmpassword}><i className={passwordeye2? 'fa-solid fa-eye': 'fa-solid fa-eye-slash'}></i></span>
                                                        </div>
                                                        <div className="form-text text-danger" id="basic-addon4">{touched.confirmpassword && errors.confirmpassword ? <p>{errors.confirmpassword}</p> : ''}</div>
                                                        
                                                    </div>
                                                    <button type="submit" className="btn btn-primary w-100 mt-2 border-0 rounded-1 mt-3">Submit</button>
                                                            

                                        </Form>


                                    )}


                                    </Formik>
                                                                
                               
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>

        
        </>




    );

   }





}







function Register(){
    
  
   return(

        <>
      
        <Navbar activecolor='btn link-secondary bg-white' inactivecolor ='btn btn-primary border-0 rounded-1'></Navbar>
        <RegistrationForm></RegistrationForm>
        <Footer></Footer>
        
        </>


    );




}



export default Register;