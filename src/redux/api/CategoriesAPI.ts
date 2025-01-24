import api from "@/services/api";

////Get all categories
export const getCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
};


// Create a new category
export const createCategory = async (categoryData: { name: string; gender: string; categoryImage?: string }) => {
  const response = await api.post("/categories", categoryData);
  return response.data;
};

export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};

// Upload Image API
export const uploadImageApi = async (imageData: FormData) => {
  try {
    const response = await api.post("/image/upload/single", imageData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Failed to upload image");
  }
};