import React, { useEffect, useState } from "react";
import PrismJsCode from "@/app/components/Molecules/PrismJsCode";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

import { getFileContents } from "@/lib/Papaparse";
import QueryPlanHtmlDisp from "@/app/components/Molecules/QueryPlanHtmlDisp";
import { getQueryFromXml } from "@/lib/QueryPlanXml";
import { QpvQueryPlans } from "@/app/model/qpv";
import {
  getQueryPlanXml,
  registQueryPlanXmlName,
  getUserName,
} from "@/app/bizlogic/QueryplanXml";

type Props = { userId: string };

export default function Dummy(props: Props) {
  // https://hackernoon.com/using-prismjs-as-a-syntax-highlighter-in-react
  const { userId } = props;
  const [queryPlanId, useQueryPlanId] = useState("");
  const [queryPlanXml, useQueryPlanXml] = useState<QpvQueryPlans>();
  const [xml, useXml] = useState("");
  const [queryPlanUserName, userQueryPlanUserName] = useState("");

  const [name, setName] = useState("");
  const [querys, setQuerys] = useState<string[]>([]);
  const [isWriteThing, setIsWriteThing] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const queryplan_id = searchParams.has("queryplan_id")
      ? searchParams.get("queryplan_id")
      : "";
    if (queryplan_id) {
      useQueryPlanId(queryplan_id);
    }

    // const filePath = `/xml/dummy/queryplanxml/${filename}.sqlplan`;
    const fetchData = async () => {
      // // console.log("fetchData:start");
      if (queryplan_id) {
        const object = await getQueryPlanXml(queryplan_id.toString()); // `await` を使って非同期処理の完了を待つ
        if (object) {
          if (object !== null) {
            console.log({ object });
            useQueryPlanXml(object);
            if (object.xml) {
              useXml(object.xml);
            }
          }
          if (object.name !== null) {
            setName(object.name);
          }
          console.log("fetchData:end");
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setQuerys([]);
    if (
      queryPlanXml &&
      queryPlanXml.xml != null &&
      queryPlanXml.xml !== undefined
    ) {
      let querys: string[] = getQueryFromXml(queryPlanXml.xml);
      setQuerys(querys);
    }
    // const fetchData = async () => {
    //   if (
    //     queryPlanXml &&
    //     queryPlanXml.user_id != null &&
    //     queryPlanXml.user_id !== undefined
    //   ) {
    //     const username = await getUserName(queryPlanXml.user_id);
    //     userQueryPlanUserName(username);
    //   }
    // };
    // fetchData();
  }, [queryPlanXml]);

  const handleChangeName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };
  const handleEditStart = () => {
    console.log("handleEditStart");
    setIsWriteThing(true);
  };
  const handleChangequeryplanName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };

  const registQueryPlanName = () => {
    //名前の登録
    registQueryPlanXmlName(queryPlanId, name.trim());
  };

  const handleBlur = () => {
    registQueryPlanName();

    setIsWriteThing(false);
  };

  return (
    <div className="mb-2 w-5/6 mx-auto  ">
      <div>
        <span className="text-xl m-1  text-gray-800 font-bold">Result</span>
        <a
          className="inline-flex items-center px-4 m-1   transition-colors duration-150  rounded-lg focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white "
          href={"/QueryPlanShare/list"}
        >
          List
        </a>
        <a
          className="inline-flex items-center px-4 m-1   transition-colors duration-150  rounded-lg focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white "
          href={"/QueryPlanShare/input"}
        >
          Input
        </a>
      </div>

      <div className="flex">
        <div className="p-2">Name</div>
        <div className="p-2">
          {!isWriteThing ? (
            <label onClick={handleEditStart}>{name}</label>
          ) : (
            <div>
              <input
                id="message"
                value={name}
                onBlur={() => handleBlur()}
                onChange={handleChangequeryplanName}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              ></input>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full justify-between rounded-lg bg-sky-100 px-4 py-2 text-left text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-sky-500 focus-visible:ring-opacity-75">
        <span>QueryPlan Chart</span>
      </div>
      {/* {queryPlanXml != null ? (
        <QueryPlanHtmlDisp sqlplan={queryPlanXml.xml} />
      ) : (
        ""
      )} */}
      <QueryPlanHtmlDisp sqlplan={xml} />

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
              {queryPlanXml ? (
                <div className="Code">
                  <PrismJsCode
                    key={"sqlplanxml_test"}
                    code={queryPlanXml.xml}
                    language="xml"
                  />
                </div>
              ) : (
                ""
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <div>{queryPlanUserName}</div>
    </div>
  );
}
