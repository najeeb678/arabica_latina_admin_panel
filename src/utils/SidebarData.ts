import { CiStar, CiSettings } from "react-icons/ci";
import dynamic from "next/dynamic";

import { RiHomeSmileLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { TiPlusOutline } from "react-icons/ti";
import {
  MdOutlineMedicalServices,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
const CiStethoscope = dynamic(
  () => import("react-icons/ci").then((mod) => mod.CiStethoscope),
  { ssr: false }
);

import { PiUsersThree } from "react-icons/pi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoListUnordered } from "react-icons/go";
import { AiOutlineSchedule } from "react-icons/ai";

export const getSidebarData = (role: string | null) => {
  return [
    {
      title: "Categories",
      icon: RiHomeSmileLine,
      path: "/categories",
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

    // {
    //   title: "Settings",
    //   icon: CiSettings,
    //   path: "/settings",
    // },
  ];
};
