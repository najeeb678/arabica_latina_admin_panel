import api from "@/services/api";

export const fetchAllDiscountsApi = async () => {
  const response = await api.get("/discounts");
  return response.data;
};

export const createDiscountApi = async (payload: { percentage: string }) => {
  const response = await api.post("/discounts", payload);
  return response.data;
};

export const updateDiscountApi = async (id: string, payload: { percentage: string }) => {
  const response = await api.patch(`/discounts/${id}`, payload);
  return response.data;
};

export const deleteDiscountApi = async (id: string) => {
  await api.delete(`/discounts/${id}`);
  return id;
};
