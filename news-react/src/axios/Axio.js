// import axios from 'axios'
import axios from "axios";

function AxiosMiddleware(method, url, data, options) {
    switch (method) {
        case 'get':
            return axios.get(url, data, options);
        case 'post':
            return axios.post(url, data, options);
        case 'head':
            return axios.head(url, data, options);
        case 'patch':
            return axios.patch(url, data, options);
        case 'put':
            return axios.put(url, data, options);
        case 'delete':
            return axios.delete(url, { data: data, headers: options });
        default:
            console.log(method);
            break;
    }

}

axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401) {
        } else if (status === 404) {

        } else {
        }

        return Promise.reject(error);
    }
)


export function setBearerToken(token) {
    
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export function callApi(method, url, data = [], options = {}) {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    return AxiosMiddleware(method, `${apiBaseUrl}/${url}`, data, options)
}