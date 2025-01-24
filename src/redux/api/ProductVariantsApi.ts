import api from "@/services/api";

// Get all product variants
export const getProductVariants = async () => {
  try {
    const response = await api.get("/product-variants");
    return response.data; 
  } catch (error) {
    throw new Error("Failed to fetch product variants"); 
  }
};
