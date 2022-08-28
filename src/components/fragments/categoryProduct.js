import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import Filter from '../fragments/filter'

import CategoryService from '../../services/CategoryService'
import AddIcon from '../../assets/icons/add.png'
import CreateCategory from '../fragments/createCategory'
import filterFactory, {
    textFilter,
} from "react-bootstrap-table2-filter";
class EditCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kategori: '',
            id_kategori: '',
            password : ''
        }

        this.categoryChange = this.categoryChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.saveData = this.saveData.bind(this);
    }
    categoryChange(event) {
        this.setState({ kategori: event.target.value });
    }
    passwordChange(event) {
        this.setState({ password: event.target.value });
    }
    saveData(e) {
        e.preventDefault();
        console.log(this.state.id_kategori)
        let Data = {
            'id_toko': sessionStorage.getItem('id_toko'),
            'kategori': this.state.kategori,
            'id_pegawai' : sessionStorage.getItem('id_pegawai'),
            'password_pegawai' : this.state.password
        }
        CategoryService.update(Data,this.state.id_kategori).then(res => {
            window.location.reload();
        })
    }
    updateState(data) {
        CategoryService.getById(data).then((res) => {
            let data = res.data.data
            this.setState({
                id_kategori: data.id_kategori,
                kategori: data.kategori,
            })
        })
    }
    render(){
        return (
            <main>
                <div class="modal fade" id="editCategory" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Category</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form >
                                    <div class="form-group">
                                        <label for="categoryName">Category Name</label>
                                        <input type="text" class="form-control" value={this.state.kategori} onChange={this.categoryChange} required />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-body">
                                <form >
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
class Category extends Component {
    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        CategoryService.getAll()
            .then(response => {
                this.setState({
                    categories: response.data.data
                });
            });
    }
    CategoryDataColumn = [
        { dataField: 'id_kategori', text: "ID Category"},
        { dataField: 'kategori', text: "Category Name", filter: textFilter() },
        {
            dataField: 'option', text: "Option", formatter: (rowContent, row) => {
                return (
                    <button class="btn btn-link" data-toggle="modal" data-target="#editCategory" onClick={this.detailCategoryData.bind(this,row.id_kategori)}>Edit</button>
                )
            }
        }
    ]
    detailCategoryData(row){
        this.child.current.updateState(row)
    }
    render() {
        return (
            <main>
                <ToolkitProvider
                    bootstrap4
                    keyField='id'
                    data={this.state.categories}
                    columns={this.CategoryDataColumn}
                    search
                >{
                        props => (
                            <div>
                                <Filter id="Category" FilterName="Category" ContentName="Category">
                                    <button id="button-create-item" class="btn btn-primary px-4 ml-5" data-toggle="modal" data-target="#categoryModal">
                                        <img src={AddIcon} alt="Add Icon" />
                                    </button>
                                </Filter>
                                <section class="p-3 mt-4" style={{ backgroundColor: '#ffffff', boxShadow: "1px 4px 7px rgba(0, 0, 0, 0.25)", borderRadius: '0.630rem' }}>
                                    <BootstrapTable striped
                                        hover
                                        keyField='id'
                                        data={this.state.categories}
                                        columns={this.CategoryDataColumn}
                                        bootstrap4
                                        pagination={pagination}
                                        filter={filterFactory()}
                                        {...props.baseProps} />
                                </section>
                            </div>
                        )
                    }
                </ToolkitProvider>
                <EditCategory ref={this.child}/>
                <div class="modal fade" id="categoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Create</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <CreateCategory />
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        )
    }
}

export default Category