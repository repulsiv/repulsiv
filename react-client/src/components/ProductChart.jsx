import React from 'react';
import ReactDOM from 'react-dom';
import {Line} from 'react-chartjs-2';

class ProductChart extends React.Component {
  constructor(props) {
    super(props);

    var data = {
    labels: [],
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
        data: []
        //data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };


  this.state = {
    data: data
  }


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
}

  componentDidMount() {

    var prices = this.props.data.map((product) => {
      return product.price
    })

    var createdAtTimes = this.props.data.map((product) => {
      return product.createdAt
    })

    this.state.data.labels = createdAtTimes;
    this.state.data.datasets[0].data = prices;

    this.setState({
      data: this.state.data
    })
  }

  render() {

    return (
      <div>
        <Line data={this.state.data} options={this.chartOptions}/>
      </div>
      )
    }
}


export default ProductChart

