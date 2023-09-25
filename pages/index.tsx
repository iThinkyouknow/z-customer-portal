import type { NextPage } from "next";
import  { useRouter } from "next/router";
import {ButtonPrimary} from '@/components/ButtonPrimary'
import { useSession, signIn } from "next-auth/react"

const Home: NextPage = () => {
  const {data: session, status} = useSession();
  
  const router = useRouter()
  const logIn = async () => {
    await signIn("google");
  }
  if (status === 'authenticated') {
    router.replace('/portal')
    return null;
  }
  return (
    <main className="text-center w-screen h-screen flex justify-center items-center flex-col gap-8">
      <section>
      <h1 className="text-4xl">Zurich Customer Portal</h1>
      <p className="mt-2">Please Log in to Continue</p>
      </section>
      <div className="h-12">
      <ButtonPrimary onClick={logIn}>
        Log in with Google
      </ButtonPrimary>
      </div>
    </main>
  );
};

export default Home;