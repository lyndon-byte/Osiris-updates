import React from "react";
import AddReports from "./AddReports";
export default function Performance (){


    return (

        
        
        <>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="alert alert-primary mt-5 " style={{fontSize: 20 + "px"}} data-bs-theme="dark" role="alert">
                                Quality and Productivity Performance Monitoring  <i className="fa-solid fa-rocket text-white"></i> <i class="fa-solid fa-gauge text-white"></i>
                            </div>
                        </div>
                        <div className="col-lg-12 col-sm-12 m-auto">
                            <AddReports></AddReports>
                        </div>
                    </div>
                </div>
            
        </>



    );


}