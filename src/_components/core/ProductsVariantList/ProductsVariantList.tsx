import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Box } from "@mui/material";
import {
  fetchProductVariants,
  deleteProductVariant,
} from "../../../redux/slices/ProductVariantsSlice";
import { RootState, AppDispatch } from "../../../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import {
  ProductVariants as ProductVariantsType,
  ButtonConfig,
} from "@/types/types";
import { Modal } from "@mui/material";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import ProductVariantForm from "./ProductVariantForm";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { toast } from "react-toastify";

const ProductVariantsList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { ProductVariants, loading } = useSelector(
    (state: RootState) => state.productsVariants
  );
  const [processedVariants, setProcessedVariants] = useState<any[]>([]);
  const [selectedVariant, setSelectedVariant] =
    useState<ProductVariantsType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddProductVariantFormOpen, setisAddProductVariantFormOpen] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchProductVariants());
  }, [dispatch]);

  useEffect(() => {
    if (ProductVariants) {
      const updatedVariants = ProductVariants.map(
        (item: any, index: number) => ({
          ...item,
          Sr_No: index + 1,
        })
      );
      setProcessedVariants(updatedVariants);
    }
  }, [ProductVariants]);

  const handleDeleteVariant = () => {
    if (selectedVariant && selectedVariant.variantId) {
      dispatch(deleteProductVariant(selectedVariant.variantId))
        .unwrap()
        .then(() => {
          toast.success("Product variant deleted successfully");
        })
        .catch((err) =>
          toast.error(err.message || "Error deleting product variant")
        );
      setIsDeleteModalOpen(false);
      setSelectedVariant(null);
    } else {
      // console.error("Selected product variant is missing an ID");
    }
  };

  const columns = [
    {
      label: "Sr_No",
      accessor: "Sr_No",
      render: (value: number, row: any) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="5px"
          >
            <CustomCheckbox
              isDisabled
              onChange={(e) =>
                console.log(`Checkbox for ${value}:`, e.target.checked)
              }
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
      render: (_: any, row: any) => (
        <DropDownForActions
          items={[
            {
              icon: (
                <DriveFileRenameOutlineIcon
                  fontSize="inherit"
                  color="primary"
                  sx={{ fontSize: "12px" }}
                />
              ),
              label: "Update",
              onClick: () => handleOpenUpdate(row),
            },
            {
              icon: (
                <DeleteIcon
                  fontSize="inherit"
                  color="error"
                  sx={{ fontSize: "12px" }}
                />
              ),
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
    setSelectedVariant(null);
    setisAddProductVariantFormOpen(true);
  };

  const buttons: ButtonConfig[] = [
    {
      label: "Create Product Variant",
      variant: "contained",
      onClick: handleNewVariant,
      size: "md",
      textColored: true,
      sx: {
        width: "150px !important",
        backgroundColor: "#FBC02D !important",
        borderRadius: "50px !important",
        boxShadow: "none",
        whiteSpace: "nowrap !important",
        transform: "none",
        "&:hover": {
          color: "white !important",
        },
      },
    },
  ];

  const handleCloseForm = () => {
    setisAddProductVariantFormOpen(false);
    // dispatch(fetchProductVariants());
  };
  const handleOpenUpdate = (row: any) => {
    setSelectedVariant(row);
    setisAddProductVariantFormOpen(true);
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

      <CustomModal
        open={isAddProductVariantFormOpen}
        title={
          selectedVariant?.variantId
            ? "Update Product Variant"
            : "Create Product Variant"
        }
        modalWidth="60%"
        handleClose={() => {
          setisAddProductVariantFormOpen(false);
          // dispatch(fetchProductVariants());
        }}
      >
        <ProductVariantForm
          handleClose={handleCloseForm}
          selectedVariant={selectedVariant}
        />
      </CustomModal>

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
