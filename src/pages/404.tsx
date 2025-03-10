import Button from "@/components/Button";
import buildPageTitle from "@/utils/buildPageTitle";
import Head from "next/head";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>{buildPageTitle("Page not found")}</title>
      </Head>
      <section className="h-screen w-screen flex justify-center items-center flex-col gap-4">
        <h1 className="text-fis-blue text-2xl">404 not found.</h1>
        <p>This page could not be found.</p>
        <Button href="/" variant="tertiary">
          Go back home
        </Button>
      </section>
    </>
  );
}
