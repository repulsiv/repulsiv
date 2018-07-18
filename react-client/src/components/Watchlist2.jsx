import React from 'react';
import {Bar, Line, Pie } from  'react-chartjs-2';

var mockGraphData = [
  {
    "itemId": 245889258,
    "parentItemId": 245889258,
    "name": "Apple Watch Series 3 38mm Case, by Insten Full Cover Protector Crystal Clear Snap On Cover Case Perfect Fit For Apple Watch Series 3 38mm, Clear (Anti-Scratch)(Shock Absorption)(Fingerprint-proof)",
    "msrp": [12.79, 12.66, 11.22, 10.33],
    "salePrice": [5.59, 5.44, 5.12, 5.00],
    "createdAt": ["2018-05-30 00:00:00", "2018-05-30 00:10:00", "2018-05-22 00:20:00", "2018-05-22 00:30:00"]
  },

  {
    "itemId": 385235179,
    "parentItemId": 385235179,
    "name": "Apple Watch Series 2 Case 38mm,iClover Full Cover Apple Watch Series 2 Nike Case Slim Hard PC Plated Protective Bumper Cover & 0.2mm Shockproof Screen Protector for iWatch 2016, Rose Gold",
    "msrp": [12.79, 12.79, 12.79, 12.79],
    "salePrice": [6.59, 6.59, 6.77, 3.44],
    "createdAt": ["2018-12-11 00:20:00", "2018-12-11 00:30:00", "2018-12-11 00:40:00", "2018-12-11 00:50:00"]
  }

]


var chartData = {
    labels: ["2018-05-30 00:00:00", "2018-05-30 00:10:00", "2018-05-22 00:20:00", "2018-05-22 00:30:00"],
    datasets:[
      {
        label:'Population',
        data:[12.79, 12.66, 11.22, 10.33],
        fill: false,
        backgroundColor:[
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }
    ]
  }


// var chartData = {
//     labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
//     datasets:[
//       {
//         label:'Population',
//         data:[
//           617594,
//           181045,
//           153060,
//           106519,
//           105162,
//           95072
//         ],
//         backgroundColor:[
//           'rgba(255, 99, 132, 0.6)',
//           'rgba(54, 162, 235, 0.6)',
//           'rgba(255, 206, 86, 0.6)',
//           'rgba(75, 192, 192, 0.6)',
//           'rgba(153, 102, 255, 0.6)',
//           'rgba(255, 159, 64, 0.6)',
//           'rgba(255, 99, 132, 0.6)'
//         ]
//       }
//     ]
//   }


class Chart extends React.Component{
  constructor(props){
    super(props);
    debugger;
    this.state = {
      chartData: this.props.chartData
    }
  }



  render(){
    return (
      <div className="chart">
      {
        /*


        <Bar
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />


        <Pie
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            }
          }}
        />

        */}

        <Line
          width='8'
          height='2'
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'Largest Cities In '+this.props.location,
              fontSize:25
            },
            legend:{
              display:this.props.displayLegend,
              position:this.props.legendPosition
            },

            xAxes: [{
              label: true,
              title: {text: "time"}, //not working
              type: 'time',
              time: {
                unit: "min",
                unitStepSize: 1000,
                displayFormats: {
                  millisecond: 'MMM DD',
                  second: 'MMM DD',
                  minute: 'MMM DD',
                  hour: 'MMM DD',
                  day: 'MMM DD',
                  week: 'MMM DD',
                  month: 'MMM DD',
                  quarter: 'MMM DD',
                  year: 'MMM DD',
                }
              }
            }],
            yAxes: [{
              label: true,
              title: 'msrp' //not working
            }]
          }}
        />

      </div>
    )
  }
}








class Watchlist2 extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
     // static defaultProps = {
  //   displayTitle:true,
  //   displayLegend: true,
  //   legendPosition:'right',
  //   location:'City'
  // }
    return <Chart chartData={chartData} legendPosition="bottom" displayTitle='true' displayLegend='true' legendPosition='right' location='City'  />
  }
}




export default Watchlist2