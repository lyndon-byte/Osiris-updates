import {Link} from 'react-router-dom'

function Navbar(props){

    const color = props.activecolor
    const color2 = props.inactivecolor
    return (

      <>

           
  
                <nav className="navbar navbar-expand-lg py-3 navbar-light bg-white border fixed-top">
                <div className="container">
                    <a className="navbar-brand fs-5" href="/">
                        <img src="./src/assets/osirislogo.png" width="70"  className="align-middle me-1" alt="My Website"/>
                        <h2 className="float-end mt-3" id='brandtext'>Osiris</h2>
                    </a>

                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#myNavbar3" aria-controls="myNavbar3" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="lc-block collapse navbar-collapse" id="myNavbar3">

                        

                    
                    <div className="lc-block ms-auto d-grid gap-2 d-lg-block">
                        <a className={color} href="/login" role="button">
                        <i className='fa-regular fa-user'></i>
                        &nbsp; Login
                        </a>
                        <a className={color2} href="/register" role="button">Register</a>
                    </div>
                    </div>
                </div>
                </nav>
      
 
  
      
      </>

    );
}

export default Navbar;