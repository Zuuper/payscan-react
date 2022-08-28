import React from 'react'
import Header from '../fragments/header'
// import Filter from '../fragments/filter'
// import Chart from "react-apexcharts";
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import '../css/report.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ReportSummary from '../fragments/ReportSummary'
import ReportPurchaseChartBar from '../fragments/reportPurchaseChartBar'
import ReportSalesChartBar from '../fragments/reportSalesChartBar'
import ReportPurchaseChartPie from '../fragments/reportPurchaseChartPie'
import ReportSalesChartPie from '../fragments/reportSalesChartPie'
import GenerateReportPDF from '../fragments/generateReportPDF'
import UserService from '../../services/UserService'


class Report extends React.Component {
  componentDidMount(){
    if(!sessionStorage.getItem('id_pegawai')){
      UserService.getAll().then((res) => {
        sessionStorage.setItem('id_pegawai',res.data.id_pegawai)
        sessionStorage.setItem('id_toko',res.data.id_toko)
        sessionStorage.setItem('nama_pegawai', res.data.nama_pegawai)
    }).catch((err) => {
        alert(err.response.data.message)
    })
    }
  }
  render() {

    return (
      <main>
        <Header titleHeader="Report" username={sessionStorage.getItem('nama_pegawai')} />
        {/* Report Card */}
        <ReportSummary />
        {/* Chart analisa */}
        <section class="row d-flex justify-content-center my-5">
          <div class="col-8">
            <div class="chart p-4">
              <ReportSalesChartBar ChartData="sales" />
            </div>
          </div>
          <div class="col-4">
            <div class="chart p-4">
              <ReportSalesChartPie/>

            </div>
          </div>
        </section>
        <section class="row d-flex justify-content-center my-5">
          <div class="col-8">
            <div class="chart p-4">
              <ReportPurchaseChartBar/>
            </div>
          </div>
          <div class="col-4">
            <div class="chart p-4">
              <ReportPurchaseChartPie/>

            </div>
          </div>
        </section>
        {/* <GenerateReportPDF /> */}
      </main>
    )
  }

}

export default Report;