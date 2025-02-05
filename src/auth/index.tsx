import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface ProtectRouteProps {
  children: React.ReactNode;
}

export const ProtectRoute: React.FC<ProtectRouteProps> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const publicRoutes = ["/authentication/sign-in"];
  const protectedRoutes = [
    "/",
    "products/",
    "schedule/",
    "products-variants/,",
    "orders/,",
    "customers/",
  ];

  const isRouteProtected = (route: string) =>
    protectedRoutes.some((protectedRoute) => route.startsWith(protectedRoute));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token && isRouteProtected(router.pathname)) {
      router.replace("/authentication/sign-in");
    } else if (token && publicRoutes.includes(router.pathname)) {
      router.replace("/");
    }

  
    setLoading(false);
  }, [router.pathname]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};
