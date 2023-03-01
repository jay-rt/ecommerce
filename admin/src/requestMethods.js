import axios from "axios";

const BASE_URL = "/api";
const user = JSON.parse(
  JSON.parse(localStorage.getItem("persist:root")).user
).currentUser;

const TOKEN = user && user.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { authorization: `Bearer ${TOKEN}` },
});
