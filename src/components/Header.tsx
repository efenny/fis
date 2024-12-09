import React, { ReactElement, useState } from "react";
import classNames from "classnames";
import Menu from "./Menu";
import type { IMenuItem } from "./Menu";
import Logo from "./Logo";
import Link from "next/link";
import Twitter from "@/svgs/Twitter";
import Linkedin from "@/svgs/Linkedin";
import Facebook from "@/svgs/Facebook";
import ExternalLink from "@/svgs/ExternalLink";
import Search from "@/svgs/Search";
import Phone from "@/svgs/Phone";
import TextField from "./Forms/TextField";

export const menu: IMenuItem[] = [
  { title: "Home", path: "/" },
  { title: "Wealth Management", path: "/wealth-management" },
  {
    title: "Services",
    path: "/services",
    children: [
      {
        title: "Individuals",
        path: "/services/individuals/financial-planning",
        children: [
          {
            title: "Financial Planning",
            path: "/services/individuals/financial-planning",
          },
          {
            title: "Investment Management",
            path: "/services/individuals/investment-management",
          },
        ],
      },
      {
        title: "Companies not for profit organizations",
        path: "/services/companies-not-for-profit-organizations/retirement-plans",
        children: [
          {
            title: "Retirement Plans",
            path: "/services/companies-not-for-profit-organizations/retirement-plans",
          },
          {
            title: "Endowments",
            path: "/services/companies-not-for-profit-organizations/endowments",
          },
        ],
      },
      {
        title: "Separately Managed Accounts (SMA)",
        path: "/services/separately-managed-accounts",
      },
    ],
  },
  {
    title: "Etfs",
    path: "/etfs/kocg",
    children: [
      { title: "KOCG", path: "/etfs/kocg" },
      { title: "PRAY", path: "/etfs/pray" },
    ],
  },
  {
    title: "About",
    path: "/about",
    children: [
      { title: "Mission", path: "/about#mission" },
      { title: "Values", path: "/about#values" },
      { title: "Team", path: "/about#team" },
    ],
  },
  { title: "News and Insights", path: "/news-and-insights" },
  {
    title: "Contact",
    path: "/contact",
    children: [{ title: "Careers", path: "/contact/careers" }],
  },
];

export const FormAndADV = ({
  color = "text-fis-purple",
}: {
  color?: string;
}) => {
  return (
    <>
      <a
        href="#"
        className={classNames("hover:text-fis-blue transition-all", color)}
      >
        Form CRS
        <span className="inline-block w-[1rem] h-[0.9rem] ml-2">
          <ExternalLink />
        </span>
      </a>
      <a
        href="#"
        className={classNames("hover:text-fis-blue transition-all", color)}
      >
        ADV Disclosures
        <span className="inline-block w-[1rem] h-[0.9rem] ml-2">
          <ExternalLink />
        </span>
      </a>
    </>
  );
};

type SocialIconType = "facebook" | "linkedin" | "twitter";

interface ISocial {
  icon: SocialIconType;
  url: string;
}

const iconMap: { [icon in SocialIconType]: () => ReactElement } = {
  twitter: Twitter,
  facebook: Facebook,
  linkedin: Linkedin,
};

const getIconMap = (icon: SocialIconType) => {
  return iconMap[icon];
};

const socials: ISocial[] = [
  { icon: "facebook", url: "" },
  { icon: "linkedin", url: "" },
  { icon: "twitter", url: "" },
];

export const SocialAndPhone = () => {
  return (
    <>
      {socials.map(({ url, icon }) => (
        <a
          key={icon}
          href={url}
          target="_blank"
          className="flex w-[20px] h-[20px] flex justify-center text-fis-purple hover:text-fis-blue transition-all"
        >
          {getIconMap(icon)()}
        </a>
      ))}
      <a
        href="tel:833-833-1311"
        className={classNames("text-fis-purple hover:text-fis-blue")}
      >
        <span className="inline-block w-[1rem] h-[0.9rem] mr-2">
          <Phone />
        </span>
        833-833-1311
      </a>
    </>
  );
};

const SearchComponent = () => {
  const results = [];
  return (
    <div className="absolute w-full h-full bg-white top-0 left-0 z-[100000]">
      <TextField type="text" name="search" label="Search:" />
      {!!results.length && results.map(() => "ret")}
      {!results.length && <div>Start typing to search...</div>}
    </div>
  );
};

// TODO: get data for top nav
// and make mobile menu :D
export default function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);
  return (
    <>
      <header className="flex justify-center h-[100px] p-4 sticky top-0 left-0 bg-white relative z-[1000]">
        <div className="container w-full flex items-center justify-between">
          <Link href="/">
            <Logo dimensions={{ width: 237, height: 57 }} />
          </Link>
          <div className="flex flex-col gap-4">
            <div className="flex justify-end gap-6">
              <FormAndADV />
              <div className="flex gap-6">
                <SocialAndPhone />
              </div>
              <button
                onClick={() => setIsSearchActive(true)}
                className="text-fis-blue hover:text-fis-purple transition-all"
              >
                <Search />
              </button>
            </div>
            <Menu menu={menu} />
          </div>
        </div>
      </header>
      {isSearchActive && <SearchComponent />}
    </>
  );
}
