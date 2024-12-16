import ConnectWithUs from "@/components/ConnectWithUs";
import FunBackground from "@/components/FunBackground";
import { NavBar } from "@/components/NavBar";
import WhiteContainer from "@/components/WhiteContainer";
import { financialPlanningPageQuery } from "@/data/financialPlanningPageQuery";
import getGqlRequest from "@/data/getGqlRequest";
import { Page_Financialplanning } from "@/gql/graphql";
import { NextPageWithLayout } from "@/pages/_app";
import { fancyBulletPoints } from "@/pages/about";
import buildPageTitle from "@/utils/buildPageTitle";
import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";

export async function getStaticProps() {
  const { data } = await getGqlRequest(financialPlanningPageQuery);

  return {
    props: {
      data: data.page.financialPlanning,
    },
  };
}

export const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--purple)/0.15)_0%,rgba(256,256,256,1)_50%)]";

const FinancialPlanningPage: NextPageWithLayout<{
  data: Page_Financialplanning;
}> = ({ data }) => {
  const { introduction, collaboration } = data;

  return (
    <>
      <Head>
        <title>{buildPageTitle("Financial planning")}</title>
      </Head>
      <section
        className={classNames("container px-4 md:px-fis-2 py-fis-2", radialBg)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <div
              className={fancyBulletPoints}
              dangerouslySetInnerHTML={{ __html: introduction || "" }}
            />
          </div>
        </div>
      </section>
      <div className="w-full pb-fis-2 bg-slate-100">
        <div className="flex justify-center relative w-full pt-fis-2">
          <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
            <FunBackground />
          </div>
          <div className="container w-full">
            <WhiteContainer>
              <section>
                <div
                  className="text-2xl text-fis-blue mb-4"
                  dangerouslySetInnerHTML={{
                    __html: collaboration?.title || "",
                  }}
                />
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: collaboration?.description || "",
                      }}
                    />
                  </div>
                  <div className="w-full md:w-1/2 mt-fis-2 md:mt-0">
                    <Image
                      src="/Collaboration.png"
                      alt="You worked hard to secure your wealth"
                      width={1500}
                      height={1500}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </section>
            </WhiteContainer>
          </div>
        </div>
      </div>
      <ConnectWithUs
        className="bg-slate-100"
        connectWithUs={{
          link: { title: "Connect with us", url: "/contact" },
          title: "Interested in more information?",
          description: "Reach out and let’s explore how we can support you.",
        }}
      />
    </>
  );
};

export const Nav = () => {
  return (
    <NavBar
      navBar={[
        {
          title: "Individuals",
          href: "/services/individuals/financial-planning",
        },
        {
          title: "Companies & Not-For-Profit Organizations",
          href: "/services/companies-not-for-profit-organizations/retirement-plans",
        },
        {
          title: "Separately Managed Accounts (SMA)",
          href: "/services/separately-managed-accounts",
        },
      ]}
    />
  );
};

// TODO: get data from query
export const subLayout = (page: ReactElement) => {
  return (
    <div className="flex flex-col justify-center w-full items-center">
      <div className="container w-full">
        <Nav />
      </div>
      <section className="container w-full px-4 md:px-fis-2 py-fis-1 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
          <h3 className="text-2xl text-fis-blue">
            You worked hard to secure your wealth.
          </h3>
          <hr className="my-4" />
          <p>
            Our first priority is to protect what you entrust to us. As a
            thoughtful, caring steward, we help those with more than $2 million
            plan and invest for their financial goals. Our family office
            services include financial planning and comprehensive global wealth
            management for individuals and business owners.
          </p>
        </div>
        <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
          <Image
            src="/Individuals.png"
            alt="You worked hard to secure your wealth"
            width={1500}
            height={1500}
            className="rounded-lg"
          />
        </div>
      </section>
      <div className="container w-full">
        <NavBar
          className="!pb-0"
          navBar={[
            {
              title: "Financial Planning",
              href: "/services/individuals/financial-planning",
            },
            {
              title: "Investment Management",
              href: "/services/individuals/investment-management",
            },
          ]}
        />
      </div>
      <div className="w-full flex flex-col items-center">{page}</div>
    </div>
  );
};

FinancialPlanningPage.getSubLayout = subLayout;

export default FinancialPlanningPage;
