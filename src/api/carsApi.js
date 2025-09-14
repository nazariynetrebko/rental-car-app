import api from "./api";

export const getCars = (params) => {
  console.log("Cars API call with params:", params);
  return api.get("/cars", { params });
};
export const getCarById = (id) => api.get(`/cars/${id}`);
export const getBrands = () => api.get("/brands");
export const postRental = (payload) => api.post("/rentals", payload);
