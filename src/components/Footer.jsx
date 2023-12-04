function Footer(){

    return(

        <>


             
              <div className="container-fluid mt-5" style={{background: '#16457a'}} >
                <div className="container">
                  <footer className="py-5">
                    <div className="row">
              
                        <div className="col-lg-12 mt-5">
                        <img src="https://i.ibb.co/thg7R8F/osirislogo.png" width="70"  className="align-middle me-1 float-start" alt="My Website"/>
                        <h2 className="mt-3 text-white mb-5" id='brandtext'>Osiris</h2>
                          <h4 className="text-white ">Inspiring Growth, One HR Step at a Time</h4>
                        </div>
                
                      
                
                      
                    </div>
                
                    <div className="d-flex flex-column flex-sm-row justify-content-between py-4 " >
                      <p className="text-white">&copy; 2023 Osiris, Inc. All rights reserved.</p>
                      <ul className="list-unstyled d-flex">
                        <li className="ms-3" ><a className="fs-3" href="#" ><i className="fa-brands fa-square-facebook text-white" ></i></a></li>
                        <li className="ms-3"><a className="fs-3 " href="#"  ><i className="fa-brands fa-square-twitter text-white"></i></a></li>
                        <li className="ms-3"><a className="fs-3 " href="#"><i className="fa-brands fa-square-instagram text-white"></i></a></li>
                      </ul>
                    </div>
                  </footer>
                </div>
              </div>
                  
        
        </>

    );

}

export default Footer;
