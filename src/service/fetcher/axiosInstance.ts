import axios from "axios";

export const baseURL = "https://fakestoreapi.com";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
