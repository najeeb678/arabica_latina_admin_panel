import React from "react";
import AllItems from "./AllItems"; // Import the AllItems component
import OrderSummary from "./OrderSummary";
import ShippingAddress from "./ShippingAddress";
// import Grid from "@mui/material/Grid"; // Correct Grid import
import Grid from "@mui/material/Grid2"; // Correct Grid import
import PaymentMethod from "./PaymentMethod";
import TrackOrder from "./TrackOrder";
import CartTotal from "./CartTotal";

const OrderDetails = ({ orderDetails = {} }: any) => {
  return (
    <Grid container spacing={1.2}>
      <Grid container spacing={1.2} component="div" size={{ xs: 12, lg: 8 }}>
        <AllItems data={orderDetails?.orderItems || []} />
        <CartTotal orderDetails={orderDetails} />
      </Grid>
      {/* Right Column */}
      <Grid container spacing={1.2} size={{ xs: 12, lg: 4 }}>
        <OrderSummary orderDetails={orderDetails} />
        <ShippingAddress orderDetails={orderDetails} />
        <PaymentMethod orderDetails={orderDetails} />
        <TrackOrder orderDetails={orderDetails} />
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
