import React, { Component, Navigate, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import { useCallback } from "react";


localStorage.setItem('vacationleavebalance',5);
localStorage.setItem('sickleavebalance',5);
localStorage.setItem('absents',2);



const locales = {

    "en-us": import("date-fns/locale/en-US")

}

const localizer = dateFnsLocalizer({

    format,
    parse,
    startOfWeek,
    getDay,
    locales


})



const events = [
    
    {

        title: "Present",
        allDay: true,
        start: new Date(2023,11,1),
        end: new Date(2023,11,1)

    },
    
    {

        title: "Absent",
        allDay: true,
        start: new Date(2023,11,4),
        end: new Date(2023,11,4)

    },

    {

        title: "Present",
        allDay: true,
        start: new Date(2023,11,5),
        end: new Date(2023,11,5)

    },

    {

        title: "Present",
        allDay: true,
        start: new Date(2023,11,6),
        end: new Date(2023,11,6)

    },
    {

        title: "Present",
        allDay: true,
        start: new Date(2023,11,7),
        end: new Date(2023,11,7)

    },
    {

        title: "Absent",
        allDay: true,
        start: new Date(2023,11,8),
        end: new Date(2023,11,8)

    },


]






function AttendanceCalendar(){

    const [show, setShow] = useState(false);
    const [leaveShow,setLeaveShow] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState();
    const [selectedDisputeDate,setSelectedDisputeDate] = useState([]);
    const [selectedDisputeDateValue,setSelectedDisputeDateValue] = useState('');
    const [eventData,setEventData] = useState(events);
    const [leaveEventData, setLeaveEventData] = useState([]);
    const [leaveDate,setLeaveDate] = useState('');   
    const [selectedStatus,setSelectedStatus] = useState('');

    const handleSelected = (event) => {

        setShow(true)
        setSelectedEvent(event);
        setSelectedDisputeDate(event);
        console.log(event)
       
    };

    useEffect(()=>{

        if(selectedDisputeDate.length !== 0){

            setSelectedDisputeDateValue(selectedDisputeDate.start.getMonth() + "/" + selectedDisputeDate.start.getDate() + "/" + selectedDisputeDate.start.getFullYear())
            
            
        }

    },[selectedDisputeDate])

    const handleModifyEvent = () => {

        const index = eventData.findIndex(object => {
            return object.start.getMonth() === selectedDisputeDate.start.getMonth() && object.start.getDate() === selectedDisputeDate.start.getDate() && object.start.getFullYear() === selectedDisputeDate.start.getFullYear()  ;
        });

        if (index !== -1) {
            
            if(selectedStatus === "Sick Leave"){

                if(localStorage.getItem('sickleavebalance') != 0){
                    eventData[index].title = selectedStatus;
                    localStorage.setItem("sickleavebalance",localStorage.getItem('sickleavebalance') - 1)
                }else{

                    alert('no available sick leave credit')

                }

            }else if(selectedStatus === "Absent"){

                if(localStorage.getItem('absents') != 0){
                    eventData[index].title = selectedStatus;
                    localStorage.setItem("absents",parseInt(localStorage.getItem('absents')) + parseInt(1))
                }else{

                    alert('no available leave credit')

                }

            }else if(selectedStatus === "Cancelled"){

               
                if(eventData[index].title == "Vacation Leave"){

                    eventData[index].title = selectedStatus;
                    localStorage.setItem("vacationleavebalance",parseInt(localStorage.getItem('vacationleavebalance')) + parseInt(1))

                }else if(eventData[index].title == "Sick Leave"){

                    eventData[index].title = selectedStatus;
                    localStorage.setItem("sickleavebalance",parseInt(localStorage.getItem('sickleavebalance')) + parseInt(1))

                }
                
            }else if(selectedStatus === "Paid Leave"){
                
                 
                if(localStorage.getItem('vacationleavebalance') != 0){

                    eventData[index].title = selectedStatus;
                    localStorage.setItem("vacationleavebalance",parseInt(localStorage.getItem('vacationleavebalance')) - parseInt(1))

                }else{

                    alert('no available leave credits')
                }
                
               
            }
            
            else{

                if(eventData[index].title == "Absent"){

                    eventData[index].title = selectedStatus;
                    localStorage.setItem("absents",parseInt(localStorage.getItem('absents')) - parseInt(1))

                }else{

                    eventData[index].title = selectedStatus;

                }
               

            }

        }
        setShow(false);
        setSelectedStatus('')

    }

   let i = 1;

   const eventPropGetter = useCallback(
        (event) => ({
        ...(event.title.includes('Present') &&
             
          {
             style: {
                backgroundColor: '#5cb85c',
                height: "50px",
                borderRadius: "0"
              },
          }),
          ...(event.title.includes('Absent') &&
             
          {
            style: {
               backgroundColor: '#d9534f',
               height: "50px",
               borderRadius: "0"
             },
         }),
         ...(event.title.includes('Sick Leave') && {
            style: {
               backgroundColor: '#343a40',
               height: "50px",
               borderRadius: "0"
             },
         }),
         ...(event.title.includes('Paid Leave') && {
            style: {
               backgroundColor: '#007bff',
               height: "50px",
               borderRadius: "0"
             },
         }),
         ...(event.title.includes('Vacation Leave') && 
        
         {
            style: {
               backgroundColor: '#28a745',  
               height: "50px",
               borderRadius: "0"
             },
             
         }),
         ...(event.title.includes('Cancelled') && {
            style: {
               backgroundColor: '#17a2b8',
               height: "50px",
               borderRadius: "0"
             },
         }),
        }),
        []
    )

     useEffect(() =>{

         if(leaveEventData.length !== 0){

           
            setLeaveDate(leaveEventData.start.getMonth() + "/" + leaveEventData.start.getDate() + "/" + leaveEventData.start.getFullYear())
            setLeaveShow(true);

         }

     },[leaveEventData])   

    const handleAddLeave = () =>{


        if(localStorage.getItem('vacationleavebalance') != 0){

            eventData.push({

                title: selectedStatus,
                allDay: true,
                start: new Date(leaveEventData.start.getFullYear(),leaveEventData.start.getMonth(),leaveEventData.start.getDate()),
                end: new Date(leaveEventData.start.getFullYear(),leaveEventData.start.getMonth(),leaveEventData.start.getDate())
    
            })
            localStorage.setItem('vacationleavebalance',localStorage.getItem('vacationleavebalance') - 1)
            setLeaveShow(false);
        }else{

            alert('no available leave credits')
        }


    }


    const handleSelectSlotForLeave = (event) =>{

        
        setLeaveEventData(event)
        

    }

    function AddLeave() {
        
      
        const handleClose = () => setLeaveShow(false);
       
      
        return (
          <>
            
      
            <Modal

              show={leaveShow}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
               className="bg-dark bg-opacity-75"
              centered
            
              
            >
              <Modal.Header closeButton>
            
              </Modal.Header>
              <Modal.Body>
                    
                    <p><span className="text-muted">Date: {leaveDate}</span></p>
                    <select class="form-select" aria-label="Default select example" value={selectedStatus} onChange={(e) => {setSelectedStatus(e.target.value)}}>
                            <option defaultValue>Open this select menu</option>
                            <option value="Vacation Leave">Set as vacation leave</option>
                    </select>
              </Modal.Body>
              <Modal.Footer>
                
                <Button variant="primary" onClick={handleAddLeave}>Submit</Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }


    
    
    function AddDispute() {
        
      
        const handleClose = () => {
            
            setShow(false);
            
        }
      
        return (
          <>
            
      
            <Modal

              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
               className="bg-dark bg-opacity-75"
              centered
            
              
            >
              <Modal.Header closeButton>
                <Modal.Title>Select Status</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                    <p><span className="text-muted">Current Status:</span> {selectedDisputeDate.title}</p>
                    <p><span className="text-muted">Date:</span> {selectedDisputeDateValue}</p>
                    <select class="form-select" aria-label="Default select example" value={selectedStatus} onChange={(e) => {setSelectedStatus(e.target.value)}}>
                            <option defaultValue>Open this select menu</option>
                            <option value="Present">Present</option>
                            <option value="Sick Leave">Sick Leave</option>
                            <option value="Absent">Absent</option>
                            <option value="Paid Leave">Paid Leave</option> 
                            <option value="Cancelled">Cancel</option> 
                             
                    </select>
              </Modal.Body>
              <Modal.Footer>
                
                <Button variant="primary" onClick={handleModifyEvent}>Submit</Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }

    return (

        <>              
                        <AddLeave></AddLeave>
                        <AddDispute></AddDispute>
                        <div className="container">
                            <div className="row">
                               
                                <div className="col-lg-3 col-sm-12 mt-4">
                                    <div class="card border-0">
                                        <div class="card-header border-0 bg-success text-white">
                                            VL Balance
                                        </div>
                                        <div class="card-body bg-light text-center">

                                            <h3 class="card-title">{localStorage.getItem('vacationleavebalance')}</h3>
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-12 mt-4">
                                    <div class="card border-0">
                                        <div class="card-header border-0 bg-dark text-white">
                                            SL Balance
                                        </div>
                                        <div class="card-body bg-light text-center">

                                            <h3 class="card-title">{localStorage.getItem('sickleavebalance')}</h3>
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-12 mt-4">
                                    <div class="card border-0">
                                        <div class="card-header border-0 bg-danger text-white">
                                            Absents
                                        </div>
                                        <div class="card-body bg-light text-center">

                                            <h3 class="card-title">{localStorage.getItem('absents')}</h3>
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-12 mt-4">
                                    <div class="card border-0">
                                        <div class="card-header border-0 bg-warning text-white">
                                            Lates
                                        </div>
                                        <div class="card-body bg-light text-center">

                                            <h3 class="card-title">10</h3>
                                            
                                           
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 m-auto mt-5">
                                    <div className="alert alert-primary"  data-bs-theme="dark" style={{fontSize: 14 + "px"}} role="alert">
                                         Click a slot to file a leave, if you want to file a attendance dispute just click a specific attendance status🤓
                                    </div>
                                    
                                </div>
                                
                                <div className="col-lg-12">
                                    <Calendar

                                        selected={selectedEvent}
                                        onSelectEvent={handleSelected}
                                        onSelectSlot={handleSelectSlotForLeave}
                                        selectable
                                        localizer={localizer}
                                        events={eventData}
                                        startAccessor="start"
                                        endAccessor="end"
                                        style={{height: 500, margin: "50px"}}      
                                        views={{month: true}}      
                                        eventPropGetter={eventPropGetter}
                                        >


                                    </Calendar>
                                </div>
                                
                            </div>
                        </div>

           

                
 
        </>

    );


}



export default AttendanceCalendar;