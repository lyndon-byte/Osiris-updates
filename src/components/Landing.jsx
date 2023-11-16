import React from 'react';
import {Link} from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'


function Hero(){

    return (

      <>

          <div className="container col-xxl-8 px-4 py-5 mt-5">
                  <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                      <div className="col-10 col-sm-8 col-lg-6" id='heroimg'>
                          <img src="https://upraise.io/wp-content/uploads/2022/12/10-Functions-of-Human-Resource-Management-banner2.webp"  className="d-block mx-lg-auto img-fluid" alt="" loading="lazy"/>
                      </div>
                      <div className="col-lg-6">
                          <div className="lc-block mb-3 ">
                              <div editable="rich">
                                  <h2 className="fw-bold " id='headerhero'>Your Bridge to HR Success</h2>
                              </div>
                          </div>

                          <div className="lc-block mb-3">
                              <div editable="rich">
                                  <p className="lead">Inspiring Growth, One HR Step at a Time
                                  </p>
                              </div>
                          </div>

                          <div className="lc-block d-grid gap-2 d-md-flex justify-content-md-star">
                              <a className="btn btn-primary px-4 me-md-2 border-0 rounded-1" id="loginherobtn" href="/login" role="button">Login</a>
                              <a className="btn btn-outline-secondary px-4 text-white border-0 rounded-1" href="/register" role="button">Register</a>
                          </div>

                      </div>
                  </div>
              </div>

      
      </>


    );





}


function Features(){



  return (

      <>
      
          <section className="position-relative py-6 overflow-hidden" style={{background: '#61a9f1'}}>







                  <div className="container">
                      <div className="row row-cols-1 row-cols-lg-2 g-4 g-md-5">
                          <div className="col px-lg-6">
                              <div className="card card-body border-0 text-light  p-md-6 rounded-3 " id="feature1" style={{background: "#16457a"}}>

                                  <div className="lc-block d-flex justify-content-center align-items-center mb-5 rounded wp-image-32811 bg" id="imgfeature1" style={{width: 96 + 'px', height: 96 + 'px'}}>

                                      <img src="https://cdn-icons-png.flaticon.com/512/1205/1205514.png"  width='100%' alt=""  />
                                  </div>
                                  <div className="lc-block">
                                      <div editable="rich">

                                          <h4 className="fw-bold">Improve efficiency</h4>

                                          <p className="">By automating tedious admin tasks, your team can focus on bigger projects.</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col px-lg-6 position-relative">

                              <div className="card card-body border-0 text-light  p-md-6 rounded-3" id="feature2" style={{background: "#16457a"}}>
                                  <div className="lc-block d-flex justify-content-center align-items-center mb-5 rounded " id="imgfeature2" style={{width: 96 + 'px', height: 96 + 'px'}}>
                                   
                                  <img src="https://cdn-icons-png.flaticon.com/512/9399/9399635.png"  width='100%' alt=""  />

                                  </div>
                                  <div className="lc-block">
                                      <div editable="rich">

                                          <h4 className=" fw-bold">Improve accuracy</h4>

                                          <p className="">Removing tedious, recurring tasks helps eliminate the possibility of human error.</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col px-lg-6">
                              <div className="card card-body border-0 text-light p-md-6 rounded-3"  id="feature3" style={{background: "#16457a"}}>
                                  <div className="lc-block d-flex justify-content-center align-items-center mb-5 rounded"  id="imgfeature3" style={{width: 96 + 'px', height: 96 + 'px'}}>

                                  <img src="https://cdn-icons-png.flaticon.com/512/3770/3770273.png" width='100%' alt=""  />

                                  </div>
                                  <div className="lc-block">
                                      <div editable="rich">

                                          <h4 className="fw-bold">Improve transparency</h4>

                                          <p className="">Employees can access their own records and see what kind of data is being stored.</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col px-lg-6">
                              <div className="card card-body border-0 text-light p-md-6 rounded-3" id="feature4" style={{background: "#16457a"}}>
                                  <div className="lc-block d-flex justify-content-center align-items-center mb-5 rounded " id="imgfeature4" style={{width: 96 + 'px', height: 96 + 'px'}}>

                                  <img src="https://cdn-icons-png.flaticon.com/512/4319/4319183.png"  width='100%' alt=""  />

                                  </div>
                                  <div className="lc-block">
                                      <div editable="rich">

                                          <h4 className=" fw-bold">Improve Security</h4>

                                          <p className="">Storing employee data in one location minimizes the oppurtunities for a data breach.</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>



          </section>

      
      </>


  );




}


