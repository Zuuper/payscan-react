import React from 'react';
import SupplierService from '../../services/SupplierService'


class CreateSupplier extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nama_supplier: '',
            alamat_supplier: '',
            no_telepon_supplier: '',

        }
        this.changeNamaSupplier = this.changeNamaSupplier.bind(this)
        this.changeAlamatSupplier = this.changeAlamatSupplier.bind(this)
        this.changeNoTelepon = this.changeNoTelepon.bind(this)

        this.saveData = this.saveData.bind(this)
    }
    saveData(e) {
        e.preventDefault();
        let supplier = {
            'nama_supplier': this.state.nama_supplier,
            'alamat_supplier': this.state.alamat_supplier,
            'no_telepon_supplier': this.state.no_telepon_supplier
        }
        SupplierService.create(supplier).then(res => {
            window.location.reload();
        })
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
    render(){
        return(
            <main>
                <form>
                    <div class="form-group">
                        <label for="kode_promo">Supplier Name</label>
                        <input type="text" class="form-control" onChange={this.changeNamaSupplier} required />
                    </div>
                    <div class="form-group">
                        <label for="kode_promo">Supplier Address</label>
                        <input type="text" class="form-control" id="kode_promo" onChange={this.changeAlamatSupplier} required />
                    </div>
                    <div class="form-group">
                        <label for="kode_promo">Supplier Phone Number</label>
                        <input type="telp" class="form-control" id="kode_promo" onChange={this.changeNoTelepon} required />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-link" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" onClick={this.saveData}>Save changes</button>
                    </div>
                </form>
            </main>
        )
    }
}

export default CreateSupplier