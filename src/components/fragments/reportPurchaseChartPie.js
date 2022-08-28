import React from 'react';
import Chart from "react-apexcharts";
import ReportService from '../../services/ReportService'

class ReportPurchaseChartPie extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          option : {
            chart: {
              width: 400,
              type: 'pie',
            },
            labels: [],
            legend: {
              position: 'bottom'
            },
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 400
                },
                legend: {
                  position: 'bottom'
                }
              }
            }]
          },
          SeriesPie: [],
          DateData : '',
            
          }
          this.changeDateData = this.changeDateData.bind(this)
        }
        changeDateData(e) {
          let data = {'chart_type':e.target.value,'id_toko':'1'}
          this.setState({ DateData: e.target.value });
              ReportService.getPurchasePieChart(data).then((res) => {
                let pieData = res.data.data.detail
                let newData = pieData.map((i) => Number(i))
                  this.setState({ 
                      option:{
                          ...this.state.option,
                          labels: res.data.data.category,         
                      },
                      SeriesPie : newData
                  })
              })
              

      }
      componentDidMount(){
        let data = {'chart_type':'monthly','id_toko':'1'}
            ReportService.getPurchasePieChart(data).then((res) => {
              let pieData = res.data.data.detail
              let newData = pieData.map((i) => Number(i))
              this.setState({ 
                option:{
                  ...this.state.option,
                  labels: res.data.data.category,         
                },
                SeriesPie : newData
            })
            })
      }
      render() {
        return (
            <main>
                <div class="d-flex justify-content-between">
                    <div>
                        <h3>Top Purchase by Category</h3>
                    </div>
                    <div class="form-group">
                        <select class='form-control' onChange={this.changeDateData} value={this.state.DateData}>
                            <option value="monthly">Monthly Data</option>
                            <option value="weekly">Weekly Data</option>
                            <option value="daily">Daily Data</option>
                        </select>
                    </div>
                </div>
                <Chart options={this.state.option} 
                       series={this.state.SeriesPie} 
                       type="pie" />
            </main>
        )
    }
}

export default ReportPurchaseChartPie;