import { CiStar, CiSettings } from "react-icons/ci";
import dynamic from "next/dynamic";

import { RiHomeSmileLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";

import { MdOutlineMedicalServices } from "react-icons/md";

import { IconType } from "react-icons";

interface SidebarItem {
  title: string;
  icon: IconType;
  path: string;
  subMenu?: {
    title: string;
    path: string;
    icon?: IconType;
  }[];
}

export const getSidebarData = (role: string | null): SidebarItem[] => {
  return [
    {
      title: "Categories",
      icon: RiHomeSmileLine,
      path: "/",
    },
    // {
    //   title: "Doctors",
    //   icon: CiStethoscope,
    //   path: "/doctors",
    //   subMenu: [
    //     {
    //       title: "Dr's List",
    //       path: "/doctors",
    //       icon: GoListUnordered,
    //     },
    //     {
    //       title: "Dr's Schedule",
    //       path: "/schedule",
    //       icon: AiOutlineSchedule,
    //     },
    //   ],
    // },
    {
      title: "Products",
      icon: CiStar,
      path: "/products",
    },
    {
      title: "Products Variants",
      icon: SlCalender,
      path: "/products-variants",
    },
    {
      title: "Orders",
      icon: SlCalender,
      path: "/orders",
    },
    {
      title: "Customers",
      icon: MdOutlineMedicalServices,
      path: "/customers",
    },
    {
      title: "Discounts",
      icon: MdOutlineMedicalServices,
      path: "/discounts",
    },

    {
      title: "Inquiries",
      icon: CiSettings,
      path: "/inquiries",
    },
    {
      title: "Hero Images",
      icon: CiSettings,
      path: "/heroimages",
    },
  ];
};
