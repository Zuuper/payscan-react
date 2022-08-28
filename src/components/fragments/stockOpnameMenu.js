import React from 'react';
import Filter from '../fragments/filter'
import { Redirect } from 'react-router';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import AddIcon from '../../assets/icons/add.png'
import StockOpnameService from '../../services/StockOpnameService'
import { Link } from "react-router-dom"
import StockOpnameDetail from '../fragments/detailStockOpname'

class ModalApprove extends React.Component{
    render(){
        return(
            <div class="modal fade" id="approvedData" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Approve Stock Opname</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure want to Approve Stock Opname ?</p>
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

class ModalDisapprove extends React.Component{
    render(){
        return(
            <div class="modal fade" id="disapprovedData" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Disapprove Stock Opname</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Are you sure want Disapporve Stock Opname ?</p>
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
class StockOpnameMenu extends React.Component{
    constructor(props){
        super(props)
        this.child = React.createRef();
        this.state = {
            Data: [],
            idStockOpname : null,
            DataDetail : []
        }
    }
    StockOpnameDataColumn = [
        { dataField: 'id_stok_opname', text: 'Stock Opname Code' },
        { dataField: 'id_pegawai', text: 'Employee ID', sort: true },
        { dataField: 'tgl_stok_opname', text: 'Stock Opname Date', sort: true },
        { dataField: 'status', text: 'Status' },
        {
            dataField: 'option', text: 'option', formatter: (rowContent, row) => {
                if (row.status === 'pending validation') {
                    return (
                        <div>
                            <button class="btn btn-link" data-toggle="modal" data-target="#approvedData" onClick={this.addIdStockOpname.bind(this,row.id_stok_opname)}>Approve</button>
                            <button class="btn btn-link" data-toggle="modal" data-target="#disapprovedData" onClick={this.addIdStockOpname.bind(this,row.id_stok_opname)}>Disapprove</button>
                            <ModalDisapprove>
                                <button class="btn btn-primary" data-toggle="modal" data-target="#disapprovedData" onClick={this.disapprove.bind(this,row.id_stok_opname)}>disapproved</button>
                            </ModalDisapprove>
                            <ModalApprove>
                                <button class="btn btn-primary" data-toggle="modal" data-target="#approvedData" onClick={this.approve.bind(this,row.id_stok_opname)}>approved</button>
                            </ModalApprove>
                            <button class="btn btn-link" data-toggle="modal" data-target="#detailStockOpname" onClick={this.handleUpdateData.bind(this,row.id_stok_opname)}>View</button>
                        </div>
                    )
                }
                else if(row.status === 'approved') {
                    return (
                        <div>
                            <button class="btn btn-link" data-toggle="modal" data-target="#detailStockOpname" onClick={this.handleUpdateData.bind(this,row.id_stok_opname)}>View</button>
                        </div>
                        
                    )
                }
            }
        }
    ]
    addIdStockOpname(data){
        this.setState({
            idStockOpname : data
        })
        console.log(this.state.idStockOpname)
    }
    handleUpdateData(data){
        this.child.current.updateData(data)
    }
    approve(){
        console.log(this.state.idStockOpname)
        StockOpnameService.approved(this.state.idStockOpname).then((res) => {
            StockOpnameService.getAll().then((res) => {
                this.setState({ Data: res.data.data});
            });
        }).catch((err)=>{
            alert(err.response.data.message)

        })
    }
    
    disapprove(){
        console.log(this.state.idStockOpname)
        StockOpnameService.delete(this.state.idStockOpname).then((res) => {
            StockOpnameService.getAll().then((res) => {
                this.setState({ Data: res.data.data});
            });
        }).catch((err)=>{
            alert(err.response.data.message)

        })
    }

    componentDidMount() {
        StockOpnameService.getAll().then((res) => {
            this.setState({ Data: res.data.data});
        });
    }
    createStockOpname(){
        let data = {
            'id_toko' : sessionStorage.getItem('id_toko'),
            'id_pegawai' : sessionStorage.getItem('id_pegawai')
        }
        if(!sessionStorage.getItem('StockOpnameID')){
            StockOpnameService.create(data).then((res) =>{
                console.log(res.data.data.id_stok_opname)
                sessionStorage.setItem('StockOpnameID',res.data.data.id_stok_opname)
                sessionStorage.setItem('LastStockOpname',res.data.data.stok_opname_terakhir)
            }).catch((err)=>{
                alert(err.response.data.message)

            })
        }else{
            alert('Already Make New Stock Opname, better user what you already have')
        }
    }
    render(){
        const { match } = this.props;
        if(window.sessionStorage.getItem('StockOpnameID')){
            return <Redirect to="/dashboard/stockOpname/list/createStockOpname" />
        }
        return(
            <main>
                <ToolkitProvider
                            bootstrap4
                            keyField='id'
                            data={this.state.Data}
                            columns={this.StockOpnameDataColumn}
                            search
                        >{
                            props => (
                                <div>
                                    <section>
                                    <Filter FilterName="Stock Opname"
                                        ContentName="Promotion">
                                        <section class="pl-4">
                                            <Link id="button-create-item" to={`${match.path}/createStockOpname`} className="btn btn-primary px-4 ml-5" onClick={this.createStockOpname.bind(this)}>
                                                <img src={AddIcon} alt="Add Icon" />
                                            </Link>
                                        </section>
                                    </Filter>
                                    </section>
                                    <section class="p-3 mt-5" style={{ backgroundColor: '#ffffff', boxShadow: "1px 4px 7px rgba(0, 0, 0, 0.25)", borderRadius: '0.630rem' }}>
                                        <BootstrapTable striped
                                            hover
                                            keyField='id'
                                            data={this.state.Data}
                                            columns={this.StockOpnameDataColumn}
                                            bootstrap4
                                            pagination={pagination}
                                            {...props.baseProps} />
                                    </section>
                                </div>
                            )
                        }

                    </ToolkitProvider>
                <StockOpnameDetail id={this.state.idStockOpname} data={this.state.DataDetail} ref={this.child}/>
            </main>
        )
    }
}

export default StockOpnameMenu;