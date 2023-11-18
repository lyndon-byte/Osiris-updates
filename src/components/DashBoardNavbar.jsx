import { useNavigate } from "react-router";
import { app } from './firebaseconfig';
import { getAuth , signOut } from "firebase/auth";


const auth = getAuth(app);



function DashBoardNavbar (){

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

            <nav className="navbar navbar-expand-lg bg-white">
                    <div className="container-fluid">
                    
                    
                    
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                                <li className="nav-item">
                                    <button className="btn btn-outline-secondary border-0 bg-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"><span className="navbar-toggler-icon"></span></button>
                                </li>
                            </ul>
                            <span className="navbar-text"> 
                                Lyndon Cuartero
                            </span>
                            
                            <div className="btn-group">
                            
                                <button type="button" className="btn btn-danger dropdown-toggle dropdown-toggle-split bg-white border-0 text-primary fs-4 w-100" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end border-secondary rounded-1" style={{fontSize: 13 + "px"}}>
                                    <li><a className="dropdown-item" href="#"><i className="fa-regular fa-user"></i>&nbsp; Profile</a></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><a className="dropdown-item" href="#" onClick={handleSignOut}><i className="fa-solid fa-arrow-right-from-bracket"></i>&nbsp; Log Out</a></li>
                                </ul>

                            </div>
                            
                        
                        
                                                
                    </div>
                </nav>

        </>


    );

}

export default DashBoardNavbar;