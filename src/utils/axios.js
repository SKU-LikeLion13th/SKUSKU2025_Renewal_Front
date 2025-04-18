import axios from "axios";

const API = axios.create({
  baseURL: "https://backend.sku-sku.com",
  withCredentials: true,
});

export default API;
