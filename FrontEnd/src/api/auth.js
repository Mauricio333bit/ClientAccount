import axios from "axios";
const API = "http://localhost:2024";
export const registerReq = (user) => axios.post(`${API}/auth/register`, user);
export const loginReq = (user) => axios.post(`${API}/auth/login`, user);
