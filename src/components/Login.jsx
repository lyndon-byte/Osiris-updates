import React from 'react';
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../login.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Link} from "react-router-dom"
import {useState} from 'react'
import { app } from "./firebaseconfig";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app)


const LoginSchema = Yup.object().shape({


    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().required('Required')


});


function LoginForm(){

    const [eyedisplay,seteyedisplay] = useState(false);
    const [pwordtype,setpwordtype] = useState(false);
    const [loginstatus,setloginstatus] = useState(false);

    const provider = new GoogleAuthProvider;

    const navigate = useNavigate();

    const handleClose = () => setloginstatus(false)

    const loginwithgoogle = () => {

        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            console.log(user.providerId)
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });


    }

    function showpassword(){
        
        if(eyedisplay === false){

            seteyedisplay(true)
            setpwordtype(true)

        }else{

            seteyedisplay(false)
            setpwordtype(false)
        }
       

    }

  

    function LoginFailedAlert(){

        return (
     
             <>
                 

                 <Modal
                     show={loginstatus}
        
                     backdrop="static"
                     keyboard={false}
                    
                 >
                    
                     <Modal.Body className='text-center rounded-1 border-0'  >
                        <p className='mt-5 text-danger'>Login Failed!</p>
                     </Modal.Body>
                     <Modal.Footer className='border-0 rounded-1 p-4'>
                        
                        <Button variant="danger" className='rounded-1 m-auto w-25 border-0 mb-3' onClick={handleClose}>
                            Try Again
                        </Button>
                       
                     </Modal.Footer>
                 </Modal>
     
     
     
         </>
     
         );
     
       }

    return(

        <>

            <LoginFailedAlert></LoginFailedAlert>

             <div className="container">
        

                    <div className="row">
                    
                            <div className="col-lg-12 col-sm-12">
                               
                                <div className="card border-0 shadow " style={{width: 20 + 'rem',margin: 'auto',marginTop: 220 + 'px',marginBottom: 200 + 'px'}}>

                                    <img src="https://i.ibb.co/thg7R8F/osirislogo.png" className="card-img-top w-25 m-auto mt-5" alt="..."/>
                                    <div>
                                    
                                        <div className='text-center'>
                                        <h5 className="card-title text-muted">Admin Login</h5>
                                        </div>
                                        
                                        <Formik

                                                initialValues={{

                                                    email: '',
                                                    password:''

                                                }}
                                                validationSchema={LoginSchema}
                                                onSubmit={values =>{

                                                                                              

                                                    const email = values.email;
                                                    const password = values.password;

                                                         signInWithEmailAndPassword(auth, email, password)
                                                        .then((userCredential) => {
                                                            // Signed in 
                                                            const user = userCredential.user;
                                                            navigate('/dashboard/reporting')
                                                        })
                                                        .catch((error) => {
                                                            
                                                            const errorCode = error.code;
                                                            const errorMessage = error.message;
                                                            setloginstatus(true);

                                                        });

                                                        
                                                }}
                                                >
                                                {({errors,touched})=>(
                                                     
                                                    <Form>

                                                        <div className="card-body" style={{padding: 40 + 'px'}}>

                                                            <div className="input-group mb-3">
                                                            
                                                                <Field name="email" id="uname" className={touched.email &&  errors.email ? 'form-control rounded-0 border-0 border-bottom border-danger' :'form-control rounded-0 border-0 border-bottom '} placeholder="Email Address" aria-label="Username" aria-describedby="basic-addon1"/>
                                                                
                                                            </div>
                                                            {touched.email &&  errors.email && <p className='text-danger emailerrormsg'>{errors.email}</p>}


                                                            <div className="input-group mb-3 ">

                                                                <Field type={pwordtype? 'text' : 'password'} name="password" id="pword" className={touched.password &&  errors.password ? 'form-control rounded-0 border-0 border-bottom border-danger' :'form-control rounded-0 border-0 border-bottom '} placeholder="Password" aria-label="Username" aria-describedby="basic-addon1"/>
                                                                <span className={touched.password && errors.password ? 'input-group-text rounded-0 border-0 bg-white border-bottom border-danger' : 'input-group-text rounded-0 border-0 bg-white border-bottom'} id="basic-addon1"><i className={eyedisplay? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'}  onClick={showpassword}></i></span>

                                                            </div>
                                                            {touched.password && errors.password && <p className='text-danger pworderrormsg'>{errors.password}</p>}

                                                            <button type='submit'  className="btn btn-primary w-100 border-0 rounded-1 mt-4">Login</button>
                                                            
                                                        </div>

                                                    </Form>
                                                            

                                                )}


                                        </Formik>
                                       
                                        <div className='text-center'>
                                            <p style={{fontSize: 14 + 'px'}}>You don't have account? <a href="/register">Register</a></p>
                                            <p className="mt-2 mb-5" style={{fontSize: 14 + 'px'}}><Link to="/register" className="text-success">Forgot your Password?</Link></p>
                                        </div>                                                                                                    
                                          
                                    </div>
                                    
                                </div>
                            </div>

                    </div>

               </div>
                
        
        </>


    );

}


function Login(){

    return(

        <>
        
               <Navbar activecolor='btn btn-primary border-0 rounded-1' inactivecolor ='btn link-secondary bg-white rounded-1'></Navbar>
               <LoginForm></LoginForm>
               <Footer></Footer>
        </>


    );




}



export default Login;
