import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericTable from "@/_components/common/GenericTable";
import CustomCheckbox from "@/_components/common/CustomCheckBox";
import { Box } from "@mui/material";
import { fetchCategories, removeCategory } from "../../../redux/slices/categoriesSlice";
import { RootState, AppDispatch } from "../../../redux/store";
import DeleteIcon from "@mui/icons-material/Delete";
import DropDownForActions from "@/_components/common/MenuDropDownForActions/DropDownForActions";
import { Category, ButtonConfig } from "@/types/types";
import AddCategoryForm from "./AddCategoryForm";
import { Modal } from "@mui/material";
import TransitionsDialog from "@/_components/common/CustomModal/TransitionsDialog"; 

const Categories = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { categories, loading } = useSelector((state: RootState) => state.categories);
   const [processedCategories, setProcessedCategories] = useState<Category[]>([]);
   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
   const [isAddCategoryFormOpen, setIsAddCategoryFormOpen] = useState<boolean>(false);

   // Fetch categories when the component mounts
   useEffect(() => {
      dispatch(fetchCategories());
   }, [dispatch]);

   // Track updates to the selected category
   useEffect(() => {
      if (selectedCategory) {
         console.log('Updated selectedCategory:', selectedCategory.categoryId);
      }
   }, [selectedCategory]);

   // Handle updating processed categories with Sr_No
   useEffect(() => {
      if (categories) {
         const updatedCategories = categories.map((item: Category, index: number) => ({
            ...item,
            Sr_No: index + 1, // Add serial number to each row
         }));
         setProcessedCategories(updatedCategories);
      }
   }, [categories]);

   // Open update modal
   const handleOpenUpdate = (row: Category) => {
      console.log("Update Category:", row);
      // Open your update modal or navigate to the update page
   };

   // Handle category deletion
   const handleDeleteCategory = async () => {
      if (selectedCategory && selectedCategory.categoryId) {
         try {
            // Dispatch the action to delete the category from the backend
            await dispatch(removeCategory(selectedCategory.categoryId)).unwrap();
            console.log("Deleted category:", selectedCategory.categoryId);

            // Remove the category from the local state (optimistic update)
            setProcessedCategories(prevCategories =>
               prevCategories.filter(category => category.categoryId !== selectedCategory.categoryId)
            );

            // Close the modal and reset the selected category
            setIsDeleteModalOpen(false);
            setSelectedCategory(null);
         } catch (error) {
            console.error("Failed to delete category:", error);
         }
      } else {
         console.error("Selected category is missing an ID");
      }
   };

   // Table columns
   const columns = [
      {
         label: "Sr_No",
         accessor: "Sr_No",
         render: (value: number, row: Category) => {
            return (
               <Box display="flex" alignItems="center" gap="5px">
                  <CustomCheckbox
                     isDisabled
                     onChange={(e) => console.log(`Checkbox for ${value}:`, e.target.checked)}
                  />
                  <span>{value}</span> {/* Display the serial number */}
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
         render: (value: string) => <span>{new Date(value).toLocaleDateString()}</span>,
      },
      {
         label: "Updated At",
         accessor: "updatedAt",
         render: (value: string) => <span>{new Date(value).toLocaleDateString()}</span>,
      },
      {
         label: "Actions",
         accessor: "actions",
         render: (_: any, row: Category) => (
            <DropDownForActions
               items={[
                  {
                     icon: (
                        <DeleteIcon fontSize="inherit" color="error" sx={{ fontSize: "12px" }} />
                     ),
                     label: "Delete",
                     onClick: () => {
                        setSelectedCategory(row); // Correctly set the selected category
                        setIsDeleteModalOpen(true); // Open delete confirmation modal
                     },
                  },
               ]}
            />
         ),
      },
   ];

   // Open the add category form
   const handleNewCategory = () => {
      setIsAddCategoryFormOpen(true); // Open the form modal
   };

   // Modal button configurations
   const buttons: ButtonConfig[] = [
      {
         label: "Add Category",
         variant: "contained",
         onClick: handleNewCategory,
         size: "sm",
         textColored: true,
         sx: {
            backgroundColor: "#FBC02D !important",
            borderRadius: "50px !important",
            boxShadow: "none",
            "&:hover": {
               color: "white !important",
            },
         },
      },
   ];

   // Close form modal
   const handleCloseForm = () => {
      setIsAddCategoryFormOpen(false); // Close the form modal
   };

   return (
      <div>
         <GenericTable
            data={processedCategories || []} // Use categories with Sr_No
            columns={columns}
            title="Categories"
            buttons={buttons}
            loading={loading}
            showPagination={true}
         />

         {/* Modal for Add Category Form */}
         <Modal
            open={isAddCategoryFormOpen}
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
                  width: 400,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <AddCategoryForm handleClose={handleCloseForm} />
            </Box>
         </Modal>

         {/* Modal for Delete Confirmation */}
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
