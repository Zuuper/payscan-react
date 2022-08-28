import React from 'react'
import '../css/productCard.css';
class ProductCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductName: "Product Name",
            ProductImage: "Product Image",
            ProductCategory: "Product category",
            ProductPrice: "Product Price",
            ProductID: "Product ID"
        }
    }
    render() {
        return (
            <div>
                <div class="card" style={{ width: "17rem", borderRadius: "0.8rem" }}>
                    <img class="card-img-top" src={this.props.ProductImage} alt="Missing" height="192" width="208" />
                    <div class="card-body">
                        <p id="product-category" class="card-text mb-0">{this.props.ProductCategory}</p>
                        <h5 class="card-title">{this.props.ProductName}</h5>
                        <p class="card-text">Rp. {this.props.ProductPrice}</p>
                        <div class="d-flex justify-content-start align-items-center">
                            <button href="/" class="btn btn-primary" data-toggle="modal" data-target="#detailProduct">Edit</button>
                            <button class="btn btn-link" data-toggle="modal" data-target="#disableProduct">Disabled</button>
                        </div>
                        <div class="modal fade" id="disableProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Disable Product</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        <p>Are you sure want Disable Product ?</p>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-link" data-dismiss="modal">cancel</button>
                                        <button type="submit" class="btn btn-primary" data-dismiss="modal">Disable</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="detailProduct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" style={{ maxWidth: '60rem' }}>
                                <div class="modal-content" >
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Detail Product</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body py-0" >
                                        <div class="row">
                                            <div class="col-6" id="detail-product-image-placeholder">
                                                <p>Image side</p>
                                            </div>
                                            <div class="col-6">
                                                <form>
                                                    <div class="form-group">
                                                        <label for="productName">Product Name</label>
                                                        <input type="text" class="form-control" id="productName" required />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="productCategory">Category</label>
                                                        <select class="form-control" id="productCategory" required>
                                                            <option>Snack</option>
                                                            <option>Food and Beverage</option>
                                                            <option>Drinkable Water</option>
                                                            <option>Handmade Toast</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="productSupplier">Supplier</label>
                                                        <select class="form-control" id="productSupplier" required>
                                                            <option>PT Indah Perkasa</option>
                                                            <option>Jeremy Toasted</option>
                                                            <option>PT Indiafood</option>
                                                            <option>Bank Jago</option>
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="productPrice">Product Price</label>
                                                        <input type="number" class="form-control" id="productPrice" aria-describedby="emailHelp" required />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="productWeight">Weight</label>
                                                        <input type="number" class="form-control" id="Weight" placeholder="Weight in gram" required />
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="productDescription">Description</label>
                                                        <textarea class="form-control" id="productDescription" rows="3"></textarea>
                                                    </div>
                                                    <div class="form-group">
                                                        <label for="productImage">Upload Product Image</label>
                                                        <input type="file" class="form-control-file" id="productImage" accept="image/x-png,image/gif,image/jpeg" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-link" data-dismiss="modal">cancel</button>
                                        <button type="submit" class="btn btn-primary" data-dismiss="modal">Disable</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductCard;