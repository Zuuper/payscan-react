import Api from './API'
const BASE_URL = "user/";

class CustomerService {
    getAll(){
        return Api.get(BASE_URL);
    }
    create(data){
        return Api.post(BASE_URL, data);
    }
    getById(id){
        return Api.get(BASE_URL + '/' + id);
    }
    update(data,id){
        return Api.put(BASE_URL + '/' + id, data);
    }
    delete(id){
        return Api.delete(BASE_URL + id);
    }
    activate_customer(id){
        return Api.put(BASE_URL + id + '/aktivasi_user')
    }
}

export default new CustomerService()