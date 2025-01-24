import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";

export type Appointment = {
  Sr_No: number;
  ID: string;
  Patient: string;
  Doctor: string;
  Time: string;
  Date: string;
  Service: string;
  Status?: string;
  action?: (row: Appointment) => JSX.Element | string;
};
export type Column<T> = {
  label: string;
  accessor: keyof T; // Ensure accessor is a key of T
  action?: (row: T) => React.JSX.Element;
  render?: (value: any, row: T) => React.ReactNode;
};
export type FilterConfig = {
  label: string | React.ReactNode; // Allows string or JSX elements
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  sx?: { [key: string]: any }; // Optional sx prop for custom styles
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

export type Patient = {
  Sr_No: number;
  ID: string;
  PatientName: string; // Updated to remove space (invalid as a key in JavaScript)
  Age: string;
  DateOfBirth: string;
  Mobile: string;
  Department: string;
  Triage: "Non Urgent" | "Urgent" | "Emergency" | "Out Patient"; // Enum-like string union type
};

// New Doctor Type

export type Doctor = {
  Sr_No: number;
  ID: string;
  Name: string;
  SPECIALIZATION: string;
  DEGREE: string;
  Mobile: string;
  EMAIL: string;
  DateOfJoining: string;
};

export type Services = {
  ID: number;
  Sr_No: number;
  SERVICE: string;
  NoOfSubServices: string;
  ViewSubServices: string;
  IMAGE: string;
  STATUS: string;
};
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
