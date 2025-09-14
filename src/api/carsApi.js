import api from "./api";

export const getCars = (params) => api.get("/cars", { params });
export const getCarById = (id) => api.get(`/cars/${id}`);
export const getBrands = () => api.get("/brands");
export const postRental = (payload) => api.post("/rentals", payload);
