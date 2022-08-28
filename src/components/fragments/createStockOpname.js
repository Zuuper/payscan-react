import React from 'react'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import StockOpnameService from '../../services/StockOpnameService'


import filterFactory, {
    textFilter,
    numberFilter,
} from "react-bootstrap-table2-filter";
import { Redirect } from 'react-router';
import Products from './productInventory'

class ModalEdit extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            jumlahFisik: 0,
            keterangan: '',
            index : 0,
            id_produk : 0
        };
        this.changeJumlahFisik = this.changeJumlahFisik.bind(this);
        this.changeKeterangan = this.changeKeterangan.bind(this);
        this.saveData = this.saveData.bind(this);
    }
    saveData(e) {
        e.preventDefault();
        let data = {
            id_toko: sessionStorage.getItem("id_toko"),
            id_stok_opname: sessionStorage.getItem("StockOpnameID"),
            id_produk: this.state.id_produk,
            stok_fisik: this.state.jumlahFisik,
            stok_opname_terakhir: sessionStorage.getItem('LastStockOpname'),
            keterangan: this.state.keterangan,
        };
        StockOpnameService.getCalculation(data).then((res)=>{
            console.log(res.data)
            if(sessionStorage.getItem('StockOpname')){
                let initiate = [...JSON.parse(sessionStorage.getItem('StockOpname'))]
                initiate[this.props.index] = res.data.data
                sessionStorage.setItem('StockOpname',JSON.stringify(initiate))
            }else{
                let StockOpnameData = []
                StockOpnameData.push(res.data.data)
                sessionStorage.setItem('StockOpname',JSON.stringify(StockOpnameData))
                // sessionStorage.setItem(name+'1',JSON.stringify(res.data.data))
            }
            window.location.reload()
        }).catch((err)=>{
            alert(err)
        })
        this.setState({
            jumlahFisik: 0,
            keterangan: "",
            index : 0,
            id_produk : 0
        })
    }
    updateState(data){
        console.log(data)
        let StockOpname = [...JSON.parse(sessionStorage.getItem('StockOpname'))]
        let dataStock = StockOpname[data]
        this.setState({
            jumlahFisik : dataStock['stok_fisik'],
            keterangan : dataStock['keterangan'],
            index : data,
            id_produk : dataStock['id_produk']
        })
    }
    changeJumlahFisik(e) {
        this.setState({ jumlahFisik: e.target.value });
    }
    changeKeterangan(e) {
        this.setState({ keterangan: e.target.value });
    }
    render(){
        return(
            <div class="modal fade" id="EditStockOpname" tabindex="-1" aria-labelledby="EditStockOpname" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Disable Product</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="kode_promo">physical counts</label>
                                    <input
                                        type="number" class="form-control" id="kode_promo" onChange={this.changeJumlahFisik}
                                        value={this.state.jumlahFisik}
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="kode_promo">Detail</label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        id="keterangan"
                                        max="100"
                                        onChange={this.changeKeterangan}
                                        value={this.state.keterangan}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-link" data-dismiss="modal">
                                cancel
                            </button>
                            <button
                                type="submit"
                                class="btn btn-primary"
                                data-dismiss="modal"
                                onClick={this.saveData}
                            >
                                Update
                            </button>
                        </div>
                </div>
            </div>
        </div>
        )
    }
}
const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prevPageText: "<",
    alwaysShowAllBtns: true,
    hideSizePerPage: true,
});
class CreateStockOpname extends React.Component {
    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            jumlahFisik : 0,
            keterangan : '',
            index : 0
        }
    }
    ProductStockOpnameDataColumn = [
        { dataField: "id_produk", text: "Product ID", filter: textFilter() },
        { dataField: "nama_produk", text: "Product Name", filter: textFilter() },
        { dataField: "selisih", text: "Difference", filter: numberFilter() },
        {
            dataField: "stok_keluar",
            text: "Stock Out",
            sort: true,
            filter: numberFilter(),
        },
        { dataField: "stok_fisik", text: "Physical Stock", filter: numberFilter() },
        { dataField: "stok_sistem", text: "System Stock", filter: numberFilter() },
        { dataField: "keterangan", text: "description", filter: textFilter() },
        {
            dataField: "",
            text: "Option",
            formatter: (rowContent, row, rowIndex) => {
                return (
                    <div>
                        <button class="btn btn-link" data-toggle="modal" data-target="#EditStockOpname" onClick={this.editData.bind(this,rowIndex)}>Edit</button>
                        <button class="btn btn-link" onClick={this.deleteData.bind(this,rowIndex)}>Remove Data</button>
                    </div>
                );
            },
        },
    ];
    editData(datas){
        console.log(datas)
        let StockOpname = [...JSON.parse(sessionStorage.getItem('StockOpname'))]
        let dataStock = StockOpname[datas]
        this.setState({
            jumlahFisik : dataStock['stok_fisik'],
            keterangan : dataStock['keterangan'],
            index : datas
        })
        this.child.current.updateState(datas)
        
    }
    deleteData(data){
        let StockOpname = [...JSON.parse(sessionStorage.getItem('StockOpname'))]
        StockOpname.splice(data,1)
        sessionStorage.setItem('StockOpname',JSON.stringify(StockOpname))
        window.location.reload()
    }
    saveData(e) {
        e.preventDefault();
        let StockOpname = [...JSON.parse(sessionStorage.getItem('StockOpname'))]
        let data = {
            id_toko: sessionStorage.getItem("id_toko"),
            id_pegawai: sessionStorage.getItem("id_pegawai"),
            id_stok_opname: sessionStorage.getItem("StockOpnameID"),
            datas : StockOpname,
        };
        StockOpnameService.createStockOpnameFinal(data).then((res)=>{
            console.log(res.data)
            sessionStorage.removeItem('StockOpnameID')
            sessionStorage.removeItem('StockOpname')
            window.location.reload()
        }).catch((err)=>{
            alert(err)
        })
    }
    render(){
        if(!window.sessionStorage.getItem('StockOpnameID')){
            return <Redirect to="/dashboard/stockOpname/list" />
        }
        return(
            <main>
                <section id="filter-section"
                        class="container-fluid py-4 mt-5">
                    <div>
                        <h2>Get Product for Stock Opname</h2>
                    </div>
                </section>
                <section class="mt-5">
                    <Products dataSpecific="StockOpname">
                    </Products>  
                </section>
                
                <section id="filter-section"
                        class="container-fluid py-4 mt-5">
                    <div>
                        <h2>Stock Opname List</h2>
                    </div>
                </section>
                {sessionStorage.getItem('StockOpname') &&
                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={JSON.parse(sessionStorage.getItem('StockOpname'))}
                        columns={this.ProductStockOpnameDataColumn}
                        search
                    >
                        {(props) => (
                            <div>
                                <section
                                    class="p-3 mt-4"
                                    style={{
                                        backgroundColor: "#ffffff",
                                        boxShadow: "1px 4px 7px rgba(0, 0, 0, 0.25)",
                                        borderRadius: "0.630rem",
                                    }}
                                >
                                    <BootstrapTable
                                        striped
                                        hover
                                        keyField="id"
                                        data={this.setState.data}
                                        columns={this.ProductStockOpnameDataColumn}
                                        bootstrap4
                                        pagination={pagination}
                                        filter={filterFactory()}
                                        {...props.baseProps}
                                    />
                                </section>
                            </div>
                        )}
                    </ToolkitProvider> 
                }
                {!sessionStorage.getItem('StockOpname') && 
                    <div className='text-center mt-4'>
                         <h2 className='mt-3'>
                            Add Stock Opname Data First 
                         </h2>
                    </div>
                }
                <ModalEdit ref={this.child} data={this.state.jumlahFisik} keterangan={this.state.keterangan} index={this.state.index}/>
                <section class="container-fluid py-4">
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal" >cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal"  onClick={this.saveData}>Create Stock Opname</button>
                    </div>
                </section>
            </main>
        )
    }
}
export default CreateStockOpname;