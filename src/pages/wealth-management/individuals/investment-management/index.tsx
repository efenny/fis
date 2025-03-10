import { NextPageWithLayout } from "@/pages/_app";
import classNames from "classnames";
import { subLayout } from "../financial-planning";
import { SubscribeSection } from "@/pages/contact";
import getGqlRequest from "@/data/getGqlRequest";
import { investmentManagementPageQuery } from "@/data/investmentManagementPageQuery";
import {
  Page_Investmentmanagement,
  ThemeGeneralSettings_Globaloptions,
} from "@/gql/graphql";
import { fancyBulletPoints } from "@/pages/about";
import Image from "next/image";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";
import { individualPageQuery } from "@/data/individualPageQuery";
import { globalOptionsQuery } from "@/data/globalOptionsQuery";

export async function getStaticProps() {
  const { data } = await getGqlRequest(investmentManagementPageQuery);
  const { data: individualData } = await getGqlRequest(individualPageQuery);
  const { data: globalData } = await getGqlRequest(globalOptionsQuery);

  return {
    props: {
      data: data.page.investmentManagement,
      sublayoutData: individualData.page.individual,
      globalData: globalData.themeGeneralSettings.globalOptions,
    },
  };
}

export const radialBg =
  "bg-[radial-gradient(at_top_center,rgba(var(--purple)/0.15)_0%,rgba(256,256,256,1)_50%)]";

const InvestmentManagementPage: NextPageWithLayout<{
  data: Page_Investmentmanagement;
  globalData: ThemeGeneralSettings_Globaloptions;
}> = ({ data, globalData }) => {
  const {
    investmentPhilosophy,
    howWeServe,
    ourProcess,
    ourPortfolios,
    wealthTransition,
  } = data;

  return (
    <>
      <Head>
        <title>{buildPageTitle("Investment Management")}</title>
      </Head>
      <section
        className={classNames("container px-4 md:px-fis-2 py-fis-2", radialBg)}
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <div
              className="text-2xl text-fis-blue mb-4"
              dangerouslySetInnerHTML={{ __html: howWeServe?.title || "" }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: howWeServe?.description || "",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-fis-2">
          <div className="w-full md:w-1/2">
            <div
              className="text-2xl text-fis-blue mb-4"
              dangerouslySetInnerHTML={{ __html: ourProcess?.title || "" }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: ourProcess?.description || "",
              }}
            />
          </div>
        </div>
      </section>
      <div className="w-full py-fis-2 bg-slate-100 flex justify-center">
        <section className="container px-4 md:px-fis-2">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
              <div
                className="text-2xl text-fis-blue mb-4"
                dangerouslySetInnerHTML={{
                  __html: wealthTransition?.title || "",
                }}
              />
              <div
                className={classNames(fancyBulletPoints, "[&_h6]:text-xs")}
                dangerouslySetInnerHTML={{
                  __html: wealthTransition?.description || "",
                }}
              />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-fis-2 mt-fis-2 md:mt-0">
              <div
                className="text-2xl text-fis-blue mb-4"
                dangerouslySetInnerHTML={{
                  __html: investmentPhilosophy?.title || "",
                }}
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: investmentPhilosophy?.description || "",
                }}
              />
            </div>
          </div>
        </section>
      </div>
      <section className="container px-4 md:px-fis-2 p-fis-2">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
            <div
              className="text-2xl text-fis-blue mb-4"
              dangerouslySetInnerHTML={{ __html: ourPortfolios?.title || "" }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: ourPortfolios?.description || "",
              }}
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-fis-2 mt-fis-2 md:mt-0">
            <Image
              src={ourPortfolios?.image?.mediaItemUrl || ''}
              alt={ourPortfolios?.image?.altText || ''}
              width={550}
              height={550}
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
      {globalData.subscribe && (
        <div className="w-full bg-slate-100 pb-fis-2">
          <SubscribeSection data={globalData.subscribe} />
        </div>
      )}
    </>
  );
};

InvestmentManagementPage.getSubLayout = subLayout;

export default InvestmentManagementPage;
