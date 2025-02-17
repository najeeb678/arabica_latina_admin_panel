import api from "@/services/api";

export const getAllProductsApi = async (params?: {
  search?: string;
  filter?: string;
  admin?: boolean;
}): Promise<any> => {
  const response = await api.post<any>("/products/all", {}, { params });
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

export const updateProductApi = async (id: string, data: any): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await api.patch<any>(`/products/${id}`, data, {});
  return response.data;
};

export const deleteProductApi = async (id: string): Promise<any> => {
  const token = localStorage.getItem("token");
  const response = await api.delete<any>(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
