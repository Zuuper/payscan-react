import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-type": "multipart/form-data",
    'Authorization': sessionStorage.getItem('token')
  }
});