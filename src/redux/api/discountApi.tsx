import api from "@/services/api";


export const fetchAllDiscountsApi = async () => {
  const response = await api.get("/discounts");
  return response.data;
};
