import React from 'react';
import Header from '../fragments/header'
import Filter from '../fragments/filter'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import ProductService from '../../services/ProductService'
import AddIcon from '../../assets/icons/add.png'
import CreateProduct from '../fragments/createProduct'
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import '../css/productCard.css';
import CategoryService from '../../services/CategoryService'
import SupplierService from '../../services/SupplierService'
import DetailProduct from '../fragments/DetailProduct'

class ModalDelete extends React.Component{
    render(){
        return(
            <div class="modal fade" id="deleteProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Disable Product</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure want Delete Product ?</p>
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

class Product extends React.Component {
    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            Product: [],
            data: [],
            Category: [],
            Supplier: [],
            ID : null
        }
    }
    componentDidMount() {
        ProductService.getAll().then((res) => {
            this.setState({ Product: res.data.data });
        });
        CategoryService.getAll().then((res)=>{
            this.setState({
                Category : res.data.data
            })
        })
        SupplierService.getAll().then((res) => {
            this.setState({
                Supplier: res.data.data
            })
        })
    }
    ProductDataColumn = [
        { dataField: 'nama_produk', text: 'Product Name', filter: textFilter() },
        { dataField: 'harga_beli', text: 'Purchase Price', sort: true, filter: numberFilter() },
        { dataField: 'harga_produk', text: 'Sales Price', sort: true, filter: numberFilter() },
        { dataField: 'kategori', text: 'Category', filter: textFilter() },
        { dataField: 'supplier', text: 'Supplier', filter: textFilter() },
        {
            dataField: 'option', text: 'option', formatter: (rowContent, row) => {
                return (
                            <div>
                                <button class="btn btn-link" data-toggle="modal" data-target="#editProduct" onClick={this.detailProductData.bind(this,row.id_produk)}>Edit and Detail</button>
                                <button class="btn btn-link" data-toggle="modal" data-target="#deleteProduct" onClick={this.addId.bind(this,row.id_produk)}>Delete</button>
                                <ModalDelete >
                                    <button class="btn btn-primary" data-toggle="modal" data-target="#deleteProduct" onClick={this.deleteData.bind(this,row.id_produk)}>disable</button>
                                </ModalDelete>
                            </div>                              
                )
            }
        }
    ]
    detailProductData(row){
        ProductService.getById(row).then((res)=>{
            this.setState({
                data: res.data.data
            })
        })
        this.child.current.updateState(row)
    }
    addId(data){
        this.setState({
            ID : data
        })
    }
    deleteData(){
        ProductService.delete(this.state.ID).then((res) => {
            ProductService.getAll().then((res) => {
                this.setState({ Product: res.data.data});
            });
        });
    }
    render() {
        return (
            <section id="ProductSupply">
                <Header titleHeader="Product" username={sessionStorage.getItem('nama_pegawai')} />
                <ToolkitProvider
                    bootstrap4
                    keyField='id'
                    data={this.state.Product}
                    columns={this.ProductDataColumn}
                    search
                >{
                        props => (
                            <div>
                                <Filter id="product" FilterName="Product" ContentName="none">
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
                <DetailProduct ref={this.child} data={this.state.data} type="editProduct" DisabledStatus={false}></DetailProduct>
                <div class="modal fade" id="productModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Create</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <CreateProduct />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        )
    }
}

export default Product;