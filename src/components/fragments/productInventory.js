import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import Filter from "../fragments/filter";
import ProductService from "../../services/ProductService";
import filterFactory, {
    textFilter,
    numberFilter,
} from "react-bootstrap-table2-filter";
import PurchaseService from "../../services/PurchaseService";
import PromotionService from "../../services/PromoProductService";
import StockOpnameService from  "../../services/StockOpnameService";
class ModalPurchase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jumlah_barang: 0,
            id_produk: "",
            id_supplier: "",
            harga_barang: 0,
            harga_beli: 0,
        };
        this.changeJumlahBarang = this.changeJumlahBarang.bind(this);
        this.changeHargaBarang = this.changeHargaBarang.bind(this);
        this.saveData = this.saveData.bind(this);
    }
    saveData(e) {
        e.preventDefault();
        let Data = {
            id_toko: sessionStorage.getItem("id_toko"),
            id_pegawai: sessionStorage.getItem("id_pegawai"),
            id_produk: this.props.data.id_produk,
            id_supplier: this.props.data.id_supplier,
            jumlah_barang: this.state.jumlah_barang,
            harga_beli: this.state.harga_barang,
        };

        PurchaseService.create(Data)
            .then(()=>{
                this.setState({
                    jumlah_barang: 0,
                    id_produk: "",
                    id_supplier: "",
                    harga_barang: 0,
                    harga_beli: 0,
                })
                alert('Sukses Menambahkan Penjualan ke sistem')
            })
            .catch((err) => {
                console.log(err);
            });
    }
    updateState(data) {
        console.log(data);
        ProductService.getById(data).then((res) => {
            let data = res.data.data;
            this.setState({
                id_supplier: data.id_supplier,
                id_produk: data.id_produk,
                harga_beli: data.harga_beli,
            });
        });
    }
    changeJumlahBarang(e) {
        this.setState({ jumlah_barang: e.target.value });
    }
    changeHargaBarang(e) {
        this.setState({ harga_barang: e.target.value });
    }
    render() {
        return (
            <div
                class="modal fade"
                id="restockProduct"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Restock Product
              </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="productWeight">Amount Product</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        onChange={this.changeJumlahBarang}
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="productWeight">Price</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        onChange={this.changeHargaBarang}
                                        required
                                    />
                                    <small id="emailHelp" class="form-text text-muted">
                                        Price on Database : {this.props.data.harga_beli}
                                    </small>
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
                                Purchase Product
              </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class ModalDiscount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_produk: "",
            kode_promo: "",
            besar_promo_diskon: 0,
            tgl_mulai_diskon: "",
            tgl_berakhir_diskon: "",
            keterangan: "",
        };
        this.changeKodePromo = this.changeKodePromo.bind(this);
        this.changeBesarPromoDiskon = this.changeBesarPromoDiskon.bind(this);
        this.changeTglMulaiDiskon = this.changeTglMulaiDiskon.bind(this);
        this.changeTglBerakhirDiskon = this.changeTglBerakhirDiskon.bind(this);
        this.changeKeterangan = this.changeKeterangan.bind(this);
        this.saveData = this.saveData.bind(this);
    }
    saveData(e) {
        e.preventDefault();
        let promotion = {
            id_toko: sessionStorage.getItem("id_toko"),
            id_produk: this.props.data.id_produk,
            kode_promo: this.state.kode_promo,
            besar_promo_diskon: this.state.besar_promo_diskon,
            tgl_mulai_diskon: this.state.tgl_mulai_diskon,
            tgl_berakhir_diskon: this.state.tgl_berakhir_diskon,
            keterangan: this.state.keterangan,
        };
        PromotionService.create(promotion)
            .then(()=>{
                alert('Berhasil Menambahkan Promo Diskon')
            })
            .catch((err) => {
                alert(err.response.message);
            });
    }
    updateState(data) {
        ProductService.getById(data).then((res) => {
            let data = res.data.data;
            this.setState({
                id_produk: data.id_produk,
            });
        });
    }
    changeKodePromo(e) {
        this.setState({ kode_promo: e.target.value });
    }
    changeBesarPromoDiskon(e) {
        this.setState({ besar_promo_diskon: e.target.value });
    }
    changeTglMulaiDiskon(e) {
        this.setState({ tgl_mulai_diskon: e.target.value });
    }
    changeTglBerakhirDiskon(e) {
        this.setState({ tgl_berakhir_diskon: e.target.value });
    }
    changeKeterangan(e) {
        this.setState({ keterangan: e.target.value });
    }
    render() {
        return (
            <div
                class="modal fade"
                id="discountProduct"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Create product Discount
              </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="besar_promo">Promotion Discount</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="besar_promo"
                                        onChange={this.changeBesarPromoDiskon}
                                        required
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="kode_promo">Promotion Code</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        id="kode_promo"
                                        onChange={this.changeKodePromo}
                                        required
                                    />
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="tanggal_mulai">Start Date</label>
                                            <input
                                                type="date"
                                                class="form-control"
                                                id="tanggal_mulai"
                                                onChange={this.changeTglMulaiDiskon}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="form-group">
                                            <label for="tanggal_berakhir">End Date</label>
                                            <input
                                                type="date"
                                                class="form-control"
                                                id="tanggal_berakhir"
                                                onChange={this.changeTglBerakhirDiskon}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="kode_promo">Detail</label>
                                    <textarea
                                        type="text"
                                        class="form-control"
                                        id="keterangan"
                                        max="100"
                                        onChange={this.changeKeterangan}
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
                                Create Discount
              </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class AddStockOpname extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jumlahFisik: "",
            keterangan: "",
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
            id_produk: this.props.data.id_produk,
            stok_fisik: this.state.jumlahFisik,
            stok_opname_terakhir: sessionStorage.getItem('LastStockOpname'),
            keterangan: this.state.keterangan,
        };
        StockOpnameService.getCalculation(data).then((res)=>{
            console.log(res.data)
            if(sessionStorage.getItem('StockOpname')){
                let initiate = [...JSON.parse(sessionStorage.getItem('StockOpname'))]
                console.log(initiate)
                initiate.push(res.data.data)
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
            jumlahFisik: "",
            keterangan: "",
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
            <div
                class="modal fade"
                id="stockOpname"
                tabindex="-1"
                aria-labelledby="stockOpname"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Product Stock Opname 
              </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group">
                                    <label for="kode_promo">physical counts</label>
                                    <input
                                        type="number"
                                        class="form-control"
                                        id="kode_promo"
                                        onChange={this.changeJumlahFisik}
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
                                Add Stock Opname
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
const { SearchBar } = Search;
class ProductInventory extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            Product: [],
            ProductDetail: [],
            StockOpnameDetail:[]
        };
        this.getProduct = this.getProduct.bind(this);
    }
    componentDidMount() {
        ProductService.getAll().then((res) => {
            this.setState({ Product: res.data.data });
        });
    }
    getProduct() {
        ProductService.getAll().then((res) => {
            this.setState({ Product: res.data.data });
        });
    }
    ProductDataColumn = [
        { dataField: "nama_produk", text: "Product Name", filter: textFilter() },
        {
            dataField: "harga_produk",
            text: "Sales Price",
            sort: true,
            filter: numberFilter(),
        },
        { dataField: "kategori", text: "Category", filter: textFilter() },
        { dataField: "supplier", text: "Supplier", filter: textFilter() },
        {
            dataField: "stok",
            text: "Stock",
            sort: true,
            formatter: (rowContent, row) => {
                if (row.stok > 10) {
                    return <span class="text-success">{row.stok}</span>;
                } else {
                    return <span class="text-danger">{row.stok}</span>;
                }
            },
        },
        {
            dataField: "",
            text: "Option",
            formatter: (rowContent, row) => {

                return (
                        <div>
                            <button
                                class="btn btn-link"
                                data-toggle="modal"
                                data-target="#restockProduct"
                                onClick={this.Restock.bind(this, row.id_produk)}
                            >
                                Restock
                            </button>
                            <button
                                class="btn btn-link"
                                data-toggle="modal"
                                data-target="#discountProduct"
                                onClick={this.Restock.bind(this, row.id_produk)}
                            >
                                Create Discount
              </button>
                        </div>
                    );
            },
        },
    ];
    ProductStockOpnameDataColumn = [
        { dataField: "id_produk", text: "Product ID", filter: textFilter() },
        { dataField: "nama_produk", text: "Product Name", filter: textFilter() },
        {
            dataField: "harga_produk",
            text: "Sales Price",
            sort: true,
            filter: numberFilter(),
        },
        { dataField: "kategori", text: "Category", filter: textFilter() },
        {
            dataField: "stok",
            text: "Stock",
            sort: true,
            formatter: (rowContent, row) => {
                if (row.stok > 10) {
                    return <span class="text-success">{row.stok}</span>;
                } else {
                    return <span class="text-danger">{row.stok}</span>;
                }
            },
        },
        {
            dataField: "",
            text: "Option",
            formatter: (rowContent, row) => {
                return (
                    <div>
                        <button
                            class="btn btn-link"
                            data-toggle="modal"
                            data-target="#stockOpname"
                            onClick={this.StockOpnameDetail.bind(this, row.id_produk)}
                        >
                            Add Data
            </button>
                    </div>
                );
            },
        },
    ];
    StockOpnameDetail(data) {
        ProductService.getById(data).then((res) => {
            this.setState({
                StockOpnameDetail: res.data.data,
            });
        });
        this.child.current.updateState(data);
    }
    Restock(data) {
        ProductService.getById(data).then((res) => {
            this.setState({
                ProductDetail : res.data.data,
            });
        });
        this.child.current.updateState(data);
    }
    render() {
        return (
            <section id="ProductSupply">
                {this.props.dataSpecific === "StockOpname" && (
                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.state.Product}
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
                                        data={this.state.Product}
                                        columns={this.ProductDataColumn}
                                        bootstrap4
                                        pagination={pagination}
                                        filter={filterFactory()}
                                        {...props.baseProps}
                                    />
                                </section>
                            </div>
                        )}
                    </ToolkitProvider>
                )}
                {this.props.dataSpecific !== "StockOpname" && (
                    <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.state.Product}
                        columns={this.ProductDataColumn}
                        search
                    >
                        {(props) => (
                            <div>
                                <Filter id="product" FilterName="Product" ContentName="none">
                                    <section class="pl-4">
                                        <SearchBar className="mr-5" {...props.searchProps} />
                                    </section>
                                </Filter>

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
                                        data={this.state.Product}
                                        columns={this.ProductDataColumn}
                                        bootstrap4
                                        pagination={pagination}
                                        filter={filterFactory()}
                                        {...props.baseProps}
                                    />
                                </section>
                            </div>
                        )}
                    </ToolkitProvider>
                )}
                <ModalPurchase
                    ref={this.child}
                    data={this.state.ProductDetail}
                    updateData={this.getProduct}
                ></ModalPurchase>
                <ModalDiscount
                    ref={this.child}
                    data={this.state.ProductDetail}
                    updateData={this.getProduct}
                ></ModalDiscount>
                <AddStockOpname
                    data={this.state.StockOpnameDetail}
                    />
            </section>
        );
    }
}

export default ProductInventory;
