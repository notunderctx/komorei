import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Header from "./Header";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="about" content="About this web" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/svg/c.svg" />
      </Head>
      <Header />
      <div
        className="h-screen w-full flex flex-col items-center justify-center text-white"
        style={{}}>
        <Image
          width={500}
          height={500}
          src="https://media.tenor.com/IHdlTRsmcS4AAAAM/404.gif"
          alt="404"
          className="w-[26vw] md:w-[15vw]"
        />
        <h1 className="text-2xl sm:text-4xl xl:text-6xl font-bold my-4">
          Oops!
        </h1>
        <p className="text-base sm:text-lg xl:text-xl text-gray-300 mb-6 text-center">
          something went wrong
        </p>
        <div className="flex gap-5 font-karla">
          <button
            type="button"
            onClick={() => {}}
            className="flex items-center gap-2 py-2 px-4 ring-1 ring-action/70 rounded hover:text-white transition-all duration-200 ease-out">
            <span>
              <ArrowLeftIcon className="w-5 h-5" />
            </span>
            Go back
          </button>
          <button
            type="button"
            onClick={() => {
              window.open("/");
            }}
            className="bg-white xl:text-xl  font-bold py-2 px-4 rounded hover:bg-opacity-80 text-black transition-all duration-200 ease-out">
            Home Page
          </button>
        </div>
      </div>
      {/** <Footer /> */}
    </>
  );
}
