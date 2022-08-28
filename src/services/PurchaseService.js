import Api from './API'
const BASE_URL = "http://localhost:8000/api/pembelian/";
const BASE_URL_PENDING = "http://localhost:8000/api/getPembelianPending/";

class PurchaseService{
    getPembelianPending(){
        return Api.get(BASE_URL_PENDING)
    }
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
        return Api.post(BASE_URL + id+ '?_method=PUT', data);
    }
    delete(id){
        return Api.delete(BASE_URL + id);
    }
    validateData(id){
        return Api.put(BASE_URL + id + '/ValidasiPembelian')
    }
}

export default new PurchaseService()