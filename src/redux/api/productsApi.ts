import api from "@/services/api";

export const getAllProductsApi = async (params?: {
  search?: string;
  filter?: string;
}): Promise<any> => {
  const response = await api.get<any>("/products", { params });
  return response.data;
};

export const addProductApi = async (data: any): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await api.post<any>("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
