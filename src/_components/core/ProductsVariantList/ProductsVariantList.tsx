import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Box } from "@mui/material";
import { fetchProductVariants } from "../../../redux/slices/ProductVariantsSlice";
import { RootState, AppDispatch } from "../../../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import { ProductVariants as ProductVariantsType, ButtonConfig } from "@/types/types";
import { Modal } from "@mui/material";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";

// Rename component to avoid conflict with type
const ProductVariantsList = () => {
   const dispatch = useDispatch<AppDispatch>();

   // Correct selector reference for product variants
   const { ProductVariants, loading } = useSelector((state: RootState) => state.productsVariants);
   const [processedVariants, setProcessedVariants] = useState<ProductVariantsType[]>([]);
   const [selectedVariant, setSelectedVariant] = useState<ProductVariantsType | null>(null);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

   // Fetch product variants when the component mounts
   useEffect(() => {
      dispatch(fetchProductVariants());
   }, [dispatch]);

   // Handle updating processed variants with Sr_No
   useEffect(() => {
      if (ProductVariants) { // Use ProductVariants here
         const updatedVariants = ProductVariants.map((item: ProductVariantsType, index: number) => ({
            ...item,
            Sr_No: index + 1, // Add serial number to each row
         }));
         setProcessedVariants(updatedVariants);
      }
   }, [ProductVariants]);
   console.log('ProductVariants1122: ', ProductVariants)

   // Handle product variant deletion (logging instead of removing from state)
   const handleDeleteVariant = () => {
      if (selectedVariant && selectedVariant.variantId) {
         console.log("Delete product variant with ID:", selectedVariant.variantId);

         // Instead of removing from state, just log it
         setIsDeleteModalOpen(false);
         setSelectedVariant(null);
      } else {
         console.error("Selected product variant is missing an ID");
      }
   };

   // Table columns
   const columns = [
      {
         label: "Sr_No",
         accessor: "Sr_No",
         render: (value: number, row: ProductVariantsType) => {
            return (
               <Box display="flex" alignItems="center" justifyContent="center" gap="5px">
                  <CustomCheckbox
                     isDisabled
                     onChange={(e) => console.log(`Checkbox for ${value}:`, e.target.checked)}
                  />
                  <span>{value}</span> {/* Display the serial number */}
               </Box>
            );
         },
      },
      // { label: "Variant ID", accessor: "variantId" },
      // {
      //    label: "Image", // Column Label
      //    accessor: "attachment", // Corresponding field in the row data
      //    render: (value: string, row: ProductVariantsType) => {
      //       return (
      //          <Box display="flex" alignItems="center" justifyContent="center" >
      //             <img 
      //                src={value} // The URL of the image
      //                alt={`${row.variantId} Image`} // Alt text for the image
      //                style={{ width: "50px", height: "50px", borderRadius: "5px", objectFit: "cover" }} // Style the image
      //             />
      //          </Box>
      //       );
      //    },
      // },
      {
         label: "Name",
         accessor: "product.name", // Access nested property
         render: (value: any, row: any) => {
            return <span>{row.product.name}</span>; // TypeScript will now recognize product.name
         },
      },

      { label: "Color", accessor: "color" },
      { label: "Size", accessor: "size" },
      { label: "Stock", accessor: "stock" },
      { label: "isDuotone", accessor: "isDuotone" },
      {
         label: "Price",
         accessor: "price",
         render: (value: number) => <span>${value.toFixed(2)}</span>,
      },
      // {
      //    label: "Created At",
      //    accessor: "createdAt",
      //    render: (value: string) => <span>{new Date(value).toLocaleDateString()}</span>,
      // },
      // {
      //    label: "Updated At",
      //    accessor: "updatedAt",
      //    render: (value: string) => <span>{new Date(value).toLocaleDateString()}</span>,
      // },
      {
         label: "Actions",
         accessor: "actions",
         render: (_: any, row: ProductVariantsType) => (
            <DropDownForActions
               items={[
                  {
                     icon: <DeleteIcon fontSize="inherit" color="error" sx={{ fontSize: "12px" }} />,
                     label: "Delete",
                     onClick: () => {
                        setSelectedVariant(row);
                        setIsDeleteModalOpen(true);
                     },
                  },
               ]}
            />
         ),
      },
   ];

   // Create product variant button (log for now)
   const handleNewVariant = () => {
      console.log("Create product variant button clicked!");
   };

   // Modal button configurations
   const buttons: ButtonConfig[] = [
      {
         label: "Create Product Variant",
         variant: "contained",
         onClick: handleNewVariant,
         size: "sm",
         textColored: true,
         sx: {
            width: '150px !important',
            backgroundColor: "#FBC02D !important",
            borderRadius: "50px !important",
            boxShadow: "none",
            "&:hover": {
               color: "white !important",
            },
         },
      },
   ];

   return (
      <div>
         <GenericTable
            data={processedVariants || []} // Use variants with Sr_No
            columns={columns}
            title="Product Variants"
            buttons={buttons}
            loading={loading}
            showPagination={true}
         />

         {/* Modal for Delete Confirmation */}
         <TransitionsDialog
            heading="Confirm Delete"
            description="Are you sure you want to delete this product variant?"
            open={isDeleteModalOpen}
            cancel={() => setIsDeleteModalOpen(false)}
            proceed={handleDeleteVariant}
         />
      </div>
   );
};

export default ProductVariantsList;
