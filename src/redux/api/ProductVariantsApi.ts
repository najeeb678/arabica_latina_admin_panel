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

// Post a new product variant
export const postProductVariant = async (payload: {
  productId: string;
  color: string;
  style: string;
  attachment: string;
  isDuotone: boolean;
  size: string;
  stock: number;
  price: number;
}) => {
  try {
    const response = await api.post("/product-variants", payload);
    return response.data; 
  } catch (error) {
    throw new Error("Failed to post product variant"); 
  }
};

// Delete a product variant by ID
export const deleteProductVariantAPI = async (id: string) => {
  try {
    const response = await api.delete(`/product-variants/${id}`);
    return response.data; 
  } catch (error) {
    throw new Error(`Failed to delete product variant with ID: ${id}`);
  }
};