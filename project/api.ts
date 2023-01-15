import axios from "axios";

// 로그인이 안되어있는 경우에 사용하는 API(토큰이 없는경우 요청)
export const API = axios.create({
    baseURL: ``,
    headers:{
        "Content-Type": "application/json",
    },
});


// 로그인이 되어있는 경우 사용하는 API(토큰이 있는경우 요청)

export const LogAPI = axios.create({
    baseURL: ``,
    headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZW1iZXJfQSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2NzM4NzIxMjl9.951_CmrSR852Wud0AHyE9fcjs5iRD_O6G-3xCjXyC1s`,
        //`${localStorage.getItem('token') === null ? sessionStorage.getItem("token") : localStorage.getItem('token')}`
    },
});