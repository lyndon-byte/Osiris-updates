import React from "react";

export default function Employee (){


    return (

        
        
        <>

                <div className="container mt-5">
                    <div className="row" style={{marginBottom: 80 + "px"}}>
                        <div className="col-lg-7 col-sm-12 m-auto">
                            <div className="alert alert-primary p-5" data-bs-theme="dark" role="alert">
                                <span>Number of Active Employees</span>
                                <i className="fa-solid fa-people-group float-end text-white mt-3" style={{fontSize: 40 + "px"}}></i>
                                <h1 className="text-white">74</h1>

                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-12 m-auto">
                            <div className="alert alert-primary" style={{fontSize: 15 + "px"}} role="alert">
                            <i className="fa-solid fa-circle-info"></i> Search employee using their name or ID #
                            </div>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2 rounded-1" type="search" placeholder="Search Employee" aria-label="Search"/>
                                <button className="btn btn-secondary w-50 border-0 rounded-1" type="submit"><i className="fa-solid fa-magnifying-glass"></i> Search</button>
                            </form>
                        </div>
                    </div>
                    <div className="row mt-5">

                        <div className="col-lg-12 col-sm-12 float-start">
                                <button className="btn btn-primary border-0 rounded-1 mb-4 m-1" style={{fontSize: 16 + "px"}}><i className="fa-solid fa-plus"></i> Add new employee</button>
                                <button className="btn btn-success border-0 rounded-1 mb-4 m-1" style={{fontSize: 16 + "px"}}><i className="fa-solid fa-file-csv"></i> Add using spreadsheet</button>
                                <div className="float-end">
                                    <select class="form-select mb-4 rounded-1" aria-label="Default select example">
                                                <option selected>Select Department</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
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

                                    <tr className="p-5 data-row"  style={{lineHeight: 40 + "px"}}>
                                        <th scope="row" className="data-row" >00001</th>
                                            <td className="data-row">Mark</td>
                                            <td className="data-row"> Otto</td>
                                            <td className="data-row">@mdo</td>
                                            <td className="data-row">@twitter</td>
                                        <td> <button className=" btn btn-primary rounded-1 border-0"> <i className="fa-regular fa-eye"></i> </button>  <button className=" btn btn-secondary rounded-1 border-0"> <i className="fa-regular fa-pen-to-square"></i> </button>   </td>
                                    </tr>
                                
                                    
                                </tbody>
                            </table>    

                        </div>
                        <div className="col-lg-12 mt-2">
                            <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Previous">
                                        <i class="fa-solid fa-arrow-left"></i>
                                        </a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                        <a className="page-link" href="#" aria-label="Next">
                                        <i class="fa-solid fa-arrow-right"></i>
                                        </a>
                                        </li>
                                    </ul>
                            </nav>             
                        </div>
                    </div>
                     
                </div>
           
        </>



    );


}