import Button from "@/components/Button";
import ConnectWithUs from "@/components/ConnectWithUs";
import FunBackground from "@/components/FunBackground";
import PostCard from "@/components/PostCard";
import WhiteContainer from "@/components/WhiteContainer";
import { homePagePostsQuery, homePageQuery } from "@/data/homePageQuery";
import type {
  Page_Homepage,
  Page_Homepage_AboutSection,
  Page_Homepage_Landing,
  Page_Homepage_LatestNewAndInsights,
  Page_Homepage_Services,
  Post,
} from "@/gql/graphql";
import ArrowRight from "@/svgs/ArrowRight";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { fancyBulletPoints } from "./about";
import getGqlRequest from "@/data/getGqlRequest";
import { normalizePosts } from "./news-and-insights";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";
import classNames from "classnames";
import ChevronLeft from "@/svgs/ChevronLeft";
import ChevronRight from "@/svgs/ChevronRight";
import VideoPlayer from "@/components/VideoPlayer";
import PlayButton from "@/svgs/PlayButton";

export async function getStaticProps() {
  const { data } = await getGqlRequest(homePageQuery);
  const { data: postsData } = await getGqlRequest(homePagePostsQuery);
  const posts = normalizePosts(postsData);

  return {
    props: {
      data: data.page.homepage as Page_Homepage,
      posts,
    },
  };
}

const LandingVideo = ({ video }: { video: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const start = () => {
    setIsPlaying(true);
  };
  const stop = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <div
        className={classNames(
          { hidden: isPlaying },
          "cursor-pointer group absolute w-full h-full overflow-hidden z-[10]"
        )}
        onClick={start}
      >
        <Image
          src="/home-video.jpg"
          alt="video overlay"
          width={1920}
          height={1080}
          className="w-full h-full aspect-video object-cover"
        />
        <div className="transition-all w-full group-hover:scale-[1.05] absolute h-full flex justify-center items-center left-0 top-0 bg-slate-500/20 group-hover:bg-slate-500/10">
          <PlayButton />
        </div>
      </div>
      <VideoPlayer
        src={video}
        light={false}
        onStart={start}
        onPause={stop}
        onEnded={stop}
      />
    </>
  );
};

