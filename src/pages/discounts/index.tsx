import DiscountsTable from "@/_components/core/Discounts/DiscountsTable";
import { fetchAllDiscounts } from "@/redux/slices/discountSlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const index = () => {
  const dispatch: AppDispatch = useDispatch();
  const { allDiscountData, discountDataloading } = useSelector(
    (state: RootState) => state.discount
  );
  console.log("allDiscountData", allDiscountData);
  useEffect(() => {
    dispatch(fetchAllDiscounts())
      .unwrap()
      .then((res) => {
        console.log("discounts data", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  return (
    <DiscountsTable discountsData={allDiscountData} loading={discountDataloading} />
  )
};

export default index;
