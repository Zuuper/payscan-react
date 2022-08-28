import React from 'react';
import CategoryService from '../../services/CategoryService'
import SupplierService from '../../services/SupplierService'
import ProductService from '../../services/ProductService'

class DetailProduct extends React.Component {
    constructor(props){
        super(props)
        this.state={
            id_supplier: '',
            id_kategori: '',
            id_toko: '',
            nama_produk: '',
            stok: '',
            harga_produk : '',
            harga_beli: '',
            berat_produk : '',
            deskripsi_produk: '',
            foto_produk : '',
            password: '',
            Category: [],
            Supplier: []
        }
        this.changeIdSupplier = this.changeIdSupplier.bind(this)
        this.changeIdKategori = this.changeIdKategori.bind(this)
        this.changeIdToko = this.changeIdToko.bind(this)
        this.changeNamaProduk = this.changeNamaProduk.bind(this)
        this.changeHargaProduk = this.changeHargaProduk.bind(this)
        this.changeHargaBeli = this.changeHargaBeli.bind(this)
        this.changeBeratProduk = this.changeBeratProduk.bind(this)
        this.changeDeskripsiProduk = this.changeDeskripsiProduk.bind(this)
        this.changeFotoProduk = this.changeFotoProduk.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.saveData = this.saveData.bind(this)
    }
    componentDidMount() {
        CategoryService.getAll().then((res) => {
            this.setState({ Category: res.data.data});
        });
        SupplierService.getAll().then((res) => {
            this.setState({ Supplier: res.data.data});
        });

    }
    updateState(data){
        ProductService.getById(data).then((res)=>{
            let data = res.data.data
            this.setState({
                id_supplier: data.id_supplier,
                id_kategori: data.id_kategori,
                id_toko: data.id_toko,
                nama_produk: data.nama_produk,
                stok: data.stok,
                harga_produk : data.harga_produk,
                harga_beli: data.harga_beli,
                berat_produk : data.berat_produk,
                deskripsi_produk: data.deskripsi_produk,
                foto_produk : data.foto_produk,
            })
        })
    }
    saveData(e) {
        e.preventDefault();
        let DataSaved = new FormData()
        DataSaved.append('id_supplier',this.state.id_supplier)
        DataSaved.append('id_kategori',this.state.id_kategori)
        DataSaved.append('id_toko',sessionStorage.getItem('id_toko'))
        DataSaved.append('nama_produk',this.state.nama_produk)
        DataSaved.append('stok',this.state.stok)
        DataSaved.append('harga_produk',this.state.harga_produk)
        DataSaved.append('harga_beli',this.state.harga_beli)
        DataSaved.append('berat_produk',this.state.berat_produk)
        DataSaved.append('deskripsi_produk',this.state.deskripsi_produk)
        DataSaved.append('id_pegawai',sessionStorage.getItem('id_pegawai'))
        DataSaved.append('password',this.state.password)
        DataSaved.append('foto_produk',this.state.foto_produk)

        console.log(DataSaved)
        ProductService.update(DataSaved,this.props.data.id_produk).then(res => {
            window.location.reload();
        }).catch((err) => {
            alert(err.response.data.message)
        })
    }
    changeIdSupplier(e) {
        this.setState({ id_supplier: e.target.value });
    }
    changePassword(e) {
        this.setState({ password: e.target.value });
    }
    changeIdKategori(e) {
        this.setState({ id_kategori: e.target.value });
    }
    changeIdToko(e) {
        this.setState({ id_toko: e.target.value });
    }
    changeNamaProduk(e) {
        this.setState({ nama_produk: e.target.value });
    }
    changeHargaProduk(e) {
        this.setState({ harga_produk: e.target.value });
    }
    changeHargaBeli(e) {
        this.setState({ harga_beli: e.target.value });
    }
    changeBeratProduk(e) {
        this.setState({ berat_produk: e.target.value });
    }
    changeDeskripsiProduk(e) {
        this.setState({ deskripsi_produk: e.target.value });
    }
    changeFotoProduk(e) {
        let files = e.target.files || e.dataTransfer.files;
        this.createImage(files[0])
    }
    createImage(file) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.setState({
            foto_produk: file
          })
        };
        reader.readAsDataURL(file);
      }
    render() {
        return (
            <main class="modal fade"  id={this.props.type} tabindex="-1" aria-labelledby="detailProduct" aria-hidden="true">
                <div class="modal-dialog" style={{ maxWidth: '60rem' }}>
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Detail Product</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-6" style={{ backgroundImage: 'url(../../assets/images/Image_placeholder.png)', backgroundRepeat: 'no-repeat',backgroundSize: '100% 100%'}}>
                                    <img src={"http://localhost:8000" + this.state.foto_produk} class="img-fluid" alt='gambar_produk'></img>
                                </div>
                                <div class="col-6">
                                    <form>
                                        <div class="form-group">
                                            <label for="productName">Product name</label>
                                            <input type="text" class="form-control" value={this.state.nama_produk} onChange={this.changeNamaProduk} required/>
                                        </div>
                                        <div class="form-group">
                                            <label for="productCategory">Category</label>
                                            <select class="form-control" onChange={this.changeIdKategori} required>
                                                <option value={this.state.id_kategori}>{this.props.data.kategori}</option>
                                                {this.state.Category.map((data, index) => (
                                                    <option value={data.id_kategori}>{data.kategori}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="productSupplier">Supplier</label>
                                            <select class="form-control" onChange={this.changeIdSupplier} required>
                                                <option value={this.state.id_supplier}>{this.props.data.supplier}</option>
                                                {this.state.Supplier.map((data, index) => (
                                                    <option value={data.id_supplier}>{data.nama_supplier}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label for="productPrice">Product Price</label>
                                            <input type="number" class="form-control" onChange={this.changeHargaProduk} value={this.state.harga_produk} required disabled={this.props.DisabledStatus}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="productWeight">Weight (in Gram) </label>
                                            <input type="number" class="form-control"onChange={this.changeHargaBeli} value={this.state.berat_produk} required disabled={this.props.DisabledStatus}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="productDescription">Description</label>
                                            <textarea class="form-control" rows="3" onChange={this.changeDeskripsiProduk} value={this.state.deskripsi_produk} required disabled={this.props.DisabledStatus}>
                                            </textarea>
                                        </div>
                                        <div class="form-group">
                                            <label for="productImage">Upload Product Image</label>
                                            <input type="file" class="form-control-file" accept="image/x-png,image/gif,image/jpeg" onChange={this.changeFotoProduk} required disabled={this.props.DisabledStatus}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="productName">Password</label>
                                            <input type="password" class="form-control" onChange={this.changePassword} placeholder="input password when updating data" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-link" data-dismiss="modal" >cancel</button>
                            {this.props.type === 'editProduct' && <button  type="button" class="btn btn-primary" data-dismiss="modal"onClick={this.saveData}>Save</button>}
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default DetailProduct