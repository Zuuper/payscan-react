import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Filter from '../fragments/filter'
import SupplierService from '../../services/SupplierService'
import AddIcon from '../../assets/icons/add.png'
import CreateSupplier from '../fragments/createSupplier'
import filterFactory, {
    textFilter,
} from "react-bootstrap-table2-filter";
class EditSupplier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_supplier: '',
            nama_supplier: '',
            alamat_supplier: '',
            no_telepon_supplier: '',
            password : ''

        }
        this.changeNamaSupplier = this.changeNamaSupplier.bind(this)
        this.changeAlamatSupplier = this.changeAlamatSupplier.bind(this)
        this.changeNoTelepon = this.changeNoTelepon.bind(this)
        this.passwordChange = this.passwordChange.bind(this)
        this.saveData = this.saveData.bind(this)
    }
    saveData(e) {
        e.preventDefault();
        let supplier = {
            'nama_supplier': this.state.nama_supplier,
            'alamat_supplier': this.state.alamat_supplier,
            'no_telepon_supplier': this.state.no_telepon_supplier,
            'id_pegawai' : sessionStorage.getItem('id_pegawai'),
            'password_pegawai' : this.state.password
        }
        SupplierService.update(supplier,this.state.id_supplier).then(res => {
            window.location.reload();
        })
    }
    passwordChange(event) {
        this.setState({ password: event.target.value });
    }
    changeNamaSupplier(e) {
        this.setState({ nama_supplier: e.target.value });
    }
    changeAlamatSupplier(e) {
        this.setState({ alamat_supplier: e.target.value });
    }
    changeNoTelepon(e) {
        this.setState({ no_telepon_supplier: e.target.value });
    }
    updateState(data) {
        SupplierService.getById(data).then((res) => {
            let data = res.data.data
            this.setState({
                id_supplier: data.id_supplier,
                nama_supplier: data.nama_supplier,
                alamat_supplier: data.alamat_supplier,
                no_telepon_supplier: data.no_telepon_supplier,
            })
        })
    }
    render() {
        return (
            <main>
                <div class="modal fade" id="editSupplier" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Supplier</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="kode_promo">Supplier Name</label>
                                        <input type="text" class="form-control" value={this.state.nama_supplier} onChange={this.changeNamaSupplier} required />
                                    </div>
                                    <div class="form-group">
                                        <label for="kode_promo">Supplier Address</label>
                                        <input type="text" class="form-control" value={this.state.alamat_supplier} onChange={this.changeAlamatSupplier} required />
                                    </div>
                                    <div class="form-group">
                                        <label for="kode_promo">Supplier Phone Number</label>
                                        <input type="telp" class="form-control" value={this.state.no_telepon_supplier} onChange={this.changeNoTelepon} required />
                                    </div>
                                    <div class="form-group">
                                        <label for="categoryName">password</label>
                                        <input type="password" class="form-control" value={this.state.password} onChange={this.passwordChange} required />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-primary" onClick={this.saveData}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
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
class Supplier extends Component {
    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            Supplier: []
        }
    }
    SupplierDataColumn = [
        { dataField: 'nama_supplier', text: 'Supplier Name', filter: textFilter() },
        { dataField: 'alamat_supplier', text: "Supplier Address",filter: textFilter()  },
        { dataField: 'no_telepon_supplier', text: "Phone Number" },
        {
            dataField: 'option', text: "Option", formatter: (rowContent, row) => {
                return (
                    <button class="btn btn-link" data-toggle="modal" data-target="#editSupplier" onClick={this.detailSupplierData.bind(this,row.id_supplier)}>Edit</button>
                )
            }
        }
    ]
    componentDidMount() {
        SupplierService.getAll().then((res) => {
            this.setState({ Supplier: res.data.data });
        });
    }
    detailSupplierData(row){
        this.child.current.updateState(row)
    }
    render() {
        return (
            <main>
                <ToolkitProvider
                    bootstrap4
                    keyField='id'
                    data={this.state.Supplier}
                    columns={this.SupplierDataColumn}
                    search
                >{
                        props => (
                            <div>
                                <Filter FilterName="Supplier" ContentName="Product">
                                    <button id="button-create-item" class="btn btn-primary px-4 ml-5" data-toggle="modal" data-target="#supplierModal">
                                        <img src={AddIcon} alt="Add Icon" />
                                    </button>
                                </Filter>
                                <section class="p-3 mt-4" style={{ backgroundColor: '#ffffff', boxShadow: "1px 4px 7px rgba(0, 0, 0, 0.25)", borderRadius: '0.630rem' }}>
                                    <BootstrapTable striped
                                        hover
                                        keyField='id'
                                        data={this.state.Supplier}
                                        columns={this.SupplierDataColumn}
                                        bootstrap4
                                        pagination={pagination}
                                        filter={filterFactory()}
                                        {...props.baseProps} />
                                </section>
                            </div>
                        )
                    }
                </ToolkitProvider>
                <EditSupplier ref={this.child} />
                <div class="modal fade" id="supplierModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Create</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <CreateSupplier />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }

}

export default Supplier