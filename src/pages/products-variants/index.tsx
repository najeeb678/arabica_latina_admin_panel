import React from "react";
import ProductVariantsList from "@/_components/core/ProductsVariantList/ProductsVariantList";

const Index = () => {
  return (
    <div>
      <ProductVariantsList />
    </div>
  );
};

export default Index;


// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../../redux/store"; // Adjust the path to your store file
// import { createProductVariant } from "../../redux/slices/ProductVariantsSlice";

// const dispatch = useDispatch<AppDispatch>();

// const handleCreateVariant = async () => {
//   // Define the payload object
//   const payload = {
//     productId: "c35af475-3ea1-4b82-973b-fed7b608d712",
//     color: "Red",
//     style: "Textured",
//     attachment: "",
//     isDuotone: false,
//     size: "M",
//     stock: 100,
//     price: 19.99,
//   };

//   try {
//     const response = await dispatch(createProductVariant(payload)).unwrap();
//     console.log("New product variant created:", response);
//   } catch (error) {
//     console.error("Failed to create product variant:", error);
//   }
// };
