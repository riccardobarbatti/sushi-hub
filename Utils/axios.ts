import axios, {AxiosResponse} from 'axios';
//set Axios Path
//axios.defaults.baseURL = process.env.API_URL as string;
axios.defaults.withCredentials = true;
//set header
axios.defaults.headers.common['Authorization'] = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY as string;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// INTERCEPTORS
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

//interceptors
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});