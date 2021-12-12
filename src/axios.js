import axios from 'axios';

export default axios.create({
    //baseURL: 'https://projetosenai-backend.herokuapp.com/'
    baseURL: "http://localhost:8080/"
})