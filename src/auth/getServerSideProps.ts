
import { GetServerSideProps } from "next";
import cookies from "next-cookies";


export const getServerSideProps: GetServerSideProps = async ({ req, res, resolvedUrl }) => {
    const { token } = cookies({ req }); 

  const protectedRoutes = [
    "/",
    "/products",
    "/schedule",
    "/products-variants",
    "/orders",
    "/customers",
  ];

  // Check if user is trying to access a protected route without a token
  if (!token && protectedRoutes.some(route => resolvedUrl.startsWith(route))) {
    return {
      redirect: {
        destination: "/authentication/sign-in", // Redirect to sign-in if not authenticated
        permanent: false,
      },
    };
  }

  const publicRoutes = ["/authentication/sign-in"];
  // Redirect to home if user is already authenticated and tries to visit sign-in page
  if (token && publicRoutes.includes(resolvedUrl)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} }; // If everything is fine, return props
};
