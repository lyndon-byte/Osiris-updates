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
          backgroundColor: 'rgba(194, 116, 161, 0.5)',
          borderColor: 'rgb(194, 116, 161)',
          data: [65, 59, 90],
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(71, 225, 167, 0.5)',
          borderColor: 'rgb(71, 225, 167)',
          data: [28, 48, 100],
        },
      ],
    });
  
    return (
      <CDBContainer>
        <h3 className="mt-5">Bar chart</h3>
        <Bar data={data} options={{ responsive: true }} />
      </CDBContainer>
    );
  };

  export default ProductivityandQualityReport;
