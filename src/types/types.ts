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
  accessor: keyof T; 
  action?: (row: T) => React.JSX.Element;
  render?: (value: any, row: T) => React.ReactNode;
};
export type FilterConfig = {
  label: string | React.ReactNode; 
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  sx?: { [key: string]: any }; 
};

export type Patient = {
  Sr_No: number;
  ID: string;
  PatientName: string;
  Age: string;
  DateOfBirth: string;
  Mobile: string;
  Department: string;
  Triage: "Non Urgent" | "Urgent" | "Emergency" | "Out Patient"; 
};


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
   onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; 
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
  }; 
};

