import Image from "next/image";
import AuthForm from "../components/AuthForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-warning-100">
      <section className="h-full py-12 sm:px-6">
        <div className="block @container lg:flex lg:items-center ">
          <div className="relative w-full flex-1">
            <h2 className="mb-6 text-center text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>
            <Image
              alt="Logo"
              height={280}
              width={280}
              src="/images/arr-luu.png"
              className="mx-auto w-3/4 object-cover @md:w-auto"
              priority
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
              လာ... အာလူး လာဖုတ်
            </h2>
          </div>
          <div className="flex w-full flex-1 items-center justify-center @container">
            <AuthForm />
          </div>
        </div>
      </section>
    </main>
  );
}
