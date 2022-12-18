import { useContext } from "react";
import axios from "axios";
import AppContext from "../context/AppContext";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const useAxios = () => {

    const [token] = useContext(AppContext);

    const apiClient = axios.create({
        baseURL: BASE_URL,
    });

    apiClient.interceptors.request.use((config) => {
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
    });

    return apiClient;
}

export default useAxios;