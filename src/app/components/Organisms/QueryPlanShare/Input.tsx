"use client";

import { newQueryPlanXml } from "@/app/bizlogic/QueryplanXml";
import React, { useEffect, useState } from "react";

type Props = { userId: string };

export default function Input(props: Props) {
  const [queryplanxml, setQueryplanxml] = useState("");
  const [queryplanName, setQueryplanName] = useState("");
  // https://hackernoon.com/using-prismjs-as-a-syntax-highlighter-in-react
  const { userId } = props;
  const PlaceholderQueryPlanXml = `
  <ShowPlanXML xmlns="http://schemas.microsoft.com/sqlserver/2004/07/showplan" Version="1.1" Build="10.50.1600.1">
  <BatchSequence>
    <Batch>
      <Statements>
        <StmtSimple StatementText="SELECT * FROM [People] WHERE [id]=@1" StatementId="1" StatementCompId="1" StatementType="SELECT" StatementSubTreeCost="0.0032831" StatementEstRows="1" StatementOptmLevel="TRIVIAL" QueryHash="0x179B1350F4CDE9FA" QueryPlanHash="0x134F3E5A51729C2E">
            ・・・・
        `.trim();
  const PlaceholderNmae = "clustered index delete";
  const entryQueryPlan = async (): Promise<void> => {
    console.log({
      queryplanxml,
    });
    //データの登録
    //xmlの妥当性の確認
    console.log({ queryplanName });
    let buf = newQueryPlanXml(userId, queryplanxml, queryplanName);
    setQueryplanName("");
    setQueryplanxml("");
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    entryQueryPlan();
  };
  const handleChangequeryplanxml = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQueryplanxml(e.target.value);
  };
  const handleChangequeryplanName = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQueryplanName(e.target.value);
  };
  return (
    <div>
      {/* <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Input-QueryPlanXml
      </label> */}
      <div>
        <span className="text-xl m-1  text-gray-800 font-bold">
          {" "}
          Input-QueryPlanXml
        </span>
        <a
          className="inline-flex items-center px-4 m-1   transition-colors duration-150  rounded-lg focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white "
          href={"/QueryPlanShare/list"}
        >
          List
        </a>
      </div>

      <div
        className="pt-4 px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded-lg"
        role="alert"
      >
        <p>input QueryPlanXml! and Analyse</p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-12 gap-4 pt-4">
            <div className="col-span-1">Name</div>
            <div className="col-span-11">
              <input
                id="message"
                value={queryplanName}
                onChange={handleChangequeryplanName}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={PlaceholderNmae}
              ></input>
            </div>
            <div className="col-span-1">QueryPlan</div>
            <div className="col-span-11">
              <textarea
                id="message"
                rows={6}
                value={queryplanxml}
                onChange={handleChangequeryplanxml}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={PlaceholderQueryPlanXml}
              ></textarea>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-5 py-2.5 w-full text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Analyse!!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
