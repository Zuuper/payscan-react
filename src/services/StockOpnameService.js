import Api from './API'
const BASE_URL = "http://localhost:8000/api/stok-opname/";

class StockOpnameService{
    getAll(){
        return Api.get(BASE_URL);
    }
    getCalculation(data){
        return Api.post(BASE_URL  + 'getDetailProductForStockOpname',data)
    }
    create(data){
        return Api.post(BASE_URL, data);
    }
    createStockOpnameFinal(data){
        return Api.post(BASE_URL + 'storeStokOpname', data);
    }
    approved(id){
        return Api.put(BASE_URL + id);
    }
    disapproved(id){
        return Api.post(BASE_URL + id + '/unapprove');
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

export default new StockOpnameService()