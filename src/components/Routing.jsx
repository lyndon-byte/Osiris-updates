import React, { useState } from 'react';
import {

  
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Landing from './Landing.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../index.css';
import Error404 from './404.jsx';
import Dashboard  from './Dashboard.jsx';
import EmailVerification from './EmailVerfication.jsx';
import {app} from './firebaseconfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CheckingPermission from './CheckingPermmission.jsx';
import VerifiedEmail from './VerifiedEmail.jsx';
import TimeInApp from './TimeIn.jsx';


const auth = getAuth(app);


function Routing (){

    

    const [authenticated,setAuthenticated] = useState(false);
    
    
    onAuthStateChanged(auth, (user) => {

        if (user) {

            setAuthenticated(true);
          
        } else {
            
            setAuthenticated(false);
        }

    });

    return (

        <>
        
                    <Router>
                        
                        <Routes>
                        
                        <Route
                                exact
                                path="/"
                                element={<Landing />}
                        />

                        
                        <Route
                                path="/login"
                                element={<Login />}
                        />

                        
                        <Route
                                path="/register"
                                element={<Register />}
                        />


                        <Route
                                path="/emailverification"
                                element = { authenticated ? <EmailVerification/> : <CheckingPermission/>}
                               
                                
                                
                        />                                  
                        
                        <Route
                                path="/verifiedemail"
                                element={authenticated? <VerifiedEmail /> : <CheckingPermission/>} 
                        />    

                        <Route

                            path="/dashboard/*"
                            element={ authenticated ? <Dashboard/> : <CheckingPermission/>}
                        />

                        <Route

                            path="/timein"
                            element={ <TimeInApp/> }

                        />

                            <Route
                                path="*"
                                element={<Error404 />}
                            />
                            
                        
                        </Routes>

                </Router>
        
        
        </>


    );

}

export default Routing;
