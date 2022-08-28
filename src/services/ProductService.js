import Api from './APIuploadFile'
import ApiNormal from './API'
const BASE_URL = "http://localhost:8000/api/produk/";

class ProductService{
    getAll(){
        return ApiNormal.get(BASE_URL);
    }
    create(data){
        return Api.post(BASE_URL, data);
    }
    getById(id){
        return ApiNormal.get(BASE_URL + id);
    }
    update(data,id){
        return Api.post(BASE_URL + id+ '?_method=PUT', data);
    }
    delete(id){
        return ApiNormal.delete(BASE_URL + id);
    }
}

export default new ProductService()