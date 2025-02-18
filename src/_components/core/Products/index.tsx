import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { getAllProducts, deleteProduct } from "@/redux/slices/productsSlice";
import GenericTable from "@/_components/common/GenericTable";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import { ButtonConfig, Column, FilterConfig } from "@/types/types";
import { Box } from "@mui/material";
import { formatDate, sliceDescription } from "@/utils/utils";
import EditProduct from "./UpdateProduct";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import AddProduct from "./AddProduct";
import DeleteIcon from "@mui/icons-material/Delete";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import { toast } from "react-toastify";

const AdminProductsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { productsData, loadingproductsData } = useSelector(
    (state: any) => state.products
  );

  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredName, setFilteredName] = useState<string>("");
  const [productsFilter, setProductsFilter] = useState<string>("weekly");
  const [openProductModal, setOpenProductModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(
      getAllProducts({
        search: filteredName,
        filter: productsFilter,
        admin: true,
      })
    )
      .unwrap()
      .then((res) => {})
      .catch((err) => {
        console.error("Error Fetching Products Data:", err);
      });
  }, [filteredName, productsFilter, dispatch]);

  useEffect(() => {
    setFilteredName(searchInput);
  }, [searchInput]);

  const transformedProductsData = productsData
    ? productsData?.map((product: any, index: number) => ({
        Sr_No: index + 1,
        Product_ID: product?.productId || "N/A",
        Name: product?.name || "N/A",
        Base_Price: product?.basePrice || 0,
        Description: sliceDescription(product?.description, 20) || "N/A",
        Created_At: formatDate(product?.createdAt) || "N/A",
        Updated_At: formatDate(product?.updatedAt) || "N/A",
        Product_Type: product?.productType || "N/A",
        row: product,
        Variants: product?.Variants?.map((variant: any) => ({
          Variant_ID: variant?.variantId || "N/A",
          Color: variant?.color || "N/A",
          Size: variant?.size || "N/A",
          Style: variant?.style || "N/A",
          Price: variant?.price || 0,
          In_Stock: variant?.isInStock ? "Yes" : "No",
        })),
      }))
    : [];

  const columns: Column<any>[] = [
    { label: "Sr_No", accessor: "Sr_No" },
    { label: "Product ID", accessor: "Product_ID" },
    { label: "Name", accessor: "Name" },
    { label: "Product Type", accessor: "Product_Type" },
    { label: "Base Price", accessor: "Base_Price" },
    { label: "Description", accessor: "Description" },
    { label: "Created At", accessor: "Created_At" },
    { label: "Updated At", accessor: "Updated_At" },
    {
      label: "Action",
      accessor: "row",
      render: (row: any) => {
        return (
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
                  setSelectedProduct(row);
                  setIsDeleteModalOpen(true);
                },
              },
            ]}
          />
        );
      },
    },
  ];

  const onSearchProduct = (searchTerm: string) => {
    dispatch(getAllProducts({ search: searchTerm, filter: productsFilter }))
      .unwrap()
      .then(() => {})
      .catch((err) => console.error("Search Error", err));
  };

  const searchFunc = useCallback(_debounce(onSearchProduct, 500), [
    productsFilter,
  ]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    searchFunc(value);
  };

  const handleSelectChange = (value: string) => {
    setProductsFilter(value);
  };

  const buttons: ButtonConfig[] = [
    {
      label: "Create Product",
      variant: "contained",
      onClick: () => {
        setSelectedProduct(null);
        setOpenProductModal(true);
      },
      size: "sm",
      sx: {
        backgroundColor: "#FBC02D !important",
        borderRadius: "50px !important",
        boxShadow: "none",
        whiteSpace: "nowrap !important",
        transform: "none !important",

        "&:hover": {
          color: "white !important",
        },
      },
    },
  ];

  const handleOpenUpdate = (row: any) => {
    setSelectedProduct(row);
    setOpenProductModal(true);
  };

  const handleProductDelete = (productId: string) => {
    dispatch(deleteProduct(productId))
      .unwrap()
      .then(() => {
        setIsDeleteModalOpen(false);
        toast.success("Product deleted successfully");
      })
      .catch((err) => {
        toast.error(err?.message || "Error deleting product");

        setIsDeleteModalOpen(false);
      });
  };

  return (
    <>
      <GenericTable
        data={transformedProductsData}
        columns={columns}
        title="Products"
        loading={loadingproductsData}
        buttons={buttons}
      />

      <CustomModal
        open={openProductModal}
        title={selectedProduct ? "Update Product" : "Create Product"}
        handleClose={() => setOpenProductModal(false)}
        modalWidth="70%"
      >
        <AddProduct
          productDetails={selectedProduct}
          handleClose={() => setOpenProductModal(false)}
        />
      </CustomModal>

      <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Delete Product"
        description="Are you sure you want to delete this product?"
        cancel={() => {
          setSelectedProduct(null);
          setIsDeleteModalOpen(false);
        }}
        proceed={() => handleProductDelete(selectedProduct?.productId)}
      />
    </>
  );
};

export default AdminProductsTable;
