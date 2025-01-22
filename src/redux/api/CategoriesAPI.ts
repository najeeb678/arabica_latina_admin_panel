import api from "@/services/api";


export const getCategories = async () => {
  const response = await api.get("/categories");
  //console.log("rrr in api", response.data)
  return response.data;
};
