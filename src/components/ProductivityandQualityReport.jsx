import { Bar } from 'react-chartjs-2';
import { CDBContainer } from 'cdbreact';
import { useState } from 'react';
import {Chart as ChartJS, BarElement, CategoryScale, LinearScale} from 'chart.js'



const ProductivityandQualityReport = () => {

    ChartJS.register(CategoryScale,LinearScale,BarElement);


    const [data] = useState({
      labels: ['Marketing', 'Production', 'Accounting'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#0d6efd',
          borderColor: '#0d6efd',
          data: [65, 59, 90],
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#198754',
          borderColor: '#198754',
          data: [28, 48, 100],
        },
      ],
    });
  
    return (
      <CDBContainer>
        <h5 className="mt-5 mb-5">Performance of all Departments</h5>
        <Bar data={data} options={{ responsive: true }} />
      </CDBContainer>
    );
  };

  export default ProductivityandQualityReport;
