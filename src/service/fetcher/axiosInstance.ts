import axios from "axios";

export const baseURL = "https://fakestoreapi.com";

const axiosInstance = axios.create({
  baseURL,
});

export const fetcher = (url: string) =>
  axiosInstance
    .get(url)
    .then((res) => res.data)
    .catch((err) => err);

export default axiosInstance;
