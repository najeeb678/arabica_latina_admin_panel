import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchInquiries, sendInquiryReply } from "../api/inquiriesApi";
import api from "@/services/api";

interface Inquiry {
  orderInquiriesId: string;
  orderId: string;
  options: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  is_Active: boolean;
  is_Deleted: boolean;
}

interface InquiriesState {
  inquiries: Inquiry[];
  loading: boolean;
  error: string | null;
  replyStatus: "idle" | "loading" | "succeeded" | "failed";
  replyError: string | null;
}

// Initial state
const initialState: InquiriesState = {
  inquiries: [],
  loading: false,
  error: null,
  replyStatus: "idle",
  replyError: null,
};

// Async thunk to fetch inquiries
export const getInquiries = createAsyncThunk("inquiries/fetchAll", async () => {
  const data = await fetchInquiries();
  return data || [];
});

// Async thunk to send a reply to an inquiry
export const sendInquiryResponse = createAsyncThunk(
  "inquiries/sendReply",
  async ({orderInquiriesId, email, subject, message }: { orderInquiriesId: string, email: string; subject: string; message: string }) => {

    const response = await sendInquiryReply( orderInquiriesId, email, subject, message );
    return response.data;
  }
);

const inquiriesSlice = createSlice({
  name: "inquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
   
      .addCase(getInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload;
      })
      .addCase(getInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch inquiries";
      })
  
      // Send inquiry reply
      .addCase(sendInquiryResponse.pending, (state) => {
        state.replyStatus = "loading";
        state.replyError = null;
      })
      .addCase(sendInquiryResponse.fulfilled, (state, action) => {
        state.replyStatus = "succeeded";
        
        // Find the inquiry that was replied to and update it
        const index = state.inquiries.findIndex(
          (inquiry) => inquiry.orderInquiriesId === action.payload.orderInquiriesId
        );
  
        if (index !== -1) {
          state.inquiries[index] = {
            ...state.inquiries[index],
            ...action.payload, // Merge updated data
          };
        }
      })
      .addCase(sendInquiryResponse.rejected, (state, action) => {
        state.replyStatus = "failed";
        state.replyError = action.error.message || "Failed to send reply";
      });
  }
  
});

export default inquiriesSlice.reducer;
