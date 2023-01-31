import axios from "axios";

// 로그인이 안되어있는 경우에 사용하는 API(토큰이 없는경우 요청)
export const API = axios.create({
    baseURL: ``,
    headers:{
        "Content-Type": "application/json",
    },
});


// 로그인이 되어있는 경우 사용하는 API(토큰이 있는경우 요청)
const accessToken = typeof window === 'undefined' ? null : sessionStorage.getItem('token');

export const LogAPI = axios.create({
    baseURL: ``,
    headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        //`${localStorage.getItem('token') === null ? sessionStorage.getItem("token") : localStorage.getItem('token')}`
    },
});


// 로그인 되어있는 경우 사진 보낼 때 API
export const LogImgAPI = axios.create({
    baseURL: ``,
    headers:{
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
        //`${localStorage.getItem('token') === null ? sessionStorage.getItem("token") : localStorage.getItem('token')}`
    },
});