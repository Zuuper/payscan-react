import Api from './API'
const BASE_URL = "http://localhost:8000/api/promo-produk/";

class ProductPromotion{
    getAll(){
        return Api.get(BASE_URL);
    }
    create(data){
        return Api.post(BASE_URL, data);
    }
    getById(id){
        return Api.get(BASE_URL + id);
    }
    update(data,id){
        return Api.put(BASE_URL + id, data);
    }
    delete(id){
        return Api.delete(BASE_URL + id);
    }
}

export default new ProductPromotion()