import React from "react";
import { useState, useEffect } from "react";
import {app} from './firebaseconfig';
import { getAuth , sendEmailVerification } from "firebase/auth";

const auth = getAuth(app);

const actionCodeSettings = {

    url: 'https://osiris-44544.firebaseapp.com'

    
};


function EmailVerification(){
      
    
   const email = localStorage.getItem('registeredemail') ;

    const TIME_IN_MILISECONDS_TO_COUNTDOWN = 10*1000;
    const INTERVAL_IN_MILISECONDS = 100;
    
        const [time, setTime] = useState(TIME_IN_MILISECONDS_TO_COUNTDOWN);
        const [resendBtn,setResendBtn] = useState(false)

        useEffect(() => {

            let interval;
    
            const countDownUntilZero = () => {
                setTime(prevTime => {
                    if (prevTime === 0) 
                    console.log('timer done'),
                    setResendBtn(true);
                    else return prevTime - INTERVAL_IN_MILISECONDS; 
                    
                })
            }
    
            interval = setInterval(countDownUntilZero, INTERVAL_IN_MILISECONDS);
            return () => clearInterval(interval);
        }, []);
        
       
    
    const handleResend = () => {

        setResendBtn(false);

        setTime(TIME_IN_MILISECONDS_TO_COUNTDOWN);

        sendEmailVerification(auth.currentUser, actionCodeSettings)
        .then(() => {
            

            console.log('email verification was resent!');
            
        });

    }  


    return(

        <>
             
  
            <div className="container text-center py-6">
                
                <div className="row">
                    <div className="col-lg-6 col-xl-5 mx-auto">
                        <div className="lc-block mb-3">
                            <img className="mt-5" src="./src/assets/osirislogo.png" width="15%" sizes="" alt=""/>
                        </div>
                        <div className="lc-block mb-3">
                            <div editable="rich">
                                <h4>Email Confirmation</h4>
                            </div>
                        </div>
                        <div className="lc-block mb-5">
                            <div editable="rich">
                                
                                <p className="">We need to confirm your email address to verify your account. We sent email confirmation link to: {email}</p>
                                <p className="text-muted">Just click the link on the email to confirm your email address</p>
                                
                            </div>
                        </div>
                       
                    </div>

                </div>

            </div>

            <section className="bg-white">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="card m-auto mt-5 border-0" style={{width: 18 + 'rem'}}>
                            <img src='https://cdn3.iconfinder.com/data/icons/mailbox-and-letters/512/cat-kitty-mail-email-message-letter-512.png' className="m-auto" width="50%" alt="" />
                            </div>
                                <div className='m-auto'>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="row row-cols-1 justify-content-center py-5">
                        
                            <div className="col text-center">
                                <div className="lc-block">
                                
                                    <div className="lc-block mb-4 col-lg-4 col-sm-12 m-auto">
                                        <div editable="rich" className="">
                                            <p className="text-muted" style={{fontSize: 14 + 'px'}}>If you didnt see any email from us on your inbox, kindly check your spam folder or check if the email address that you provided was valid</p>
                                        </div>
                                    </div>
                                  
                                        <div className="lc-block"><button className='btn btn-primary btn-lg fs-6 rounded-1 border-0 mb-2' onClick={handleResend} disabled={resendBtn ? false : true} href="#" role="button">Resend Email</button>
                                            <p className={resendBtn ? 'text-light' : ''}> Resend after {(time/1000).toFixed()}s</p>
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


export default EmailVerification;