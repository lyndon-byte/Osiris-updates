import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { useState } from 'react';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'



const AddReports = () => {

    

    ChartJS.register(CategoryScale,LinearScale,BarElement);

    const [score,setScore] = useState(50);
    const [month,setMonth] = useState('');
    const [department,setDepartment] = useState('');
    const [category,setCategory] = useState('');
    const [barValueforMarketingProductivity,setbarValueforMarketingProductivity] = useState(0);
    const [barValueforProductionProductivity,setbarValueforProductionProductivity] = useState(0);
    const [barValueforAccountingProductivity,setbarValueforAccountingProductivity] = useState(0);
    const [barValueforMarketingQuality,setbarValueforMarketingQuality] = useState(0);
    const [barValueforProductionQuality,setbarValueforProductionQuality] = useState(0);
    const [barValueforAccountingQuality,setbarValueforAccountingQuality] = useState(0);

    const [data,setData] = useState({
      labels: ['Marketing', 'Production', 'Accounting'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
          data: [barValueforMarketingProductivity,barValueforProductionProductivity,barValueforAccountingProductivity],
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#198754',
          borderColor: '#198754',
          data:[barValueforMarketingQuality,barValueforProductionQuality,barValueforAccountingQuality]
        },
      ],
    });
    
    const handleAddReport = () => {


        if(category == "Productivity"){

            if(department === "Marketing"){

                setbarValueforMarketingProductivity(score)

            }

        }else if(category == "Quality"){

        }


    }

    console.log(data.datasets[0].data[0])
    return (
       <div className="row" style={{marginBottom: 200 + "px"}}>
            <div className="col-lg-6 col-sm-12 mt-5">
                   <div className="col-lg-6 m-auto">
                        <label className="form-label" style={{fontSize: 20 + "px"}}>Add Monthly Report</label>
                        <div className="mb-3">
                            
                            <label className="form-label mt-3">Enter Month</label>
                            <div className="input-group">
                                
                                <input type="month" className="form-control rounded-1" id="basic-url" aria-describedby="basic-addon3 basic-addon4" onChange={(e) => {setMonth(e.target.value)}}/>
                            </div>
                           
                        </div>
                        
                   </div>
                   
                   <div className="col-lg-6 m-auto">
                        <label className="form-label mt-3">Select Department</label>
                        <select className="form-select rounded-1" aria-label="Default select example" onChange={(e) => {setDepartment(e.target.value)}}>
                            <option selected>Open this select menu</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Production">Production</option>
                            <option value="Accounting">Accounting</option>
                        </select>
                       
                   </div>
                   <div className="col-lg-6 m-auto">
                        <label className="form-label mt-3">Select Category</label>
                        <select className="form-select rounded-1" aria-label="Default select example" onChange={(e) => {setCategory(e.target.value)}}>
                            <option selected>Open this select menu</option>
                            <option value="Productivity">Productivity</option>
                            <option value="Quality">Quality</option>
                           
                        </select>
                        
                   </div>
                   <div className="col-lg-6 m-auto">
                    
                        <div className="mb-3">
                            
                            <label className="form-label mt-5">Enter Score</label>
                            <div className="input-group">
                                
                                <input type="range" className="form-control-range rounded-1 w-100" onInput={(e) => {setScore(e.target.value)}} id="basic-url" aria-describedby="basic-addon3 basic-addon4"/>
                            </div>
                            <div className="form-text" id="basic-addon4">
                                <h5>{score}</h5>
                            </div>

                        </div>
                        <button className='btn btn-primary w-100 mt-3' onClick={handleAddReport}>Save</button>
                   </div>
                   
            </div>
            
            <div className="col-lg-6 col-sm-12">
                <CDBContainer>
                    <h5 className="mt-5 mb-5">Performance of all Departments: <span className='text-muted'>{month == '' ? 'not set yet' : month}</span></h5>
                    <Bar data={data} options={{ responsive: true }} />
                </CDBContainer>
            </div>
       </div>
    );
  };

  export default AddReports;
