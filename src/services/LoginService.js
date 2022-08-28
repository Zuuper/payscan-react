import Api from './APILogin'
const BASE_URL = "http://localhost:8000/api/login_pegawai/";

class Login{
    postData(data){
        return Api.post(BASE_URL,data);
    }
}

export default new Login()