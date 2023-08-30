import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
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
