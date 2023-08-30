import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  try {
    const myCookie = ctx.req?.cookies || "";
    console.log(myCookie);
    if (myCookie.token) {
      const verifyAdmin = await axios.post(
        `${process.env.NEXT_PUBLIC_API_HOST}/authentication/verify`,
        { token: myCookie.token }
      );
      if (verifyAdmin.data.code !== 1) {
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
    }
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  } catch (err) {
    // console.log(err)
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }
};
