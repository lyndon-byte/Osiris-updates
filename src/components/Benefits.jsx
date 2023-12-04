
import {Link} from 'react-router-dom'


function Error404(){

    return(

        <>

                 
  
                <section className="bg-white" >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="card m-auto mt-5 border-0" style={{width: 18 + 'rem'}}>
                            <img src="https://cdn-icons-png.flaticon.com/512/1055/1055667.png"  width="100%" alt="" />
                            </div>
                                <div className='m-auto'>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row row-cols-1 justify-content-center py-5" style={{marginBottom: 250 + "px"}}>
                        
                            <div className="col text-center">
                                <div className="lc-block">
                                
                                    <div className="lc-block mb-4">
                                        <div editable="rich">
                                            <p className="rfs-11 fw-light"> The page you are looking is not available yet, we are conducting some upgrade for this specific feature</p>
                                        </div>
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