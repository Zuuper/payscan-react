import React from 'react'
import Header from '../fragments/header'
import Filter from '../fragments/filter'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import AddIcon from '../../assets/icons/add.png'
import PurchaseService from '../../services/PurchaseService'

class ModalDelete extends React.Component{
    render(){
        return(
            <div class="modal fade" id="deletePurchase" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Disapprove Purchase</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure want Disapprove Data ?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal" >cancel</button>
                        {this.props.children}
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

class ModalApprove extends React.Component{
    render(){
        return(
            <div class="modal fade" id="approvePurchase" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Approve Purchase</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure want Approve Data ?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal" >cancel</button>
                        {this.props.children}
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
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prevPageText: '<',
    alwaysShowAllBtns: true,
    hideSizePerPage: true
})
const { SearchBar } = Search;
class Purchase extends React.Component{
    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            Product: [],
            ProductValidation: [],
            ID : null
        }
    }
    componentDidMount(){
        PurchaseService.getAll().then((res) =>{
            this.setState({Product : res.data.data})
        })
        PurchaseService.getPembelianPending().then((res) => {
            this.setState({ProductValidation : res.data.data})
        })
    }
    ProductDataColumn = [
        { dataField: 'nama_produk', text: 'Product Name', filter: textFilter() },
        { dataField: 'nama_supplier', text: 'Supplier', filter: textFilter() },
        { dataField: 'harga_beli', text: 'Product Price', sort: true, filter: numberFilter() },
        { dataField: 'jumlah_barang', text: 'purchase amount', sort : true, filter: numberFilter()},
        { dataField: 'total_pembelian', text: 'Total Purchase', sort : true, filter: numberFilter()},
        { dataField: 'status', text: 'Status', filter: textFilter()},
    ]
    PurchaseValidationColumn = [
        { dataField: 'nama_produk', text: 'Product Name', filter: textFilter() },
        { dataField: 'nama_supplier', text: 'Supplier', filter: textFilter() },
        { dataField: 'harga_beli', text: 'Product Price', sort: true, filter: numberFilter() },
        { dataField: 'jumlah_barang', text: 'purchase amount'},
        { dataField: 'total_pembelian', text: 'Total Purchase'},
        { dataField: 'tgl_pembelian', text: 'Purchase Date'},
        {
            dataField: 'option', text: 'option', formatter: (rowContent, row) => {
                return (
                    <div>
                        <button class="btn btn-link" data-toggle="modal" data-target="#approvePurchase" onClick={this.addId.bind(this,row.id_pembelian)}>Approve</button>
                        <button class="btn btn-link" data-toggle="modal" data-target="#deletePurchase" onClick={this.addId.bind(this,row.id_pembelian)}>Delete</button>
                        <ModalApprove>
                            <button class="btn btn-primary" data-toggle="modal" data-target="#approvePurchase" onClick={this.approveData.bind(this,row.id_pembelian)}>Approve</button>
                        </ModalApprove>
                        <ModalDelete>
                            <button class="btn btn-primary" data-toggle="modal" data-target="#deletePurchase" onClick={this.deleteData.bind(this,row.id_pembelian)}>Delete</button>
                        </ModalDelete>
                    </div>
                )
            }
        }
    ]
    addId(data){
        this.setState({
            ID : data
        })
    }
    approveData(){
        PurchaseService.validateData(this.state.ID).then((res) => {
            PurchaseService.getAll().then((res) =>{
                this.setState({Product : res.data.data})
            })
            PurchaseService.getPembelianPending().then((res) => {
                this.setState({ProductValidation : res.data.data})
            })
            console.log(res.data)
        }).catch((err) => {
            console.log(err.response.message)
            alert(err.response.data.message)
        })
    }
    deleteData(){
        PurchaseService.delete(this.state.ID).then((res) => {
            PurchaseService.getAll().then((res) =>{
                this.setState({Product : res.data.data})
            })
            PurchaseService.getPembelianPending().then((res) => {
                this.setState({ProductValidation : res.data.data})
            })
        }).catch((err) => {
            console.log(err.response)
            alert(err.response.data.message)
        })
    }
    render(){
        return(
            <main>
                <Header titleHeader="Purchases" username={sessionStorage.getItem('nama_pegawai')} />

                <section class="mt-5">
                <ToolkitProvider
                        bootstrap4
                        keyField='id'
                        data={this.state.ProductValidation}
                        columns={this.PurchaseValidationColumn}
                        search
                    >{
                        props => (
                            <div>
                                <Filter  FilterName="Purchase Validation" ContentName="none">
                                    <section class="pl-4">
                                        <SearchBar className="mr-5" {...props.searchProps} />
                                    </section>
                                </Filter>
                                <section class="p-3 mt-4" style={{ backgroundColor: '#ffffff', boxShadow: "1px 4px 7px rgba(0, 0, 0, 0.25)", borderRadius: '0.630rem' }}>
                                    <BootstrapTable striped
                                        hover
                                        keyField='id'
                                        data={this.state.ProductValidation}
                                        columns={this.PurchaseValidationColumn}
                                        bootstrap4
                                        pagination={pagination}
                                        filter={filterFactory()}
                                        {...props.baseProps} />
                                </section>
                            </div>
                        )
                    }
                    </ToolkitProvider>
                </section>
                <section class="mt-5 pt-4">
                    <ToolkitProvider
                        bootstrap4
                        keyField='id'
                        data={this.state.Product}
                        columns={this.ProductDataColumn}
                        search
                    >{
                        props => (
                            <div>
                                <Filter  FilterName="Purchase History" ContentName="none">
                                    <section class="pl-4">
                                        <SearchBar className="mr-5" {...props.searchProps} />
                                        <button id="button-create-item" class="btn btn-primary px-4 ml-5" data-toggle="modal" data-target="#productModal">
                                            <img src={AddIcon} alt="Add Icon" />
                                        </button>
                                    </section>
                                </Filter>
                                <section class="p-3 mt-4" style={{ backgroundColor: '#ffffff', boxShadow: "1px 4px 7px rgba(0, 0, 0, 0.25)", borderRadius: '0.630rem' }}>
                                    <BootstrapTable striped
                                        hover
                                        keyField='id'
                                        data={this.state.Product}
                                        columns={this.ProductDataColumn}
                                        bootstrap4
                                        pagination={pagination}
                                        filter={filterFactory()}
                                        {...props.baseProps} />
                                </section>
                            </div>
                        )
                    }
                    </ToolkitProvider>
                </section>
            </main>
        )
    }
}

export default Purchase