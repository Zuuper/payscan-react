import React from 'react';
import Header from '../fragments/header'
import Filter from '../fragments/filter'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import PromotionService from '../../services/PromoService'
import PromotionProductService from '../../services/PromoProductService'
import AddIcon from '../../assets/icons/add.png'
import CreatePromotion from '../fragments/createPromotion'

// Masih error waktu delete data
class ModalDelete extends React.Component{
    render(){
        return(
            <div class="modal fade" id="disablePromotion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Disable Promotion</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure want Disable Promotion ?</p>
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
class ModalDeleteProduct extends React.Component{
    render(){
        return(
            <div class="modal fade" id="disableProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Disable Product Promotion</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure want Disable Product Promotion ?</p>
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
class Promotion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Promotions: [],
            id_promo:'',
            ProductDiscount: [],
            ID : null,
            IDProduct : null
        }
        // this.deleteData = this.deleteData.bind(this)
    }
    PromotionDataColumn = [
        { dataField: 'kode_promo', text: 'Promo Code' },
        { dataField: 'besar_promo_diskon', text: 'Promotion Discount', sort: true },
        { dataField: 'tgl_mulai_diskon', text: 'Start Date', sort: true },
        { dataField: 'tgl_berakhir_diskon', text: 'End Date', sort: true },
        { dataField: 'status', text: 'Status' },
        {
            dataField: 'option', text: 'option', formatter: (rowContent, row) => {
                console.log(rowContent)
                if (row.status === 'aktif') {
                    return (
                        <div>
                            <button class="btn btn-link" data-toggle="modal" data-target="#disablePromotion" onClick={this.addId.bind(this,row.id_promo_diskon)}>disable</button>
                            <ModalDelete >
                                <button class="btn btn-primary" data-toggle="modal" data-target="#disablePromotion" onClick={this.deleteData.bind(this,row.id_promo_diskon)}>disable</button>
                            </ModalDelete>
                        </div>
                    )
                }
                else if(row.status === 'non aktif') {
                    return (
                        <div>
                            <button class="btn btn-link" data-toggle="modal" data-target="#disablePromotion" onClick={this.addId.bind(this,row.id_promo_diskon)}>activate</button>
                            <ModalDelete >
                                <button class="btn btn-primary" data-toggle="modal" data-target="#disablePromotion" onClick={this.deleteData.bind(this,row.id_promo_diskon)}>Activate</button>
                            </ModalDelete>
                        </div>
                        
                    )
                }
            }
        },
    ]
    PromotionProductDataColumn = [
        { dataField: 'kode_promo', text: 'Promo Code' },
        { dataField: 'nama_produk', text: 'Product Name', sort: true },
        { dataField: 'besar_promo_diskon', text: 'Promotion Discount', sort: true },
        { dataField: 'tgl_mulai_diskon', text: 'Start Date', sort: true },
        { dataField: 'tgl_berakhir_diskon', text: 'End Date', sort: true },
        { dataField: 'status', text: 'Status' },
        {
            dataField: 'option', text: 'option', formatter: (rowContent, row) => {
                console.log(rowContent)
                if (row.status === 'aktif') {
                    return (
                        <div>
                            <button class="btn btn-link" data-toggle="modal" data-target="#disableProduct" onClick={this.addIdProduct.bind(this,row.id_promo_produk)}>disable</button>
                            <ModalDeleteProduct>
                                <button class="btn btn-primary" data-toggle="modal" data-target="#disableProduct" onClick={this.deleteProductData.bind(this,row.id_promo_produk)}>disable</button>
                            </ModalDeleteProduct>
                        </div>
                    )
                }
                else if(row.status === 'non aktif') {
                    return (
                        <div>
                            <button class="btn btn-link" data-toggle="modal" data-target="#disableProduct" onClick={this.addIdProduct.bind(this,row.id_promo_produk)}>activate</button>
                            <ModalDeleteProduct >
                                <button class="btn btn-primary" data-toggle="modal" data-target="#disableProduct" onClick={this.deleteProductData.bind(this,row.id_promo_produk)}>Activate</button>
                            </ModalDeleteProduct>
                        </div>
                        
                    )
                }
            }
        },
    ]
    addId(data){
        this.setState({
            ID : data
        })
    }
    addIdProduct(data){
        this.setState({
            IDProduct : data
        })
    }
    componentDidMount() {
        PromotionService.getAll().then((res) => {
            this.setState({ Promotions: res.data.data});
        });
        PromotionProductService.getAll().then((res) => {
            this.setState({ ProductDiscount: res.data.data});
        });
    }
    deleteData(){
        PromotionService.delete(this.state.ID).then((res) => {
            PromotionService.getAll().then((res) => {
                this.setState({ Promotions: res.data.data});
            });
        });
    }
    deleteProductData(){
        PromotionProductService.delete(this.state.IDProduct).then((res) => {
            PromotionProductService.getAll().then((res) => {
                this.setState({ ProductDiscount: res.data.data});
            });
        });
    }
    render() {
        return (
            <main>
                <section>
                    <Header titleHeader="Promotion" username={sessionStorage.getItem('nama_pegawai')} />
                    <ToolkitProvider
                        bootstrap4
                        keyField='id'
                        data={this.state.Promotions}
                        columns={this.PromotionDataColumn}
                        search
                    >{
                            props => (
                                <div>
                                    <Filter FilterName="Promotion"
                                        ContentName="Promotion">
                                        <section class="pl-4">
                                            <SearchBar className="mr-5" {...props.searchProps} />
                                            <button id="button-create-item" class="btn btn-primary px-4 ml-5" data-toggle="modal" data-target="#exampleModal">
                                                <img src={AddIcon} alt="Add Icon" />
                                            </button>
                                        </section>
                                    </Filter>
                                    <section class="p-3 mt-5" style={{ backgroundColor: '#ffffff', boxShadow: "1px 4px 7px rgba(0, 0, 0, 0.25)", borderRadius: '0.630rem' }}>
                                        <BootstrapTable striped
                                            hover
                                            keyField='id'
                                            data={this.state.Promotions}
                                            columns={this.PromotionDataColumn}
                                            bootstrap4
                                            pagination={pagination}
                                            {...props.baseProps} />
                                    </section>
                                </div>
                            )
                        }

                    </ToolkitProvider>
                </section>
                <section class="mt-5">
                    <ToolkitProvider
                            bootstrap4
                            keyField='id'
                            data={this.state.ProductDiscount}
                            columns={this.PromotionProductDataColumn}
                            search
                        >{
                                props => (
                                    <div>
                                        <Filter FilterName="Product Discount"
                                            ContentName="Promotion">
                                            <section class="pl-4">
                                                <SearchBar className="mr-5" {...props.searchProps} />
                                            </section>
                                        </Filter>
                                        <section class="p-3 mt-5" style={{ backgroundColor: '#ffffff', boxShadow: "1px 4px 7px rgba(0, 0, 0, 0.25)", borderRadius: '0.630rem' }}>
                                            <BootstrapTable striped
                                                hover
                                                keyField='id'
                                                data={this.state.ProductDiscount}
                                                columns={this.PromotionProductDataColumn}
                                                bootstrap4
                                                pagination={pagination}
                                                {...props.baseProps} />
                                        </section>
                                    </div>
                                )
                            }

                    </ToolkitProvider>
                </section>
                <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Create</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <CreatePromotion />
                                </div>
                            </div>
                        </div>
                    </div>
            </main>
        )
    }
}

export default Promotion;
