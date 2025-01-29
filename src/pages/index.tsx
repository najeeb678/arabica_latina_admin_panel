import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import Categories from "@/_components/core/categoriesList/categoriesList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Arabica Latina Admin Panel</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
     <Categories/>
    </>
  );
}
