import React from 'react';
import CategoryService from '../../services/CategoryService'
class CreateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      kategori: '',
    }

    this.categoryChange = this.categoryChange.bind(this);
    this.saveData = this.saveData.bind(this);
  }
  categoryChange(event) {
    this.setState({ kategori: event.target.value });
  }
  saveData(e) {
    e.preventDefault();
    let Data = {
      'kategori' : this.state.kategori,
      'id_toko' :sessionStorage.getItem('id_toko') 
    }
    CategoryService.create(Data).then(res => {
      window.location.reload();
  })
  }
  render() {
    return (
      <main>
        <form >
          <div class="form-group">
            <label for="categoryName">Category Name</label>
            <input type="text" class="form-control" id="alamat" onChange={this.categoryChange} required />
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

export default CreateCategory