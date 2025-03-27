import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Box } from "@mui/material";
import {
  fetchCategories,
  removeCategory,
} from "../../../redux/slices/categoriesSlice";
import { RootState, AppDispatch } from "../../../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import { Category, ButtonConfig } from "@/types/types";
import AddCategoryForm from "./AddCategoryForm";
import { Modal } from "@mui/material";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { toast } from "react-toastify";

const Categories = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );
  const [processedCategories, setProcessedCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isAddCategoryFormOpen, setIsAddCategoryFormOpen] =
    useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories) {
      const updatedCategories = categories.map(
        (item: Category, index: number) => ({
          ...item,
          Sr_No: index + 1,
        })
      );
      setProcessedCategories(updatedCategories);
    }
  }, [categories]);

  const handleOpenUpdate = (row: Category) => {
    setSelectedCategory(row);
    setIsAddCategoryFormOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (selectedCategory && selectedCategory.categoryId) {
      try {
        await dispatch(removeCategory(selectedCategory.categoryId))
          .unwrap()
          .then(() => {
            toast.success("Category deleted successfully");
          });

        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    } else {
      console.error("Selected category is missing an ID");
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
    { label: "Category ID", accessor: "categoryId" },
    { label: "Name", accessor: "name" },
    { label: "Gender", accessor: "gender" },
    {
      label: "Created At",
      accessor: "createdAt",
      render: (value: string) => (
        <span>{new Date(value).toLocaleDateString()}</span>
      ),
    },
    {
      label: "Updated At",
      accessor: "updatedAt",
      render: (value: string) => (
        <span>{new Date(value).toLocaleDateString()}</span>
      ),
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
                setSelectedCategory(row);
                setIsDeleteModalOpen(true);
              },
            },
          ]}
        />
      ),
    },
  ];

  const handleNewCategory = () => {
    selectedCategory && setSelectedCategory(null);
    setIsAddCategoryFormOpen(true);
  };

  const buttons: ButtonConfig[] = [
    {
      label: "Add Category",
      variant: "contained",
      onClick: handleNewCategory,
      size: "md",
      textColored: true,
      sx: {
        width: "120px !important",
        minWidth: "150px !important",
        maxWidth: "100% !important",
        backgroundColor: "#FBC02D !important",
        borderRadius: "50px !important",
        boxShadow: "none",
        whiteSpace: "nowrap !important",
        transform: "none !important",
        fontWeight: "bold !important",
        "&:hover": {
          backgroundColor: "#F9A825 !important",
        },
      },
    },
  ];

  const handleCloseForm = () => {
    setIsAddCategoryFormOpen(false);
  };

  return (
    <div>
      <GenericTable
        data={processedCategories || []}
        columns={columns}
        title="Categories"
        buttons={buttons}
        loading={loading}
        showPagination={true}
      />

      <CustomModal
        open={isAddCategoryFormOpen}
        modalWidth="50%"
        title={selectedCategory ? "Update Category" : "Add Category"}
        handleClose={() => setIsAddCategoryFormOpen(false)}
      >
        <AddCategoryForm
          handleClose={handleCloseForm}
          categoryData={selectedCategory}
        />
      </CustomModal>

      <TransitionsDialog
        heading="Confirm Delete"
        description="Are you sure you want to delete this category?"
        open={isDeleteModalOpen}
        cancel={() => setIsDeleteModalOpen(false)}
        proceed={handleDeleteCategory}
      />
    </div>
  );
};

export default Categories;
