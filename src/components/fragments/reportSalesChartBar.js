import React from 'react';
import Chart from "react-apexcharts";
import ReportService from '../../services/ReportService'
class ReportSales extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            options: {
                chart: {
                  id: "basic-bar"
                },
                xaxis: {
                  categories: []
                }
              },
            seriesLine: [
                {
                  name: "Income Date",
                  data: []
                }
            ],
            DateData : ''
            }
            this.changeDateData = this.changeDateData.bind(this)
        }
    changeDateData(e) {
        let data = {'chart_type':e.target.value,'id_toko':'1'}
        this.setState({ DateData: e.target.value });
            ReportService.getSalesChart(data).then((res) => {
                this.setState({ 
                    options:{
                        ...this.state.options,
                        xaxis:{
                            categories: res.data.data.date.reverse(),
                        }
                    },
                    seriesLine:[{
                        ...this.state.series,
                        data: res.data.data.detail.reverse()
                    }]
                })

            })
    }
    componentDidMount(){
        let data = {'chart_type':'daily','id_toko':'1'}
            ReportService.getSalesChart(data).then((res) => {
                this.setState({ 
                    options:{
                        ...this.state.options,
                        xaxis:{
                            categories: res.data.data.date.reverse(),
                        }
                    },
                    seriesLine:[{
                        ...this.state.series,
                        data: res.data.data.detail.reverse()
                    }]
                })

            })
    }
    render() {
        return (
            <main>
                <div class="d-flex justify-content-between">
                    <div>
                        <h3>Income</h3>
                    </div>
                    <div class="form-group">
                        <select class='form-control' onChange={this.changeDateData} value={this.state.DateData}>
                            <option value="daily">Daily Data</option>
                            <option value="weekly">Weekly Data</option>
                            <option value="monthly">Monthly Data</option>
                        </select>
                    </div>
                </div>
                <Chart  options={this.state.options}
                        series={this.state.seriesLine}
                        type="line"
                        height={375} />
            </main>
        )
    }
}

export default ReportSales;