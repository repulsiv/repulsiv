import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';

class ProductChart extends React.Component {
  constructor(props) {
    super(props);

    var msrp = [12.79, 12.66, 11.22, 10.33]
    var createdAt = ["2018-05-30 00:00:00", "2018-05-30 00:10:00", "2018-05-22 00:20:00", "2018-05-22 00:30:00"]

    const data = {
    //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    labels: createdAt,
    datasets: [
      {
        label: 'Price trend',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: msrp
        //data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  this.chartOptions = {

    scales: {

      yAxes: [{
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '$' + value;
          }
        }
      }]
    }
  }

    this.state = {
      data: data
    }

  }

  render() {
    debugger;
    return (
      <div>
        <Line data={this.state.data} options={this.chartOptions}/>
      </div>
      )
    }
}


export default ProductChart

