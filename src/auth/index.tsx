// auth/ProtectRoute.tsx
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

interface ProtectRouteProps {
  children: React.ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(false); 
  }, []);


  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fbc02d",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return <>{children}</>; 
};

export default ProtectRoute;
