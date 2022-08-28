import React from 'react'
import Header from '../fragments/header'
import Filter from '../fragments/filter'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import CustomerService from '../../services/CustomerService'
import AddIcon from '../../assets/icons/add.png'
import CreateCustomer from '../fragments/createCustomer'

class ModalDelete extends React.Component{
    render(){
        return(
            <div>
                <div class="modal fade" id="deleteCustomer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Disable User</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure want to Disable User ?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-link" data-dismiss="modal" >cancel</button>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ModalActiivate extends React.Component{
    render(){
        return (
            <div>
                 <div class="modal fade" id="ActivateCustomer" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Activate User</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>Are you sure want to Activate User ?</p>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-link" data-dismiss="modal" >cancel</button>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
           
            </div>
        )
    }
}
const { SearchBar } = Search;
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
class Customer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Customer: [],
            ID : null
        }
    }
    CustomerDataColumn = [
        { dataField: 'name', text: 'Name',headerStyle: { width: '10%' }},
        { dataField: 'email', text: 'Email',headerStyle: { width: '20%' }},
        { dataField: 'alamat_user', text: 'Address',headerStyle: { width: '15%' }},
        { dataField: 'tgl_lahir_user', text: 'Born Date',headerStyle: { width: '8%' }},
        { dataField: 'jenis_kelamin_user', text: 'Gender',headerStyle: { width: '8%' }},
        { dataField: 'total_poin_user', text: 'Point',headerStyle: { width: '5%' }},
        { dataField: 'saldo_hutang', text: 'User Debt',headerStyle: { width: '5%' }},
        { dataField: 'created_at', text: 'Created at',headerStyle: { width: '15%' }},
        { dataField: 'status', text: 'Status',headerStyle: { width: '5%' }},
        { dataField: 'option', text: 'option', headerStyle: { width: '7%' }, formatter: (rowContent, row) => {
            if (row.status === 'aktif') {
                return (
                    <div>
                        <button class="btn btn-link" data-toggle="modal" data-target="#deleteCustomer" onClick={this.addId.bind(this,row.id)}>disable</button>
                        <ModalDelete >
                            <button class="btn btn-primary" data-toggle="modal" data-target="#deleteCustomer" onClick={this.deleteData.bind(this,row.id)}>disable</button>
                        </ModalDelete>
                    </div>
                )
            } else if (row.status === 'nonaktif') {
                return (
                    <div>
                        <button class="btn btn-link" data-toggle="modal" data-target="#ActivateCustomer" onClick={this.addId.bind(this,row.id)}>activate</button>
                        <ModalActiivate >
                            <button class="btn btn-primary" data-toggle="modal" data-target="#ActivateCustomer" onClick={this.activateData.bind(this,row.id)}>Activate</button>
                        </ModalActiivate>
                    </div>
                )
            }
        }}
    ]
    addId(data){
        this.setState({
            ID : data
        })
    }
    componentDidMount() {
        CustomerService.getAll().then((res) => {
            this.setState({ Customer: res.data.data});
        });
    }
    deleteData(data){
        CustomerService.delete(this.state.ID).then((res) => {
            CustomerService.getAll().then((res) => {
                this.setState({ Customer: res.data.data});
            });
        }).catch((err)=>{
            console.log(err.response.data)
            alert(err.response.data.message)
        });
    }
    activateData(data){
        CustomerService.activate_customer(this.state.ID).then((res) => {
            CustomerService.getAll().then((res) => {
                this.setState({ Customer: res.data.data});
            });
        }).catch((err)=>{
            console.log(err.response.data)
            alert(err.response.data.message)
        });
    }
    render() {
        return (
            <main>
                <Header titleHeader="Customer" username={sessionStorage.getItem('nama_pegawai')} />
                <ToolkitProvider
                    bootstrap4
                    keyField='idCustomer'
                    data={this.state.Customer}
                    columns={this.CustomerDataColumn}
                    search
                >{
                    props => (
                    <div>
                        <Filter FilterName="Filter"
                            ContentName="Customer">
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
                                keyField='idCustomer'
                                data={this.state.Customer}
                                columns={this.CustomerDataColumn}
                                bootstrap4
                                pagination={pagination}
                                {...props.baseProps} />
                        </section>
                    </div>
                )
                    }

                </ToolkitProvider>
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
                                    <CreateCustomer />
                                </div>
                            </div>
                        </div>
                    </div>
                
            </main>
        )
    }
}

export default Customer;