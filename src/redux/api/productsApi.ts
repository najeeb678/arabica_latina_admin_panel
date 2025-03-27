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

export const addHeroImagesApi = async (data: any): Promise<any> => {
  console.log("data11", data);
  const { id, ...payload } = data;

  const endpoint = id ? `/admin/heroSection/${id}` : `/admin/heroSection`;
  const method = id ? "put" : "post"; // Use PUT if id exists, otherwise POST for new entries

  const response = await api({
    method,
    url: endpoint,
    data: payload,
  });

  return response.data;
};

export const getHeroImagesApi = async (): Promise<any> => {
  const response = await api.post<any>(`/admin/heroSection/get`);
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
