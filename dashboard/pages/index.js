import Image from "next/image";
import { Inter } from "next/font/google";
import {
  TextInput,
  PasswordInput,
  IconInput
} from "@/components/Inputs/Inputs";
import { Button, IconButton } from "@/components/buttons/buttons";
import styles from "../styles/home.module.css";
import { useState } from "react";
import Layout from "@/components/Layout/Layout";
import Head from "next/head";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const clickHandle = () => {
    setIsLoading(!isLoading);
  };
  return (
    <>
      <Head>
        <title>Dashboard | Plant Mart</title>
      </Head>
      <main className={styles.main}>
        <p>Hello Dashboard!</p>
      </main>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.NEXT_PUBLIC_TOKEN) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  } else {
    return {
      props: {
        isLogin: true
      }
    };
  }
};
