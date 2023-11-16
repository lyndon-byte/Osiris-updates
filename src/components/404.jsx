
import {Link} from 'react-router-dom'


function Error404(){

    return(

        <>

                 
  
                <section className="bg-white">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="card m-auto mt-5 border-0" style={{width: 18 + 'rem'}}>
                            <img src="https://t3.ftcdn.net/jpg/06/21/44/98/360_F_621449862_Mcs9UlZpShHFI1t4vSb4XyANpf5UPThe.jpg"  width="100%" alt="" />
                            </div>
                                <div className='m-auto'>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row row-cols-1 justify-content-center py-5">
                        
                            <div className="col text-center">
                                <div className="lc-block">
                                
                                    <div className="lc-block mb-4">
                                        <div editable="rich">
                                            <p className="rfs-11 fw-light"> The page you are looking for was moved, removed or might never existed.</p>
                                        </div>
                                    </div>
                                    <div className="lc-block">
                                        <Link className="btn btn-lg btn-primary border-0 rounded-1 fs-6" to="/" role="button">Back to homepage</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
 
      <p className="py-5 small text-center text-muted">This web application was created by <a href="https://www.facebook.com/profile.php?id=100014130277302">Lyndon Cuartero </a>  
    </p>
  


        </>


    );

}

export default Error404