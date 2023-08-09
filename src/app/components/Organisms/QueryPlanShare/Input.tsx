"use client";

import { newQueryPlanXml } from "@/app/bizlogic/QueryplanXml";
import React, { useEffect, useState } from "react";

type Props = { userId: string };

export default function Result(props: Props) {
  const [queryplanxml, setQueryplanxml] = useState("");

  // https://hackernoon.com/using-prismjs-as-a-syntax-highlighter-in-react
  const { userId } = props;
  const [openTab, setOpenTab] = useState(1);
  const PlaceholderQueryPlanXml = `
  <ShowPlanXML xmlns="http://schemas.microsoft.com/sqlserver/2004/07/showplan" Version="1.1" Build="10.50.1600.1">
  <BatchSequence>
    <Batch>
      <Statements>
        <StmtSimple StatementText="SELECT * FROM [People] WHERE [id]=@1" StatementId="1" StatementCompId="1" StatementType="SELECT" StatementSubTreeCost="0.0032831" StatementEstRows="1" StatementOptmLevel="TRIVIAL" QueryHash="0x179B1350F4CDE9FA" QueryPlanHash="0x134F3E5A51729C2E">
            ・・・・
        `.trim();
  const entryQueryPlan = async (): Promise<void> => {
    console.log({
      queryplanxml,
    });
    //データの登録
    //xmlの妥当性の確認
    let buf = newQueryPlanXml(userId, queryplanxml);
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
  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Input-QueryPlanXml
      </label>
      <div
        className="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded-lg"
        role="alert"
      >
        <p>input QueryPlanXml! and Analyse</p>
        <form onSubmit={handleSubmit}>
          <textarea
            id="message"
            rows={6}
            value={queryplanxml}
            onChange={handleChangequeryplanxml}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={PlaceholderQueryPlanXml}
          ></textarea>
          <div>
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