const LandingAndAbout = ({
  landing,
  aboutSection,
}: {
  landing: Page_Homepage_Landing;
  aboutSection: Page_Homepage_AboutSection;
}) => {
  return (
    <div className="flex flex-col items-center relative w-full">
      <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
        <FunBackground />
      </div>
      <div className="relative z-100">
        <section className="container flex flex-col md:flex-row justify-center items-center py-fis-2 px-4 md:px-0 ">
          <div className="w-full md:w-1/2 flex flex-col gap-6 items-start">
            <h1
              className="[&>p]:text-3xl md:[&>p]:text-5xl [&>p]:leading-[1.1] [&>p]:font-bold [&>p>strong:first-child]:text-fis-purple [&>p>strong]:text-fis-blue"
              dangerouslySetInnerHTML={{ __html: landing.title as string }}
            />
            <span
              className="max-w-[420px] [&>p]:text-xl"
              dangerouslySetInnerHTML={{
                __html: landing.description as string,
              }}
            />
            <Button
              variant="white"
              href="/contact"
              className="hover:!bg-slate-50/90"
              IconButton={<ArrowRight />}
            >
              {landing.callToAction?.title}
            </Button>
          </div>
          <div className="w-full md:w-1/2 pl-0 pt-fis-2 md:pt-0 md:pl-fis-2">
            <Image
              src={landing.image?.mediaItemUrl || ''}
              alt={landing.image?.altText || ''}
              width={1500}
              height={1500}
              className="rounded-lg"
            />
          </div>
        </section>
        <section className="container items-stretch rounded-lg overflow-hidden flex flex-col-reverse md:flex-row items-center relative before:content-[''] before:absolute before:w-full before:rounded-lg before:h-full before:bg-slate-100 before:opacity-95 before:left-0 before:right-0">
          <div className="w-full md:w-1/2 relative flex items-center">
            {aboutSection.video && <LandingVideo video={aboutSection.video} />}
          </div>
          <div className="px-4 p-fis-2 md:p-fis-2 w-full flex flex-col justify-center md:w-1/2 relative">
            <h2
              className="text-fis-blue text-2xl"
              dangerouslySetInnerHTML={{ __html: aboutSection.title as string }}
            />
            <hr className="mt-4 mb-8" />
            <span
              dangerouslySetInnerHTML={{
                __html: aboutSection.description as string,
              }}
            />
            <div className="flex justify-end mt-8">
              <Button variant="secondary" href="/about">
                {aboutSection.callToAction?.title}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const Services = ({ services }: { services: Page_Homepage_Services }) => {
  return (
    <div className="container py-fis-2 px-4 md:px-0">
      <h2
        className="text-5xl font-bold mb-fis-2"
        dangerouslySetInnerHTML={{ __html: services.title as string }}
      />
      <section className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
          <h3
            className="text-fis-blue text-2xl mb-6"
            dangerouslySetInnerHTML={{
              __html: services.investment?.title as string,
            }}
          />
          <span
            dangerouslySetInnerHTML={{
              __html: services.investment?.description as string,
            }}
          />
          <div className="flex justify-end mt-fis-1">
            <Button
              IconButton={<ArrowRight />}
              variant="primary"
              href="/wealth-management/individuals/investment-management"
            >
              {services.investment?.callToAction?.title}
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
          <Image
              src={services.investment?.image?.mediaItemUrl || ''}
              alt={services.investment?.image?.altText || ''}
            width={1200}
            height={1200}
            className="rounded-lg"
          />
        </div>
      </section>
      <section className="pt-fis-2">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
            <Image
              src={services.wealthManagement?.image?.mediaItemUrl || ''}
              alt={services.wealthManagement?.image?.altText || ''}
              width={1200}
              height={1200}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 pl-0 md:pl-fis-2">
            <h3
              className="text-fis-blue text-2xl mb-6"
              dangerouslySetInnerHTML={{
                __html: services.wealthManagement?.title as string,
              }}
            />
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: services.wealthManagement?.description as string,
              }}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pointer">
              {services.wealthManagement?.services?.map((service) => {
                return (
                  <div
                    className="rounded-lg bg-slate-50 p-4"
                    key={service?.title}
                  >
                    <h4
                      className="font-bold mb-2"
                      dangerouslySetInnerHTML={{
                        __html: service?.title as string,
                      }}
                    />
                    <span
                      className={fancyBulletPoints}
                      dangerouslySetInnerHTML={{
                        __html: service?.description as string,
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end mt-fis-1">
              <Button
                IconButton={<ArrowRight />}
                variant="primary"
                href="/wealth-management"
              >
                {services.wealthManagement?.callToAction?.title}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth > 768);
    const updateSize = () => {
      setIsMobile(window.innerWidth > 768);
    };

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  return isMobile;
}

const Arrow = ({
  className,
  style,
  onClick,
  direction,
}: {
  className?: string;
  style?: Record<string, string>;
  onClick?: () => void;
  direction: "left" | "right";
}) => {
  return (
    <div
      style={{ ...style }}
      className={classNames(className, "before:hidden z-[10000] !w-auto", {
        "!-bottom-12 !top-[initial] !left-[initial] right-[calc(44px+1rem)] md:!top-[50%] md:!bottom-[initial] md:!left-0":
          direction === "left",
        "!-bottom-12 !top-[initial] !right-0 md:!top-[50%] md:!bottom-[initial] md:!right-[calc(20%-2.25rem)]":
          direction === "right",
      })}
    >
      <Button
        variant="neutral"
        onClick={onClick}
        size="small"
        className="w-[44px] [&>div]:!justify-center"
      >
        {direction === "left" ? <ChevronLeft /> : <ChevronRight />}
      </Button>
    </div>
  );
};

const before =
  "before:hidden md:before:block before:content-[''] before:w-[10%] before:bg-gradient-to-r before:from-transparent before:to-white before:right-12 before:top-0 before:h-full before:absolute before:z-[100]";

const after =
  "after:hidden md:after:block after:content-[''] after:w-12 after:bg-white after:right-0 after:top-0 after:h-full after:absolute after:z-[100]";

const LatestNewAndHighlights = ({
  latestNewAndInsights,
  posts,
}: {
  latestNewAndInsights: Page_Homepage_LatestNewAndInsights;
  posts: Post[];
}) => {
  const isDesktop = useMediaQuery();

  const finalSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: isDesktop ? 4 : 1,
    slidesToScroll: 1,
  };

  return (
    <div className="flex justify-center relative w-full pt-fis-2">
      <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
        <FunBackground />
      </div>
      <div className="container w-full">
        <WhiteContainer>
          <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-between">
            <h3
              className="text-fis-blue text-2xl"
              dangerouslySetInnerHTML={{
                __html: latestNewAndInsights.title as string,
              }}
            />
            <Button
              IconButton={<ArrowRight />}
              variant="neutral"
              href="/news-and-insights/category/faith-retirement"
            >
              {latestNewAndInsights.link?.title}
            </Button>
          </div>
          <hr className="mt-4 mb-6" />
          <div className="w-full relative">
            <div
              className={classNames(
                "relative md:overflow-hidden",
                before,
                after
              )}
            >
              <div className="w-full md:w-[120%]">
                <Slider
                  {...finalSettings}
                  className="md:px-8"
                  prevArrow={<Arrow direction="left" />}
                  nextArrow={<Arrow direction="right" />}
                  swipe={false}
                  arrows
                >
                  {posts.map((post) => {
                    return (
                      <div key={post.slug} className="md:px-4">
                        <PostCard post={post} showButton showImage />
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </WhiteContainer>
      </div>
    </div>
  );
};

export default function HomePage({
  data,
  posts,
}: {
  data: Page_Homepage;
  posts: Post[];
}) {
  return (
    <>
      <Head>
        <title>{buildPageTitle("Home")}</title>
      </Head>
      {data.landing && data.aboutSection && (
        <LandingAndAbout
          landing={data.landing}
          aboutSection={data.aboutSection}
        />
      )}
      {data.services && <Services services={data.services} />}
      {data.latestNewAndInsights && (
        <LatestNewAndHighlights
          posts={posts}
          latestNewAndInsights={data.latestNewAndInsights}
        />
      )}
      {data.contactUsCtaSimple && (
        <ConnectWithUs connectWithUs={data.contactUsCtaSimple} />
      )}
    </>
  );
}
