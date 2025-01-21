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
  return  [
        {
          title: "Category",
          icon: RiHomeSmileLine,
          path: "/categories",
        },
        {
          title: "Doctors",
          icon: CiStethoscope,
          path: "/doctors",
          subMenu: [
            {
              title: "Dr's List",
              path: "/doctors",
              icon: GoListUnordered,
            },
            {
              title: "Dr's Schedule",
              path: "/schedule",
              icon: AiOutlineSchedule,
            },
          ],
        },
        {
          title: "Loyalty Points",
          icon: CiStar,
          path: "/loyaltyPoints",
        },
        {
          title: "Appointments",
          icon: SlCalender,
          path: "/appointments",
        },
        {
          title: "Patients",
          icon: SlCalender,
          path: "/patients",
        },
        {
          title: "Services",
          icon: MdOutlineMedicalServices,
          path: "/services",
        },
        // {
        //   title: "Schedule",
        //   icon: SlCalender,
        //   path: "/schedule",
        // },
        {
          title: "Pharmacy",
          icon: TiPlusOutline,
          path: "/pharmacy/products",
          subMenu: [
            {
              title: "Products",
              path: "/pharmacy/products",
              icon: MdOutlineProductionQuantityLimits,
            },
            {
              title: "Customers",
              path: "/pharmacy/customers",
              icon: PiUsersThree,
            },
            {
              title: "Shipment",
              path: "/pharmacy/shipment",
              icon: LiaShippingFastSolid,
            },
          ],
        },

        {
          title: "Settings",
          icon: CiSettings,
          path: "/settings",
        },
      ]
    
};
