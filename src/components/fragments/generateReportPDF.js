import React from 'react';
import ReportService from '../../services/ReportService';
import Pdf from "react-to-pdf";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
const options = {
    orientation: 'landscape'
};
class DetailPDF extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
        this.state = {
            Penjualan: [],
            Pembelian: [],
            Data: []
        }
    }
    updateData(data) {
        console.log(data)
        ReportService.generatePDF(data).then((res) => {
            if (data['data_type'] === 'all') {
                this.setState({
                    Data: res.data.data,
                    Penjualan: res.data.penjualan,
                    pembelian: res.data.pembelian
                })
            } else if (data['data_type'] === 'purchase') {
                this.setState({
                    Data: res.data.data,
                    pembelian: res.data.pembelian
                })
            } else if (data['data_type'] === 'sales') {
                this.setState({
                    Data: res.data.data,
                    Penjualan: res.data.penjualan,
                })
            }

        })
    }
    PurchaseeDataColumn = [
        { dataField: "id_produk", text: "Product ID" },
        { dataField: "nama_produk", text: "Product Name" },
        { dataField: "selisih", text: "Difference" },
        { dataField: "stok_keluar", text: "Stock Out" },
        { dataField: "stok_masuk", text: "Stock In" },
        { dataField: "stok_fisik", text: "Physical Stock" },
        { dataField: "stok_sistem", text: "System Stock" },
        { dataField: "keterangan", text: "description" }
    ];
    SalesDataColumn = [

    ]
    render() {
        return (
            <main>
                <div class="modal fade" id="detailStockOpname" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-xl">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body" ref={this.ref}>
                                <section className="mx-3">
                                    <h4 class="modal-title font-weight-bold" id="exampleModalLabel">Product Stock Opname</h4>
                                    <br />
                                </section>
                                {this.props.dataType === 'all' && 
                                    <div>
                                        {this.state.Data.map((data, index) => (
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h5 className="font-weight-normal">Sales : {data.sales}</h5>
                                                <h5 className="font-weight-normal">Purchase : {data.purchase} </h5>
                                                <h5 className="font-weight-normal">Customer : {data.customer} </h5>
                                            </div>
                                            <div>
                                                <h5 className="font-weight-normal">Gross Profit : {data.gross_profit} </h5>
                                                <h5 className="font-weight-normal">total Purchase : {data.total_purchase} </h5>
                                                <h5 className="font-weight-normal">Clean Profit : {data.gross_profit - data.total_purchase} </h5>
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                }
                                {this.props.dataType === 'purchase' && 
                                    <div>
                                    </div>
                                }
                                {this.props.dataType === 'sales' && 
                                    <div>
                                    </div>
                                }
                                <section>
                                </section>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-link" data-dismiss="modal" >close</button>
                                <Pdf targetRef={this.ref} filename="stok_opname.pdf" options={options}>
                                    {({ toPdf }) => <button class="btn btn-primary" onClick={toPdf}>Generate Pdf</button>}
                                </Pdf>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        )
    }
}
class GenerateReport extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            dateStart: '',
            dateEnd: '',
            type: '',
            Penjualan: [],
            Pembelian: [],
            Data: []
        }
        this.changeDateStart = this.changeDateStart.bind(this)
        this.changeDateEnd = this.changeDateEnd.bind(this)
        this.changetype = this.changetype.bind(this)
    }
    handleUpdateData = () => {
        let data = {
            'data_type': this.state.type,
            'start_date': this.state.dateStart,
            'end_date': this.state.end_date
        }
        this.child.current.updateData(data)
    }
    changeDateStart(e) {
        this.setState({ dateStart: e.target.value });
    }
    changeDateEnd(e) {
        this.setState({ dateEnd: e.target.value });
    }
    changetype(e) {
        this.setState({ type: e.target.value });
    }
    render() {
        return (
            <main id="filter-section" class="mb-58">
                <div class="container-fluid py-4 d-flex justify-content-between align-items-center">
                    <div>
                        <h3>Generate PDF</h3>
                    </div>
                    <div class="form-group row">
                        <label for="tanggal_mulai">Data</label>
                        <select class='form-control' onChange={this.changetype}>
                            <option value="all">All Data</option>
                            <option value="purchase">Purchase Data</option>
                            <option value="sales">Sales Data</option>
                        </select>
                    </div>
                    <div class="form-group row">
                        <label for="tanggal_mulai">Start Date</label>
                        <input type="date" class="form-control" id="tanggal_mulai" onChange={this.changeDateStart} required />
                    </div>
                    <div class="form-group row">
                        <label for="tanggal_berakhir">End Date</label>
                        <input type="date" class="form-control" id="tanggal_berakhir" onChange={this.changeDateEnd} required />
                    </div>
                    <button class="btn btn-primary px-5" onClick={this.handleUpdateData}>Generate Report</button>
                </div>
                <DetailPDF dataType={this.state.type} ref={this.child} />
                <section>

                </section>
            </main>
        )
    }
}

export default GenerateReport