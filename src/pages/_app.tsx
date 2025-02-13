import Layout from "@/_components/core/Layout/Layout";

import "@/styles/globals.css";
import { AppProps } from "next/app";
import { Raleway } from "next/font/google";
import { Provider } from "react-redux";
import store from "@/redux/store";
import ProtectRoute from "@/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-raleway",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${raleway.className}`}>
      <Provider store={store}>
        <ProtectRoute>
        <ToastContainer />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ProtectRoute>
      </Provider>
    </div>
  );
}
