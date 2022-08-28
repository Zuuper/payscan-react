import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import StockOpnameService from '../../services/StockOpnameService';
import Pdf from "react-to-pdf";

const options = {
    orientation: 'landscape'
};

class StockOpnameDetail extends React.Component {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
        this.state = {
            Data: [],
            DataStockOpname: []
        }
    }
    updateData(data) {
        StockOpnameService.getById(data).then((res) => {
            console.log(res.data.stock_opname)
            this.setState({
                Data: res.data.data,
                DataStockOpname: res.data.stock_opname
            })
        })
    }
    ProductStockOpnameDataColumn = [
        { dataField: "id_produk", text: "Product ID" },
        { dataField: "nama_produk", text: "Product Name" },
        { dataField: "selisih", text: "Difference" },
        { dataField: "stok_keluar", text: "Stock Out" },
        { dataField: "stok_masuk", text: "Stock In" },
        { dataField: "stok_fisik", text: "Physical Stock" },
        { dataField: "stok_sistem", text: "System Stock" },
        { dataField: "keterangan", text: "description" }
    ];
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
                                    <br/>

                                    {this.state.DataStockOpname.map((data, index) => (
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h5 className="font-weight-normal">ID Stock Opname : {data.id_stok_opname}</h5>
                                                <h5 className="font-weight-normal">ID Pegawai : {data.id_pegawai} </h5>
                                            </div>
                                            <div>
                                                <h5 className="font-weight-normal">Date : {data.tgl_stok_opname} </h5>
                                                <h5 className="font-weight-normal">Status : {data.status}</h5>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                                <section>
                                    <ToolkitProvider
                                        bootstrap4
                                        keyField="id"
                                        data={this.state.Data}
                                        columns={this.ProductStockOpnameDataColumn}
                                    >
                                        {(props) => (
                                            <div>
                                                <section
                                                    class="p-3 mt-4"
                                                    style={{
                                                        fontSize: '11px',
                                                    }}
                                                >
                                                    <BootstrapTable
                                                        striped
                                                        hover
                                                        keyField="id"
                                                        data={this.state.Data}
                                                        columns={this.ProductStockOpnameDataColumn}
                                                        bootstrap4
                                                        {...props.baseProps}
                                                    />
                                                </section>
                                            </div>
                                        )}
                                    </ToolkitProvider>
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
export default StockOpnameDetail