import api from "@/services/api";

// Send reply to an inquiry
export const sendInquiryReply = async (orderInquiriesId: string, email: string, subject: string, message: string) => {
  try {

    const response = await api.post("orders/respond/mail", {orderInquiriesId, email, subject, message });
    return response.data;
  } catch (error) {
    console.error("Error sending reply", error);
    throw error;
  }
};

// Get all inquiries
export const fetchInquiries = async () => {
  try {
    const response = await api.post("/orders/inquiries/all");
    return response.data?.data || [];
  } catch (error) {
    console.error("Error fetching inquiries", error);
  }
};
