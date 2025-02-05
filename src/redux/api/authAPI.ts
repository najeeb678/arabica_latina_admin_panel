import api from "@/services/api";

import cookies from "next-cookies";
// Sign In
export const signIn = async (credentials: { email: string, password: string }) => {
   try {
      const response = await api.post("/auth/login", credentials);
      console.log("SignIn response: ", response)
      const userDetails = {
         token: response?.data.data?.access_token,
         name: response?.data.data?.name,
         address: response?.data.data?.address,
         email: response?.data.data?.email,
         contactNumber: response?.data.data?.contactNumber,
         profilePic: response?.data.data?.profilePic,
         subscription: response?.data.data?.subscription,
      };
      // Store the userDetails object in localStorage
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      localStorage.setItem("token", response?.data.data?.access_token);
      document.cookie = `token=${response?.data.data?.access_token}; path=/; max-age=86400`; 


      return response.data;
   } catch (error) {
      console.error("Error signing in", error);
      throw error;
   }
};
