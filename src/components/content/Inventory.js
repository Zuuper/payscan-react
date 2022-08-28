import React, { Component } from 'react';
import Header from '../fragments/header';
// import Filter from '../fragments/filter'
// import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
// import filterFactory, { textFilter,numberFilter  } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import Categories from '../fragments/categoryProduct'
import Products from '../fragments/productInventory'
import Supplier from '../fragments/SupplierProduct'


class Inventory extends Component {
    render() {
        return (
            <main>
                <Header titleHeader="Inventory" username={sessionStorage.getItem('nama_pegawai')} />
                <section id="ProductSupply">
                    <Products />  
                </section>
                <section id="CategoryAndSupplier" class="mt-5">
                    <div class="row">
                        <div class="col-5" id="CategoryProduct">
                            <Categories />
                        </div>
                        <div class="col-7" id="SupplierProduct">
                            <Supplier />
                        </div>
                    </div>
                </section>
            </main>
        )
    }
}

export default Inventory;