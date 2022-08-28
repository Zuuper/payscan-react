import React from 'react';
import PromotionService from '../../services/PromoService'
class CreatePromotion extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            kode_promo: '',
            besar_promo_diskon: 0,
            tgl_mulai_diskon: '',
            tgl_berakhir_diskon: '',
            keterangan: ''
        }
        this.changeKodePromo = this.changeKodePromo.bind(this)
        this.changeBesarPromoDiskon = this.changeBesarPromoDiskon.bind(this)
        this.changeTglMulaiDiskon = this.changeTglMulaiDiskon.bind(this)
        this.changeTglBerakhirDiskon = this.changeTglBerakhirDiskon.bind(this)
        this.changeKeterangan = this.changeKeterangan.bind(this)
        this.saveData = this.saveData.bind(this)
    }
    saveData(e) {
        e.preventDefault();
        let promotion = {
            'id_toko': 1,
            'kode_promo': this.state.kode_promo,
            'besar_promo_diskon': this.state.besar_promo_diskon,
            'tgl_mulai_diskon': this.state.tgl_mulai_diskon,
            'tgl_berakhir_diskon': this.state.tgl_berakhir_diskon,
            'keterangan': this.state.keterangan
        }
        PromotionService.create(promotion).then(res => {
            window.location.reload();
        })
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
            <main>
                <form>
                    <div class="form-group">
                        <label for="besar_promo">Promotion Discount</label>
                        <input type="number" class="form-control" id="besar_promo" onChange={this.changeBesarPromoDiskon} required />
                    </div>
                    <div class="form-group">
                        <label for="kode_promo">Promotion Code</label>
                        <input type="text" class="form-control" id="kode_promo" onChange={this.changeKodePromo} required />
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label for="tanggal_mulai">Start Date</label>
                                <input type="date" class="form-control" id="tanggal_mulai" onChange={this.changeTglMulaiDiskon} required />
                            </div>
                        </div>
                        <div class="col">
                            <div class="form-group">
                                <label for="tanggal_berakhir">End Date</label>
                                <input type="date" class="form-control" id="tanggal_berakhir" onChange={this.changeTglBerakhirDiskon} required />
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="kode_promo">Detail</label>
                        <textarea type="text" class="form-control" id="keterangan" max="100" onChange={this.changeKeterangan} required />
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

export default CreatePromotion;