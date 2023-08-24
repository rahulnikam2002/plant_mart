import Image from 'next/image'
import { Inter } from 'next/font/google'
import { TextInput, PasswordInput } from '@/components/Inputs/Inputs';
import { Button } from '@/components/buttons/buttons';
// import styles from '../styles/inputs.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const handle = e => {
    console.log(e)
  }
  return (
    <main>
      <TextInput placeholder={"Type name"} setText={handle}  label={"Hello"}/>
      <PasswordInput placeholder={"Type name"} setText={handle}  label={"Hello"} />
      <Button title={"hello"} />
    </main>
  )
}


export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token !== process.env.NEXT_PUBLIC_TOKEN) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        isLogin: true,
      },
    };
  }
};