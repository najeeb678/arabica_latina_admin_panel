import api from "@/services/api";


export const getCategories = async () => {
  const response = await api.get("/products");
  return response.data;
};
