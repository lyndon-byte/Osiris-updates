import React from "react";
import { useNavigate } from "react-router";
import { app } from './firebaseconfig';
import { getAuth , signOut } from "firebase/auth";
import {Form,Formik,Field, yupToFormErrors} from 'formik';
import * as Yup from 'yup';

const auth = getAuth(app);

const PostRegistrationSchema = Yup.object().shape({
    


    companyname: Yup.string().required('Required'),
    position: Yup.string().required('Required'),
    addressline: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    zipcode: Yup.string().required('Required')
    .min(4,'Must be 4 digits')
    .max(4,'Must be 4 digits'),
    



});


function PostRegistration(props){

    

    const navigate = useNavigate();

    const handleSignOut = () => {
        
        signOut(auth).then(() => {
             console.log('sign out success')
             navigate('/login');
          }).catch((error) => {
            // An error happened.
          });
          

    }

    return (

        <>

            <nav className="navbar navbar-expand-lg py-3 navbar-light bg-white fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand fs-5" href="/">
                        <img src="./src/assets/osirislogo.png" width="50"  className="align-middle me-1" alt="My Website"/>

                    </a>

                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar3" aria-controls="myNavbar3" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="lc-block collapse navbar-collapse" id="myNavbar3">

                        

                    
                    <div className="lc-block ms-auto d-grid gap-2 d-lg-block">
                    
                       <div className="col-lg-12 col-sm-12">
                        <div className="btn-group dropdown-center">


                                <button type="button" className="btn btn-outline-secondary border-1 text-dark" disabled><i className="fa-regular fa-circle-user"></i>&nbsp; {props.name}</button>
                                <button type="button" className="btn btn-secondary border-0  dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end rounded-1 p-0 ">
                                    <li><a className="dropdown-item text-muted " onClick={handleSignOut} ><i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp; Logout</a></li>
                                
                                </ul>
                            </div>
                       </div>

                    </div>
                    </div>
                </div>
                </nav>
                <div className="container" style={{marginBottom: 100 + "px"}}>
                    <div className="row">
                        <div className="col" style={{marginTop: 150 + "px"}}>
                            <div className="alert alert-primary rounded-1 p-4" role="alert">
                                <h2 className="mt-3">Hello {props.name} 😃</h2>
                                <h5>Welcome to Osiris 🎉</h5>
                                <p className="text-muted">Kindly provide your company information to start your journey with us 🚀 🚀 🚀</p>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                            <div className="col-lg-4 col-sm-12">
                                    <div className="card border-0 bg-light m-auto" style={{width: 21 + "rem"}}>
                                        <div className="card-body">
                                            <img src="./src/assets/postreg.png" width="100%"/>
                                        </div>      
                                    </div>
                            </div>
                                    <div className="col-lg-8">
                            <Formik

                                    initialValues={{

                                        companyname: '',
                                        position: '',
                                        addressline: '',
                                        state: '',
                                        city: '',
                                        zipcode: '',



                                    }}
                                    validationSchema={PostRegistrationSchema}
                                    onSubmit = {values => {

                                        const companyaddress = values.addressline + " " + values.state + " " + values.city + " " + values.zipcode + " " + "Philippines"
                                        console.log("company name: " + values.companyname + "position: " + values.position)
                                        console.log("company address: " + companyaddress)
                                    }}
                            >
                                    {({ errors, touched }) => (
 
                                        <Form>
                                                <div className="col-lg-11 rounded-4 bg-white p-5">
                                                    <div className="row mt-3">
                                                        <div className="col-l2 mb-4">
                                                            <h4 className="">Company Information</h4>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">Company name</label>
                                                                <div className="input-group">
                                                                
                                                                    <Field type="text" name="companyname" className={touched.companyname && errors.companyname ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                </div>
                                                                <div className="form-text" id="basic-addon4">{touched.companyname && errors.companyname ? <p className="text-danger">{errors.companyname}</p> : ''}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-12">
                                                            <div className="mb-3">
                                                                <label className="form-label">Your position in the company</label>
                                                                <div className="input-group">
                                                                
                                                                    <Field component="select" name="position" className={touched.position && errors.position ? 'form-select rounded-1 text-muted border-danger' : 'form-select rounded-1 text-muted'} aria-label="Default select example">

                                                                        <option value="">Select</option>
                                                                        <option value="Admin Supervisor">Admin Supervisor</option>
                                                                        <option value="HR Manager">HR Manager</option>

                                                                        <option value="Company Owner">Company Owner</option>
                                                                        <option value="CEO">CEO</option>
                                                                        <option value="Director">Director</option>
                                                                    
                                                                    </Field>

                                                                </div>
                                                                <div className="form-text" id="basic-addon4">{touched.position && errors.position ? <p className="text-danger">{errors.position}</p> : ''}</div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-l2 mb-4">
                                                            <h4 className="">Company Address</h4>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-12">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Address Line 1</label>
                                                                    <div className="input-group">
                                                                    
                                                                        <Field name="addressline" type="text" className={touched.addressline && errors.addressline ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                    </div>
                                                                    <div className="form-text" id="basic-addon4">{touched.addressline && errors.addressline ? <p className="text-danger">{errors.addressline}</p> : ''}</div>
                                                                </div>
                                                        </div>
                                                        <div className="col-lg-6 col-sm-12">
                                                                <div className="mb-3">
                                                                    <label className="form-label">Address Line 2</label>
                                                                    <div className="input-group">
                                                                    
                                                                        <input type="text" className="form-control rounded-1" placeholder="optional" aria-describedby="basic-addon3 basic-addon4"/>
                                                                    </div>
                                                                    
                                                                </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                            <div className="col-lg-6 col-sm-12">
                                                                    <div className="mb-3">
                                                                        <label className="form-label">State/Province/Region</label>
                                                                        <div className="input-group">
                                                                        
                                                                            <Field name="state" type="text" className={touched.state && errors.state ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'}  aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text" id="basic-addon4">{touched.state && errors.state ? <p className="text-danger">{errors.state}</p> : ''}</div>
                                                                    </div>
                                                            </div>
                                                            <div className="col-lg-4 col-sm-12">
                                                                    <div className="mb-3">
                                                                        <label className="form-label">City</label>
                                                                        <div className="input-group">
                                                                        
                                                                            <Field name="city" type="text" className={touched.city && errors.city ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} placeholder="" aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text" id="basic-addon4">{touched.city && errors.city ? <p className="text-danger">{errors.city}</p> : ''}</div>
                                                                    </div>
                                                            </div>
                                                            <div className="col-lg-2 col-sm-12">
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Zip Code</label>
                                                                        <div className="input-group">
                                                                        
                                                                            <Field name="zipcode" type="number"  className={touched.zipcode && errors.zipcode ? 'form-control rounded-1 border-danger' : 'form-control rounded-1'} placeholder="" aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        <div className="form-text" id="basic-addon4">{touched.zipcode && errors.zipcode ? <p className="text-danger">{errors.zipcode}</p> : ''}</div>
                                                                    </div>
                                                            </div>
                                                    </div>
                                                    <div className="row">
                                                            <div className="col-lg-4 col-sm-12">
                                                                    <div className="mb-3">
                                                                        <label className="form-label">Country</label>
                                                                        <div className="input-group">


                                                                            <input type="text" className="form-control rounded-1 text-muted" value="Philippines" disabled aria-describedby="basic-addon3 basic-addon4"/>
                                                                        </div>
                                                                        
                                                                    </div>
                                                            </div>
                                                        
                                                    </div>
                                                    <div className="row">
                                                            <div className=" mt-4 d-flex justify-content-end">
                                                                <button className="btn btn-secondary border-0 rounded-1" type="submit"> Submit</button>
                                                            </div>
                                                    </div>
                                                </div>
                                        </Form>
                                     )}
                                </Formik>
                            </div>
                    </div>
                </div>

        </>


    );


}


function DashboardFooter(){

    return (

        <>

          <section>

                <div className="container-fluid bg-white">
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


function Dashboard(){

    const user = auth.currentUser;

    return (
        <>
            <PostRegistration name={user.displayName}/>
            <DashboardFooter/>
        </>
    );

}

export default Dashboard;