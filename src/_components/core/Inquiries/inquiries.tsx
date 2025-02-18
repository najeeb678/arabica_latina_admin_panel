import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, CardContent } from "@mui/material";
import { RootState } from "@/redux/store";
import Grid from "@mui/material/Grid2";
import {
  getInquiries,
  sendInquiryResponse,
} from "@/redux/slices/inquiriesSlice";
import CustomModal from "@/_components/common/CustomModal/CustomModal";
import CustomTypography from "@/_components/common/CustomTypography/CustomTypography";
import GenericInput from "@/_components/common/InputField/GenericInput";
import {
  CheckCircleOutline,
  ErrorOutline,
  Assignment,
} from "@mui/icons-material";
import GenericCard from "@/_components/common/GenericCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComponent from "@/_components/common/LoaderComponent";

const InquiryStats = ({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: JSX.Element;
}) => (
  <Grid component="div" size={{ xs: 12, sm: 4 }} sx={{}}>
    <GenericCard>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2}>
          {icon}
          <CustomTypography variant fontWeight="bold">
            {title}
          </CustomTypography>
        </Box>
        <Box mt={1.5}>
          <CustomTypography variant fontWeight="bold" fontSize="1.6rem">
            {value}
          </CustomTypography>
        </Box>
      </CardContent>
    </GenericCard>
  </Grid>
);

const InquiryItem: FC<{ inquiry: any; onView: () => void }> = ({
  inquiry,
  onView,
}) => (
  <GenericCard height="180px" padding="0px">
    <CardContent sx={{ padding: "12px 20px" }}>
      <CustomTypography fontFamily="var(--font-raleway)" fontWeight="bold">
        Inquiry from {inquiry.user.name}
      </CustomTypography>
      <CustomTypography
        fontFamily="var(--font-raleway)"
        color="text.secondary"
        sx={{ marginTop: "10px" }}
      >
        {inquiry.description}
      </CustomTypography>
      <CustomTypography
        fontFamily="var(--font-raleway)"
        color="text.secondary"
        sx={{ marginTop: "6px" }}
      >
        {new Date(inquiry.createdAt).toLocaleDateString()}
      </CustomTypography>
      <Box mt={4} display="flex" justifyContent="space-between">
        <Button
          variant="contained"
          sx={{
            fontSize: "13px",
            fontWeight: "500",
            borderRadius: "30px",
            backgroundColor: "#FBC02D",
            boxShadow: "none",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              backgroundColor: "#FBC02D",
              boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.3)",
              transform: "scale(1.05)",
            },
          }}
          onClick={onView}
        >
          View Details
        </Button>
        <CustomTypography
          fontFamily="var(--font-raleway)"
          fontWeight="bold"
          color={inquiry.is_Active ? "red" : "green"}
        >
          {inquiry.is_Active ? "Active" : "Resolved"}
        </CustomTypography>
      </Box>
    </CardContent>
  </GenericCard>
);

