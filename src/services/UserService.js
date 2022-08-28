import ApiNormal from './API'
const BASE_URL = "http://localhost:8000/api/profile/";

class UsertService{
    getAll(){
        return ApiNormal.get(BASE_URL);
    }

}

export default new UsertService()