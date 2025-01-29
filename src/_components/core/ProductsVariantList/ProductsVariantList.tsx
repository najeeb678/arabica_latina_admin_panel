import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Box } from "@mui/material";
import { fetchProductVariants, deleteProductVariant } from "../../../redux/slices/ProductVariantsSlice";
import { RootState, AppDispatch } from "../../../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import { ProductVariants as ProductVariantsType, ButtonConfig } from "@/types/types";
import { Modal } from "@mui/material";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import ProductVariantForm from "./ProductVariantForm";

const ProductVariantsList = () => {
   const dispatch = useDispatch<AppDispatch>();

   const { ProductVariants, loading } = useSelector((state: RootState) => state.productsVariants);
   const [processedVariants, setProcessedVariants] = useState<ProductVariantsType[]>([]);
   const [selectedVariant, setSelectedVariant] = useState<ProductVariantsType | null>(null);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [isAddProductVariantFormOpen, setisAddProductVariantFormOpen] = useState<boolean>(false);

   useEffect(() => {
      dispatch(fetchProductVariants());
   }, [dispatch]);

   useEffect(() => {
      if (ProductVariants) {
         const updatedVariants = ProductVariants.map((item: any, index: number) => ({
            ...item,
            Sr_No: index + 1,
         }));
         setProcessedVariants(updatedVariants);
      }
   }, [ProductVariants]);
   console.log('ProductVariants1122: ', ProductVariants)

   const handleDeleteVariant = () => {
      if (selectedVariant && selectedVariant.variantId) {
         dispatch(deleteProductVariant(selectedVariant.variantId));
         setIsDeleteModalOpen(false);
         setSelectedVariant(null);
         dispatch(fetchProductVariants());
      } else {
         console.error("Selected product variant is missing an ID");
      }
   };

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
                  <span>{value}</span>
               </Box>
            );
         },
      },
      {
         label: "Name",
         accessor: "product.name",
         render: (value: any, row: any) => {
            return <span>{row.product?.name}</span>;
         },
      },

      { label: "Color", accessor: "color" },
      { label: "Size", accessor: "size" },
      { label: "Stock", accessor: "stock" },
      { label: "isDuotone", accessor: "isDuotone" },
      {
         label: "Price",
         accessor: "price",
         render: (value: number) => <span>${value}</span>,
      },
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

   const handleNewVariant = () => {
      setisAddProductVariantFormOpen(true);
   };

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

   const handleCloseForm = () => {
      setisAddProductVariantFormOpen(false);
      dispatch(fetchProductVariants());

   };

   return (
      <div>
         <GenericTable
            data={processedVariants || []}
            columns={columns}
            title="Product Variants"
            buttons={buttons}
            loading={loading}
            showPagination={true}
         />

         <Modal
            open={isAddProductVariantFormOpen}
            onClose={handleCloseForm}
            aria-labelledby="add-category-form-modal"
            aria-describedby="add-category-form-description"
         >
            <Box
               sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  maxWidth: 800,
                  maxHeight: "90vh",
                  overflowY: 'auto',
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,

               }}
            >
               <ProductVariantForm handleClose={handleCloseForm} />
            </Box>
         </Modal>

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
