import axios from "axios";

const api = axios.create({
    baseURL: 'http://soletrando.sunsalesystem.com.br/PHP'
})

export default api;