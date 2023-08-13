import React, { useEffect, useState } from "react";
import PrismJsCode from "@/app/components/Molecules/PrismJsCode";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

import { getFileContents } from "@/lib/Papaparse";
import QueryPlanHtmlDisp from "@/app/components/Molecules/QueryPlanHtmlDisp";
import { getQueryFromXml } from "@/lib/QueryPlanXml";

type Props = { userId: string };

export default function Dummy(props: Props) {
  // https://hackernoon.com/using-prismjs-as-a-syntax-highlighter-in-react
  const { userId } = props;
  const [openTab, setOpenTab] = useState(1);
  const [sqlplan, setSqlplan] = useState("");
  const [querys, setQuerys] = useState<string[]>([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    console.log(searchParams.has("filename")); //=> true
    console.log(searchParams.get("filename"));

    const filename = searchParams.has("filename")
      ? searchParams.get("filename")
      : "clustered index scan";

    const filePath = `/xml/dummy/queryplanxml/${filename}.sqlplan`;
    const fetchData = async () => {
      console.log("fetchData:start");
      const newtext = await getFileContents(filePath); // `await` を使って非同期処理の完了を待つ
      if (newtext && newtext != undefined) {
        setSqlplan(newtext);
        console.log("fetchData:end");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setQuerys([]);

    let querys: string[] = getQueryFromXml(sqlplan);

    setQuerys(querys);
  }, [sqlplan]);

  return (
    <div className="mb-2 w-5/6 mx-auto  ">
      {/* <h2> Code Syntax Block {lang}</h2> */}
      {/* <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
              <span>QueryPlan Chart</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-sky-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <QueryPlanHtmlDisp sqlplan={sqlplan} />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure> */}
      <div className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
        <span>QueryPlan Chart</span>
      </div>
      <QueryPlanHtmlDisp sqlplan={sqlplan} />
      <div className="px-4 pt-4 pb-2 text-sm text-gray-500"></div>
      {/* <QueryPlanHtmlDisp sqlplan={sqlplan} /> */}

      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
              <span>Query</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-sky-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div className="Code">
                {querys &&
                  querys.map((query, index) => (
                    <PrismJsCode key={index} code={query} language="sql" />
                  ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
              <span>QueryPlan Raw</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-sky-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <div className="Code">
                <PrismJsCode
                  key={"sqlplanxml_test"}
                  code={sqlplan}
                  language="xml"
                />
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div className="justify-center ">
        <div className="flex flex-col ">
          <ul className="flex ">
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(1)}
                className={` ${
                  openTab === 1 ? " bg-sky-600 text-gray-200" : "bg-white "
                } inline-block px-4 py-2 text-gray-600 rounded shadow`}
              >
                Dialog
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(2)}
                className={` ${
                  openTab === 2 ? "bg-sky-600 text-white" : "bg-white "
                } inline-block px-4 py-2 text-gray-600  rounded shadow`}
              >
                Url
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(3)}
                className={` ${
                  openTab === 3 ? "bg-sky-600 text-white" : "bg-white "
                } inline-block px-4 py-2 text-gray-600  rounded shadow`}
              >
                raw
              </a>
            </li>
          </ul>
          <div className="p-3 mt-6 bg-white">
            <div className={openTab === 1 ? "block" : "hidden"}>
              <img src="/images/dummy.png" />
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
              URL:https/xxxxxx/xxxx/xxxxxx
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                copy
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                Reset
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded">
                Delete
              </button>
            </div>
            <div className={openTab === 3 ? "block" : "hidden"}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
