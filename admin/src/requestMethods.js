import axios from "axios";

const BASE_URL = "/api";
const data = localStorage.getItem("persist:root");
const user = data && JSON.parse(JSON.parse(data).user).currentUser;

const TOKEN = user && user.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { authorization: `Bearer ${TOKEN}` },
});
