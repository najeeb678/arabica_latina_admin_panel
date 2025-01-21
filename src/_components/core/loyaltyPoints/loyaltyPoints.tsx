import React, { useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid2";
import GenericCard from "@/_components/common/GenericCard";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import DiscountCoupon from "./DiscountCoupon";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import LoyaltyCards from "./loyaltyCards";
import LoyaltyOffers from "./LoyaltyOffers";
import ManageLoyaltyOffers from "./LoyaltyOffers";
import RedeemPackages from "./RedeemPackages";

const LoyaltyPoints = () => {
  const router = useRouter();

  return (
    <Grid container spacing={1.5}>
      <Grid size={{ xs: 12 }} component="div">
        <LoyaltyCards />
      </Grid>

      <Grid size={{ xs: 12 }} component="div">
        <DiscountCoupon />
      </Grid>
      <Grid size={{ xs: 12 }} component="div">
        <RedeemPackages/>
      </Grid>
      <Grid size={{ xs: 12 }} component="div">
        <ManageLoyaltyOffers/>
      </Grid>
    </Grid>
  );
};

export default LoyaltyPoints;
