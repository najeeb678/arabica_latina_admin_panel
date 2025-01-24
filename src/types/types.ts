import { SxProps, Theme } from "@mui/material";

export type Category = {
   Sr_No: number; 
   categoryId: string; 
   name: string; 
   gender: "Male" | "Female"; 
   createdAt: string; 
   updatedAt: string; 
 };


 export type ButtonConfig = {
   label: string;
   variant?: "contained" | "outlined" | "text";
   size?: "sm" | "md" | "lg" | "full";
   isDisabled?: boolean;
   leadingIcon?: React.ReactNode;
   trailingIcon?: React.ReactNode;
   type?: "button" | "submit";
   loading?: boolean;
   altStyle?: boolean;
   outlinedAlt?: boolean;
   textColored?: boolean;
   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Updated to accept an event
   sx?: SxProps<Theme>;
 };

 export type ProductVariants = {
  Sr_No: number;
  variantId: string;
  color: string;
  size: string;
  stock: number;
  price: number;
  isDuotone: boolean;
  createdAt: string;
  updatedAt: string;
  product: {
    name: string;
  }; // Ensure this matches your structure
};
