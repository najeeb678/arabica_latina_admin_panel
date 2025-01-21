import React from "react";
import { Box } from "@mui/material";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import Grid from "@mui/material/Grid2";
import ItemCard from "./ItemCard";
import { ItemCardProps } from "./ItemCard";

const AllItems = ({ data }: any) => {
  let length = data?.length;

  const transformedItems: ItemCardProps[] = data.map(
    (item: any, index: number) => ({
      number: index + 1,
      productName: item.itemId || "Product",
      quantity: length || 1,
      price: `SAR ${item.price.toFixed(2)}`,
      image: "/images/Frame 116.svg", //TODO:CHANGE WITH DYNAMIC IMAGE
    })
  );

  return (
    <Box
      sx={{
        padding: "20px 20px 10px 20px",
        backgroundColor: "rgba(255, 255, 255, 1)",
        border: "1.5px solid rgba(222, 222, 222, 0.69)",
        borderRadius: 2,
        width: "100%",
        minHeight: "60vh",
        overflowY: "auto",
      }}
    >
      <CustomTypography
        sx={{
          fontSize: "15px",
          fontWeight: 400,
          marginBottom: "10px",
          textUnderlinePosition: "from-font",
          textDecorationSkipInk: "none",
        }}
      >
        All Items
      </CustomTypography>
      <Grid container spacing={1}>
        {transformedItems.map((item) => (
          <Grid key={item.number} size={12}>
            <ItemCard
              number={item.number}
              productName={item.productName}
              quantity={item.quantity}
              price={item.price}
              image={item.image}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AllItems;
