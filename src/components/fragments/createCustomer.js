import React from 'react';
import CustomerService from '../../services/CustomerService'
class CreateCustomer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            alamat_user: '',
            tgl_lahir_user: '',
            jenis_kelamin: ''
        }
        this.changeName = this.changeName.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeAlamatUser = this.changeAlamatUser.bind(this)
        this.changeTglLahirUser = this.changeTglLahirUser.bind(this)
        this.changeJenisKelamin = this.changeJenisKelamin.bind(this)
        this.saveData = this.saveData.bind(this)
    }
    saveData(e) {
        e.preventDefault();
        let Customer = {
            'name': this.state.name,
            'email': this.state.email,
            'password': 'admin123',
            'alamat_user': this.state.alamat_user,
            'tgl_lahir_user': this.state.tgl_lahir_user,
            'jenis_kelamin_user': this.state.jenis_kelamin,
        }
        CustomerService.create(Customer).then(res => {
            window.location.reload();
        })
    }
    changeName(e) {
        this.setState({ name: e.target.value });
    }
    changeEmail(e) {
        this.setState({ email: e.target.value });
    }
    changeAlamatUser(e) {
        this.setState({ alamat_user: e.target.value });
    }
    changeTglLahirUser(e) {
        this.setState({ tgl_lahir_user: e.target.value });
    }
    changeJenisKelamin(e) {
        this.setState({ jenis_kelamin: e.target.value });
    }
    render() {
        return (
            <main>
                <form>
                    <div class="form-group">
                        <label for="nama">Customer Name</label>
                        <input type="text" class="form-control" id="name" onChange={this.changeName} required/>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" class="form-control" id="email" onChange={this.changeEmail}   required/>
                    </div>
                    <div class="form-group">
                        <label for="alamat">Address</label>
                        <textarea class="form-control" id="alamat" rows="3" onChange={this.changeAlamatUser} required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="tanggal_lahir">Born Date</label>
                        <input type="date" class="form-control" id="tanggal_lahir" aria-describedby="tanggalLahir" onChange={this.changeTglLahirUser}  required/>
                    </div>
                    <div class="form-group">
                        <label for="jenis_kelamin">Gender</label>
                        <select class="form-control" id="jenis_kelamin" onChange={this.changeJenisKelamin} value={this.state.jenis_kelamin} required>
                        <option value="">Choose Gender</option>
                        <option value="laki laki">Male</option>
                        <option value="perempuan">Female</option>
                        </select>
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

export default CreateCustomer