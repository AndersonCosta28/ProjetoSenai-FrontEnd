import axios from 'axios';
import { Platform } from 'react-native';


export default axios.create({
    //baseURL: Platform.OS === 'android' ? 'https://projetosenai-backend.herokuapp.com/' : "http://localhost:8080/"

    baseURL: "https://projetosenai-backend.herokuapp.com/"
    //baseURL: "http://localhost:8080/"
})