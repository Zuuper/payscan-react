import Api from './API'
const BASE_URL = "http://localhost:8000/api/report/";

class PromoService {
    getSummary(){
        return Api.get(BASE_URL);
    }
    getPurchaseChart(data){
        return Api.post(BASE_URL+'purchase',data)
    }
    getSalesChart(data){
        return Api.post(BASE_URL+'sales',data)
    }
    getPurchasePieChart(data){
        return Api.post(BASE_URL+'PurchaseCategorySummary',data)
    }
    getSalesPieChart(data){
        return Api.post(BASE_URL+'SalesCategorySummary',data)
    }
    generatePDF(data){
        return Api.get(BASE_URL + 'generatePDF', data);
    }
    // getById(id){
    //     return Api.get(BASE_URL  + id);
    // }
    // update(data,id){
    //     return Api.put(BASE_URL + id, data);
    // }
    // delete(id){
    //     return Api.delete(BASE_URL + id);
    // }
}

export default new PromoService()
