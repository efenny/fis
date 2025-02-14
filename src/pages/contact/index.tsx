import Button from "@/components/Button";
import { NavBar } from "@/components/NavBar";
import TextField from "@/components/Forms/TextField";
import FunBackground from "@/components/FunBackground";
import WhiteContainer from "@/components/WhiteContainer";
import {
  Page_Contactpage,
  ThemeGeneralSettings_Globaloptions,
  ThemeGeneralSettings_Globaloptions_Subscribe,
} from "@/gql/graphql";
import Phone from "@/svgs/Phone";
import classNames from "classnames";
import ArrowRight from "@/svgs/ArrowRight";
import Mail from "@/svgs/Mail";
import LocationMarker from "@/svgs/LocationMarker";
import getGqlRequest from "@/data/getGqlRequest";
import { handleSubmit } from "@/utils/submitForm";
import Image from "next/image";
import Field from "@/components/Forms/Field";
import Link from "next/link";
import Head from "next/head";
import buildPageTitle from "@/utils/buildPageTitle";
import { contactPageQuery } from "@/data/contactPageQuery";
import { globalOptionsQuery } from "@/data/globalOptionsQuery";

export async function getStaticProps() {
  const { data } = await getGqlRequest(contactPageQuery);
  const { data: globalData } = await getGqlRequest(globalOptionsQuery);

  return {
    props: {
      data: data.page.contactPage as Page_Contactpage,
      globalData: globalData.themeGeneralSettings.globalOptions,
    },
  };
}

export const navBar = [
  { title: "Contact Us", href: "/contact" },
  { title: "Careers", href: "/contact/careers" },
];

const buttons = "text-fis-blue hover:text-fis-purple transition-all";

const ContactForm = () => {
  return (
    <form
      name="contactForm"
      onSubmit={handleSubmit()}
      data-netlify="true"
      className="flex flex-col gap-4"
    >
      <input type="hidden" name="form-name" value="contactForm" />
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/2">
          <TextField name="firstName" label="First Name:" />
        </div>
        <div className="w-full md:w-1/2">
          <TextField name="lastName" label="Last Name:" />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/2">
          <TextField name="email" label="Email:" type="email" />
        </div>
        <div className="w-full md:w-1/2">
          <TextField name="company" label="Company:" />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full md:w-1/2">
          <TextField name="state" label="State:" />
        </div>
        <div className="w-full md:w-1/2">
          <TextField name="phone" label="Phone Number:" />
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-4">
        <div className="w-full">
          <TextField
            name="message"
            label="Comment or Message:"
            type="textarea"
          />
        </div>
      </div>
      <div className="flex justify-end mt-fis-1">
        <Button variant="secondary" onClick={() => {}}>
          Submit
        </Button>
      </div>
    </form>
  );
};

export const SubscribeSection = ({
  data,
}: {
  data: ThemeGeneralSettings_Globaloptions_Subscribe;
}) => {
  return (
    <div className="flex justify-center">
      <section className="flex flex-col-reverse md:flex-row pt-fis-2 container px-4 md:px-fis-2 items-center">
        <div className="w-full md:w-1/2 pt-fis-2 md:pt-0">
          <Image
            src={data.image?.mediaItemUrl || ''}
            alt={data.image?.altText || ''}
            width={1200}
            height={600}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 pl-0 md:pl-fis-2">
          <h3 className="text-2xl text-fis-blue mb-4">{data.title}</h3>
          <span
            className="font-bold block mb-4 max-w-[400px]"
            dangerouslySetInnerHTML={{ __html: data.description || "" }}
          />
          <form onSubmit={handleSubmit()} name="subscribe" data-netlify="true">
            <input type="hidden" name="form-name" value="subscribe" />
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <div className="w-full md:w-1/2">
                <TextField name="name" label="Name:" />
              </div>
              <div className="w-full md:w-1/2">
                <TextField name="email" label="Email:" type="email" />
              </div>
            </div>
            <div>
              <Field label="" name="consent">
                <label className="flex md:items-center gap-2">
                  <input type="checkbox" name="consent" id="consent" required />
                  <div>
                    I consent to the terms of the 
                    <Link
                      href="/privacy-policy"
                      className="text-fis-blue hover:text-fis-purple"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </div>
                </label>
              </Field>
            </div>
            <div className="flex mt-fis-1">
              <Button
                variant="secondary"
                onClick={() => {}}
                IconButton={<ArrowRight />}
              >
                Subsribe
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default function ContactPage({
  data,
  globalData,
}: {
  data: Page_Contactpage;
  globalData: ThemeGeneralSettings_Globaloptions;
}) {
  return (
    <>
      <Head>
        <title>{buildPageTitle("Contact")}</title>
      </Head>
      <div className="bg-slate-100 w-full pb-fis-2">
        <div className="flex justify-center relative w-full pt-fis-2">
          <div className="w-full h-[calc(100%-120px)] absolute left-0 top-0 bg-fis-blue/10">
            <FunBackground />
          </div>
          <div className="container w-full">
            <WhiteContainer>
              <div className="flex flex-col">
                <NavBar navBar={navBar} className="!pt-0" />
                <section className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/2 pr-0 md:pr-fis-2">
                    <ContactForm />
                  </div>
                  <div className="w-full md:w-1/2 flex flex-col pt-fis-1 md:pt-0 gap-fis-1 md:gap-fis-2">
                    {data?.contact?.map((c) => (
                      <div key={c?.phone} className="flex flex-col gap-2">
                        <a
                          className={classNames("flex items-center", buttons)}
                          href={`tel:${c?.phone}`}
                        >
                          <Phone />
                          <div className="ml-2">{c?.phone}</div>
                        </a>
                        <a
                          className={classNames("flex items-center", buttons)}
                          href={`mailto:${c?.email}`}
                        >
                          <Mail />
                          <div className="ml-2">{c?.email}</div>
                        </a>
                        <a
                          className={classNames("flex items-center", buttons)}
                          href={`http://maps.google.com/?q=${c?.location}`}
                          target="_blank"
                        >
                          <LocationMarker />
                          <div className="ml-2">{c?.location}</div>
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </WhiteContainer>
          </div>
        </div>
        {globalData.subscribe && (
          <SubscribeSection data={globalData.subscribe} />
        )}
      </div>
    </>
  );
}
