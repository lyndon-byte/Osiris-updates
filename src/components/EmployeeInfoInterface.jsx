import React from "react";
import { useState, useEffect } from "react";
import { app } from './firebaseconfig';
import { getStorage, ref , uploadBytes , getDownloadURL } from 'firebase/storage';


const storage = getStorage(app);

function EmployeeInfoInterface(){


    const [getphoto,setGetPhoto] = useState('');

   

 return (

        
        
        <>
        
           <div className="container bg-white rounded-3 p-5" style={{marginTop: 40 + "px"}} >
              <div className="row">
                    <div className="col-lg-12 mb-5">
                        <h4 className="text-muted">Personal Info</h4>
                    </div>
                    <div className="col-lg-3 col-sm-12 ">
                        <div className="card p-3 border-0 m-auto" style={{width: 18 + "rem"}}>
                            <img src={getphoto === '' ? '/src/assets/Gallery-icon.png' : URL.createObjectURL(getphoto)} className="card-img-top w-50 m-auto"  alt="..."/>
                            <div className="card-body text-center">
                                
                                <p className="card-text">Photo ID</p>

                            </div>
                            <div className="filebtn btn btn-lg btn-outline-primary w-75 m-auto rounded-1">
                            <i className="fa-solid fa-cloud-arrow-up"></i> Upload Photo
                                <input className="fileinput" type="file" name="file" onChange={(e) => {setGetPhoto(e.target.files[0])}}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 mt-3">

                        <div className="mb-3">
                            <label htmlFor="basic-url" className="form-label">First Name</label>
                            <div className="input-group">
                                
                                <input type="text" className="form-control rounded-1" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                            <div className="form-text" id="basic-addon4">Error</div>  
                        </div>

                         
                        <div className="mb-3">
                            <label htmlFor="basic-url" className="form-label">Last Name</label>
                            <div className="input-group">
                                
                                <input type="text" className="form-control rounded-1" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                            <div className="form-text" id="basic-addon4">Error</div>  
                        </div>   

                        <div className="col-10">

                            <div className="mb-3">
                                <label htmlFor="basic-url" className="form-label">Contact Number</label>
                                <div className="input-group">
                                <span className="input-group-text bg-white border-0" id="basic-addon1">+63</span>
    
                                    <input type="text" className="form-control rounded-1" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                </div>
                                <div className="form-text" id="basic-addon4">Error</div>  
                            </div>   

                        </div>



                    </div>
                    <div className="col-lg-4 col-sm-12 mt-3 ">

                        <div className="mb-3">
                            <label htmlFor="basic-url" className="form-label">Middle Name</label>
                            <div className="input-group">
                                
                                <input type="text" className="form-control rounded-1" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                            <div className="form-text" id="basic-addon4">Error</div>  
                        </div>
                         
                        <div className="mb-3">
                            <label htmlFor="basic-url" className="form-label">Email Address</label>
                            <div className="input-group">
                                
                                <input type="text" className="form-control rounded-1" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                            <div className="form-text" id="basic-addon4">Error</div>  
                        </div>

                        
                            
                            <div className="row">

                                <div className="col-6">
                                    <label htmlFor="basic-url" className="form-label">Gender</label>
                                    <select className="form-select rounded-1" aria-label="Default select example">
                                        <option defaultValue>Select</option>
                                        <option value="1">Male</option>
                                        <option value="2">Female</option>
                                        <option value="3">Prefer not to say</option>
                                    </select>
                                    <div className="form-text" id="basic-addon4">Error</div>  
                                </div>

                                <div className="col-6">

                                    <label htmlFor="basic-url" className="form-label">Birthdate</label>
                                    <div className="input-group">
                                        
                                        <input type="date" className="form-control rounded-1 text-muted" id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                                    </div>
                                    <div className="form-text" id="basic-addon4">Error</div>

                                </div>


                            </div>
                            
                        

                        
                    </div>  
                    
              </div>
              <div className="row">

                  

              </div>
           </div>
        
        </>



    );


}


export default EmployeeInfoInterface;