import Head from "next/head";

import Categories from "@/_components/core/categoriesList/categoriesList";
import { GetServerSideProps } from "next";
import cookies from "next-cookies";
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { token } = cookies({ req });

  if (!token) {
    return {
      redirect: {
        destination: "/authentication/sign-in",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
export default function Home() {
  return (
    <>
      <Head>
        <title>Arabica Latina Admin Panel</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
        {/* <link rel="icon" type="image/png" sizes="32x32" href="/Images/Capa.svg" /> */}
      </Head>
      <Categories />
    </>
  );
}
