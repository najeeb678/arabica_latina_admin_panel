import React, { useCallback, useEffect, useState } from "react";
import _debounce from "lodash/debounce";

import GenericTable from "@/_components/common/GenericTable";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";

import { Doctor, ButtonConfig, Column, FilterConfig } from "@/types/types";

import { Box } from "@mui/material";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";

import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import AddProductForm from "./AddProductForm";
import {
  deleteProduct,
  fetchProductById,
  getAllPharmacyProducts,
} from "@/redux/slices/PharmacySlice";
import AddCategory from "./AddCategory";

const ProductsTable = ({ productsData = [], loading }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [openProductModal, setOpenProductModal] = useState<boolean>(false);
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [productsfilter, setProductsFilter] = useState<string>("all");
  const [filteredName, setFilteredName] = useState<string>("");

  useEffect(() => {
    dispatch(
      getAllPharmacyProducts({ search: filteredName, filter: productsfilter })
    );
  }, [filteredName, productsfilter, dispatch]);
  useEffect(() => {
    setFilteredName(searchInput);
  }, [searchInput]);
  const transformedProductsData = Array.isArray(productsData)
    ? productsData.map((data: any, index: any) => ({
        Sr_No: index + 1,
        id: data?.id,
        name: data?.name,
        category: data?.category_id?.name,
        description: data?.description
          ? data.description.split(" ").slice(0, 15).join(" ") +
            (data.description.split(" ").length > 15 ? "..." : "")
          : "",
        price: data?.price,
        quantity: data?.stock,
        image: data?.attachment,
      }))
    : [];

  const columns: Column<any>[] = [
    {
      label: "Sr_No",
      accessor: "Sr_No",
      render: (value: string, row: any) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={"5px"}
            sx={{ marginLeft: "-20px" }}
          >
            <CustomCheckbox
              isDisabled
              onChange={() => {
                // console.log("Selected Doctor:", row.ID);
              }}
            />
            <span>{row.Sr_No}</span>
          </Box>
        );
      },
    },
    { label: "PRODUCT ID", accessor: "id" },
    { label: "PRODUCT NAME", accessor: "name" },
    { label: "CATEGORY", accessor: "category" },
    { label: "DESCRIPTION", accessor: "description" },
    { label: "PRICE", accessor: "price" }, // Access the mobile field instead of ContactNumber
    { label: "QUANTITY", accessor: "quantity" },

    {
      label: "IMAGE",
      accessor: "image",
      render: (value: string, row: any) => {
        return (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <img
              src={value}
              alt="Service"
              style={{ width: "50px", height: "50px" }}
            />
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
          </Box>
        );
      },
    },
  ];
  const onSearchProducts = (searchTerm: string) => {
    dispatch(
      getAllPharmacyProducts({ search: searchTerm, filter: productsfilter })
    ).unwrap();
  };

  const searchFunc = useCallback(_debounce(onSearchProducts, 500), [
    productsfilter,
  ]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    searchFunc(value);
  };

  const handleSelectChange = (value: string) => {
    setProductsFilter(value);
  };
  // const filters: FilterConfig[] = [
  //   {
  //     label: "Weekly",
  //     options: [
  //       { label: "Weekly", value: "weekly" },
  //       { label: "Monthly", value: "monthly" },
  //       { label: "Yearly", value: "yearly" },
  //       { label: "All", value: "all" },
  //     ],
  //     onChange: handleSelectChange,
  //   },
  // ];

  const handleOpenUpdate = async (val: any) => {
    let id = val?.id;

    const res = await dispatch(fetchProductById(id)).unwrap();

    setSelectedProduct(res);
    setOpenProductModal(true);
  };
  const handleCloseUpdate = () => {
    setSelectedProduct(null);
    setOpenProductModal(false);
  };
  const handleDeleteProduct = async (id: any) => {
    try {
      const res = await dispatch(deleteProduct(id)).unwrap();
      if (res) {
        toast.success("Product deleted successfully");
      }
      setSelectedProduct(null);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete the Product");
    }
  };

  const handleNewProduct = (): any => {
    setOpenProductModal(true);
  };
  const handleNewCategory = (): any => {
    setOpenCategoryModal(true);
  };

  const buttons: ButtonConfig[] = [
    {
      label: "Add Category",
      variant: "contained",
      onClick: handleNewCategory, // Open the Add Doctor modal
      size: "md",
      textColored: true,
      sx: {
        height: "29px !important",
        fontWeight: "400 !important",
        fontSize: "12px !important",
        backgroundColor: "#FBC02D !important",
        borderRadius: "50px !important",
        boxShadow: "none",
        "&:hover": {
          color: "white !important",
        },
      },
    },
    {
      label: "Add a new Product",
      variant: "contained",
      onClick: handleNewProduct, // Open the Add Doctor modal
      size: "md",
      textColored: true,
      sx: {
        width: "135px !important",
        height: "29px !important",
        fontWeight: "400 !important",
        fontSize: "12px !important",
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
    <>
      <GenericTable<any>
        data={transformedProductsData || []}
        columns={columns}
        title="All Products"
        loading={loading}
        buttons={buttons}
        handleSearchChange={handleSearchChange}
        // filters={filters}
        searchStyle={{
          width: "62%",
          height: "29px",
          top: "0px",
          borderRadius: "50px",
        }}
      />

      <CustomModal
        open={openProductModal}
        title={selectedProduct ? "Update Product" : "Add Product"}
        handleClose={handleCloseUpdate}
        modalWidth="60%"
      >
        <AddProductForm
          productData={selectedProduct}
          handleClose={handleCloseUpdate}
        />
      </CustomModal>
      <CustomModal
        open={openCategoryModal}
        title={"Add Category"}
        handleClose={() => setOpenCategoryModal(false)}
        modalWidth="65%"
      >
        <AddCategory handleClose={() => setOpenCategoryModal(false)} />
      </CustomModal>
      <TransitionsDialog
        open={isDeleteModalOpen}
        heading="Delete Product"
        description="Are you sure you want to delete this Product?"
        cancel={() => {
          setSelectedProduct(null), setIsDeleteModalOpen(false);
        }}
        proceed={() => handleDeleteProduct(selectedProduct.id)}
      />
    </>
  );
};

export default ProductsTable;
