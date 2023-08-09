"use client";
import Link from "next/link";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

import { description } from "@/app/constants/TopStart";

const Menu = [
  // {
  //   name: "iikoto-Mittu",
  //   description: "毎晩寝る前に、1日で良かったことを3つ書く",
  //   icon: DocumentDuplicateIcon,
  //   href: "/iikotomittu/top",
  // },
  {
    name: "Result",
    description: "QueryPlanShare-Result ",
    icon: DocumentDuplicateIcon,
    href: "/QueryPlanShare/result",
  },
  {
    name: "List",
    description: "QueryPlanShare-List ",
    icon: DocumentDuplicateIcon,
    href: "/QueryPlanShare/list",
  },
  {
    name: "Input",
    description: "QueryPlanShare-Input ",
    icon: DocumentDuplicateIcon,
    href: "/QueryPlanShare/input",
  },
  {
    name: "Dummy",
    description: "QueryPlanShare-Dummy",
    icon: DocumentDuplicateIcon,
    href: "/QueryPlanShare/dummy",
  },
  {
    name: "DummyList",
    description: "QueryPlanShare-DummyList ",
    icon: DocumentDuplicateIcon,
    href: "/QueryPlanShare/dummyList",
  },
];

// プロフィール
const Start = () => {
  let markdownString = description[0];

  return (
    <div>
      <h1 className="text-3xl my-2 text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight ">
        QueryPlanShare
      </h1>
      <div className="flex justify-center ">
        <div className="markdown text-left  border-2 rounded-xl p-2">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {markdownString}
          </ReactMarkdown>
        </div>
      </div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-2">
          {Menu.map((item, index) => (
            <Link href={item.href} key={index}>
              <div className=" group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7">
                <div className="flex justify-center items-center w-12 h-12 bg-gray-200 rounded-xl">
                  <item.icon className="inline-block mr-1 fill-white" />
                </div>
                <div className="mt-5">
                  <h3 className="group-hover:text-gray-600 text-lg font-semibold text-gray-800 ">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-x-1.5 text-sm text-blue-600 decoration-2 group-hover:underline font-medium">
                    more
                    <svg
                      className="w-2.5 h-2.5"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Start;
