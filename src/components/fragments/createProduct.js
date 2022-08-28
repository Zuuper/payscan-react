import React from 'react'
import ProductService from '../../services/ProductService'
import SupplierService from '../../services/SupplierService'
import CategoryService from '../../services/CategoryService'
class CreateProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id_supplier: '',
            id_kategori: '',
            id_toko: '',
            nama_produk: '',
            stok: 0,
            harga_produk : '',
            harga_beli: '',
            berat_produk : '',
            deskripsi_produk: '',
            foto_produk : '',
            Category : [],
            Supplier : []
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
    saveData(e) {
        e.preventDefault();
        let Data = new FormData()
        Data.append('id_supplier',this.state.id_supplier)
        Data.append('id_kategori',this.state.id_kategori)
        Data.append('id_toko','1')
        Data.append('nama_produk',this.state.nama_produk)
        Data.append('stok',this.state.stok)
        Data.append('harga_produk',this.state.harga_produk)
        Data.append('harga_beli',this.state.harga_beli)
        Data.append('berat_produk',this.state.berat_produk)
        Data.append('deskripsi_produk',this.state.deskripsi_produk)
        Data.append('foto_produk',this.state.foto_produk)

        ProductService.create(Data).then(res => {
            window.location.reload();
        })
    }
    changeIdSupplier(e) {
        this.setState({ id_supplier: e.target.value });
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
            <main>
                <form>
                    <div class="form-group">
                        <label for="productName">Product Name</label>
                        <input type="text" class="form-control" id="productName" onChange={this.changeNamaProduk}  required/>
                    </div>
                    <div class="form-group">
                        <label for="productCategory">Category</label>
                        <select class="form-control" id="productCategory" onChange={this.changeIdKategori} value={this.state.id_kategori}  required>
                            <option value="">Select Category</option>
                            {this.state.Category.map((data, index) => (
                                <option value={data.id_kategori}>{data.kategori}</option>
                            ))}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="productSupplier">Supplier</label>
                        <select class="form-control" id="productSupplier" onChange={this.changeIdSupplier} value={this.state.id_supplier} required>
                            <option value="">Select Category</option>
                            {this.state.Supplier.map((data, index) => (
                                <option value={data.id_supplier}>{data.nama_supplier}</option>
                            ))}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="productPrice">Sales Price</label>
                        <input type="number" class="form-control" id="productPrice" onChange={this.changeHargaProduk} required/>
                    </div><div class="form-group">
                        <label for="productPrice">Purchase Price</label>
                        <input type="number" class="form-control" id="productPurchase" onChange={this.changeHargaBeli} required/>
                    </div>
                    <div class="form-group">
                        <label for="productWeight">Weight</label>
                        <input type="number" class="form-control" id="Weight" placeholder="Weight in gram"  onChange={this.changeBeratProduk} required/>
                    </div>
                    <div class="form-group">
                        <label for="productDescription">Description</label>
                        <textarea class="form-control" id="productDescription" rows="3" onChange={this.changeDeskripsiProduk} required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="productImage">Upload Product Image</label>
                        <input type="file" class="form-control-file" id="productImage" onChange={this.changeFotoProduk} accept="image/x-png,image/gif,image/jpeg" required/>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" data-dismiss="modal" onClick={this.saveData}>Save changes</button>
                    </div>
                </form>
            </main>
        )
    }
}
export default CreateProduct