const Inquiries = () => {
  const dispatch = useDispatch<any>();
  const { inquiries, loading } = useSelector(
    (state: RootState) => state.inquiries
  );
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getInquiries());
  }, [dispatch,inquiries?.length]);

  const handleOpenInquiry = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setIsReplyModalOpen(true);
  };

  const handleReply = async () => {
    if (!selectedInquiry) return;

    try {
      await dispatch(
        sendInquiryResponse({
          orderInquiriesId: selectedInquiry.orderInquiriesId,
          email: selectedInquiry.user.email,
          subject: selectedInquiry.options,
          message: replyMessage,
        })
      );

      toast.success("Reply sent successfully!");
      setIsReplyModalOpen(false);
      setReplyMessage("");
    } catch (error) {
      console.error("Failed to send reply:", error);
      toast.error("Failed to send reply. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <CustomTypography variant fontSize="1.2rem" fontWeight="bold">
        Customer Inquiries
      </CustomTypography>

      <Grid container spacing={3}>
        {[
          {
            title: "Total Inquiries",
            value: inquiries?.length || 0,
            icon: <Assignment sx={{ color: "#FBC02D", fontSize: "2rem" }} />,
          },
          {
            title: "Resolved Inquiries",
            value:
              inquiries?.filter((inquiry) => !inquiry.is_Active).length || 0,
            icon: (
              <CheckCircleOutline sx={{ color: "green", fontSize: "2rem" }} />
            ),
          },
          {
            title: "Active Inquiries",
            value:
              inquiries?.filter((inquiry) => inquiry.is_Active).length || 0,
            icon: <ErrorOutline sx={{ color: "red", fontSize: "2rem" }} />,
          },
        ].map((stat, index) => (
          <InquiryStats key={index} {...stat} />
        ))}
      </Grid>

      {loading ? (
        <LoaderComponent />
      ) : (
        inquiries?.map((inquiry) => (
          <InquiryItem
            key={inquiry.orderInquiriesId}
            inquiry={inquiry}
            onView={() => handleOpenInquiry(inquiry)}
          />
        ))
      )}
      {/* Inquiry Details Modal */}
      <CustomModal
        open={isReplyModalOpen}
        handleClose={() => setIsReplyModalOpen(false)}
        title="Inquiry Details"
      >
        {selectedInquiry && (
          <Box p={3} display="flex" flexDirection="column" gap={3}>
            {/* Inquiry Info */}
            <Box>
              <CustomTypography
                fontSize="1.1rem"
                fontWeight="bold"
                fontFamily="var(--font-raleway)"
              >
                Inquiry from {selectedInquiry.user.name}
              </CustomTypography>
              <CustomTypography
                fontFamily="var(--font-raleway)"
                fontSize="0.9rem"
              >
                <strong>Option: </strong>
                {selectedInquiry.options}
              </CustomTypography>
              <CustomTypography fontFamily="var(--font-raleway)">
                <strong>Description:</strong> {selectedInquiry.description}
              </CustomTypography>
            </Box>

            {/* Order Details */}
            <Box p={2} bgcolor="#f9f9f9" borderRadius={4}>
              <CustomTypography
                fontFamily="var(--font-raleway)"
                fontSize="1.1rem"
                fontWeight="bold"
                mb={1}
              >
                Order Details
              </CustomTypography>
              <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={1}>
                <CustomTypography fontFamily="var(--font-raleway)">
                  <strong>Order ID:</strong> {selectedInquiry.order.orderId}
                </CustomTypography>
                <CustomTypography fontFamily="var(--font-raleway)">
                  <strong>Contact:</strong>{" "}
                  {selectedInquiry.order.contactNumber}
                </CustomTypography>
                <CustomTypography fontFamily="var(--font-raleway)">
                  <strong>Total:</strong> ${selectedInquiry.order.total}
                </CustomTypography>
                <CustomTypography fontFamily="var(--font-raleway)">
                  <strong>Payment:</strong>{" "}
                  {selectedInquiry.order.paymentMethod}
                </CustomTypography>
                <CustomTypography fontFamily="var(--font-raleway)">
                  <strong>Status:</strong> {selectedInquiry.order.status}
                </CustomTypography>
              </Box>
            </Box>

            {/* Order Items */}
            <Box p={2} bgcolor="#f9f9f9" borderRadius={4}>
              <CustomTypography
                fontFamily="var(--font-raleway)"
                fontSize="1.1rem"
                fontWeight="bold"
                mb={1}
              >
                Ordered Items
              </CustomTypography>
              {selectedInquiry.order.orderItems.map((item: any) => (
                <Box
                  key={item.orderItemId}
                  display="flex"
                  alignItems="center"
                  gap={2}
                  mb={2}
                  p={2}
                  bgcolor="white"
                  borderRadius={2}
                  boxShadow={1}
                >
                  <img
                    src={item.variant.attachment}
                    alt={item.variant.product.name}
                    width={60}
                    height={60}
                    style={{ borderRadius: 5 }}
                  />
                  <Box>
                    <CustomTypography
                      fontFamily="var(--font-raleway)"
                      fontWeight="bold"
                    >
                      {item.variant.product.name}
                    </CustomTypography>
                    <CustomTypography
                      fontFamily="var(--font-raleway)"
                      color="gray"
                    >
                      {item.variant.product.description}
                    </CustomTypography>
                    <CustomTypography
                      fontFamily="var(--font-raleway)"
                      fontSize="0.9rem"
                    >
                      <strong>Color:</strong> {item.variant.color} |{" "}
                      <strong>Size:</strong> {item.variant.size}
                    </CustomTypography>
                    <CustomTypography
                      fontFamily="var(--font-raleway)"
                      fontSize="0.9rem"
                    >
                      <strong>Quantity:</strong> {item.quantity} |{" "}
                      <strong>Price:</strong> ${item.price}
                    </CustomTypography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Reply Section */}
            <Box p={2} bgcolor="#f5f5f5" borderRadius={4}>
              <CustomTypography
                fontFamily="var(--font-raleway)"
                fontSize="1.1rem"
                fontWeight="bold"
                mb={1}
              >
                Respond to Inquiry
              </CustomTypography>
              <GenericInput
                placeholder="Write your reply..."
                multiLine={true}
                disabled={selectedInquiry.is_Active ? false : true}
                value={replyMessage}
                onChange={(newValue: string) => setReplyMessage(newValue)}
                sx={{ fontSize: "40px" }}
              />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 2,
                }}
              >
                <Button
                  title="Reply"
                  type="submit"
                  variant="contained"
                  disabled={selectedInquiry.is_Active ? false : true}
                  sx={{
                    fontFamily: "var(--font-raleway)",
                    fontSize: "13px !important",

                    fontWeight: "400 !important",
                    borderRadius: "50px !important",
                    backgroundColor: "#FBC02D !important",
                    boxShadow: "none",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      fontFamily: "var(--font-raleway)",
                      backgroundColor: "#FBC02D !important",
                      color: "white !important",
                      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.5 )",
                      transform: "scale(1.005)",
                    },
                  }}
                  onClick={handleReply}
                >
                  Reply
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </CustomModal>
    </Box>
  );
};

export default Inquiries;