function Pricing(){

    return(
        
        <>
        
                <div className="container pb-5">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <div className="lc-block mb-4">
                                    <h1 editable="inline" className="mb-0 mt-5" ><b id="pricingheader">Pricing</b></h1>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4 text-center">
                            <div className="col-lg-4 col-md-6 text-dark my-2 ">
                                <div className="card border-0 bg-white">
                                    <div className="card-header  bg-white border-0 p-4 ">
                                        <h4 className="my-0 " editable="inline">Basic</h4>
                                    </div>
                                    <div className="card-body ">
                                        <h5 className="card-title"><span className="display-6 text-primary" editable="inline"><b>₱2500</b></span><span editable="inline" className="lead">/mo</span></h5>

                                        <div className="card-text my-4 lc-block">
                                            <div editable="rich">
                                                <ul className="list-unstyled">

                                                    <li editable="inline">Below 100 users/employees </li>
                                                    <li editable="inline">Access to all features</li>
                                                </ul>

                                            </div>
                                        </div>

                                        <div className="d-grid lc-block">
                                            <a href="/register" className="btn btn-lg btn-primary border-0 rounded-1 fs-6">Get 1 month free trial</a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 text-dark my-2">
                                <div className="card border-0">
                                    <div className="card-header bg-white border-0 p-4">
                                        <h4 className="my-0" editable="inline">Pro</h4>
                                    </div>
                                    <div className="card-body bg-white">
                                        <h5 className="card-title"><span className="display-6 text-primary" editable="inline"><b>₱10,500</b></span><span editable="inline" className="lead">/mo</span></h5>

                                        <div className="card-text my-4 lc-block">
                                            <div editable="rich">
                                                <ul className="list-unstyled">

                                                    <li editable="inline">Above 100 users/employees </li>
                                                    <li editable="inline">Access to all features</li>
                                                </ul>

                                            </div>
                                        </div>
                                        <div className="d-grid lc-block">
                                        <a href="/register" className="btn btn-lg btn-primary fs-6 border-0 rounded-1">Get 1 month free trial</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 text-dark my-2 ">
                                <div className="card border-0 shadow">
                                    <div className="card-header bg-white border-0 p-4">
                                        <h4 className="my-0" editable="inline">Enterprise</h4>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title"><span className="display-5 text-success" editable="inline">₱45,000</span></h5>

                                        <div className="card-text my-4 lc-block">
                                            <div editable="rich">
                                                <ul className="list-unstyled">

                                                    <li editable="inline" className="">One time payment/No more Monthly Fees</li>
                                                    <li editable="inline" className="">Access to all features</li>
                                                    <li editable="inline" className="">Unlimited number of users/employees</li>
                                                    <li editable="inline" className="">Can request customization or any additional functionalities</li>
                                                    
                                                </ul>

                                            </div>
                                        </div>
                                        <div className="d-grid lc-block">
                                        <a href="/register" className="btn btn-lg btn-primary fs-6 border-0 rounded-1">Get 1 month free trial</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                 </div>       
        
        </>

    );



}


function Partners(){


      return (


          <>

                  <div className="container">
                          <div className="row text-center">
                            <h3 className="mt-5 ">Our Clients</h3>
                            <h5 className="">Trusted by over 100+ Clients</h5>
                            <h5 className="text-muted">We bring solutions to make life easier for our customers.</h5>
                              <div className="col-md-12">
                                  <div className="lc-block">
                                      <div id="carouselLogos" className="carousel slide pt-5 pb-4" data-bs-ride="carousel">

                                          <div className="carousel-inner px-5">
                                              <div className="carousel-item active">
                                                  <div className="row">
                                                      <div className="col-6 col-lg-2 align-self-center">
                                                          <img className="d-block w-100 px-3 mb-3" src="https://queen.jollibee.com.ph/2022/02/jollibee-logo-footer-2x.png" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://i0.wp.com/rooftopleadership.com/wp-content/uploads/2023/04/JP-Morgan-Chase-Logo-e1681390058665.png?fit=3840%2C1267&ssl=1" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://i.pinimg.com/originals/20/b6/31/20b631c40aa024030ae174661826f16f.jpg" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://phlogos.com/logos/pnb/pnb.png" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://upload.wikimedia.org/wikipedia/commons/3/3e/Cargomatic_%28Company%29_Logo.png" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/GCash_logo.svg/2560px-GCash_logo.svg.png" alt=""/>
                                                      </div>
                                                  </div>

                                              </div>
                                              <div className="carousel-item">
                                                  <div className="row">
                                                      <div className="col-6 col-lg-2 align-self-center">
                                                          <img className="d-block w-100 px-3 mb-3" src="https://phlogos.com/logos/pldt/pldt.png" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://upload.wikimedia.org/wikipedia/commons/0/05/The_Himalaya_Drug_Company_logo.png" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://cdn.livecanvas.com/media/logos/3.png" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://cdn.livecanvas.com/media/logos/12.png" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://cdn.livecanvas.com/media/logos/5.png" alt=""/>
                                                      </div>
                                                      <div className="col-6 col-lg-2  align-self-center">
                                                          <img className="d-block w-100 px-3  mb-3" src="https://cdn.livecanvas.com/media/logos/6.png" alt=""/>
                                                      </div>
                                                  </div>

                                              </div>

                                          </div>

                                          
                                         




                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                            
          
          </>


      );


}



function Landing(){

    return(

      <>
      
          <Navbar activecolor="btn link-secondary bg-white" inactivecolor="btn link-secondary bg-white"></Navbar>
          <Hero></Hero>
          <Features></Features>
          <Pricing></Pricing>
          <Partners></Partners>
          <Footer></Footer>


      </>


    );




}


export default Landing
