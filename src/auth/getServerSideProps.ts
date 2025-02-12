
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


  if (!token && protectedRoutes.some(route => resolvedUrl.startsWith(route))) {
    return {
      redirect: {
        destination: "/authentication/sign-in", 
        permanent: false,
      },
    };
  }

  const publicRoutes = ["/authentication/sign-in"];

  if (token && publicRoutes.includes(resolvedUrl)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} }; 
};
