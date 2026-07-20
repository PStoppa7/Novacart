import axios from "axios";

import {
  showLoader,
  hideLoader,
} from "../context/LoadingContext";

const api = axios.create({
  baseURL: "https://novacart-api-ferw.onrender.com/api",
});

api.interceptors.request.use(

  (config) => {

    showLoader();

    return config;

  },

  (error) => {

    hideLoader();

    return Promise.reject(error);

  }

);

api.interceptors.response.use(

  (response) => {

    hideLoader();

    return response;

  },

  (error) => {

    hideLoader();

    return Promise.reject(error);

  }

);

export default api;