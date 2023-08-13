"use client";

import { getQueryPlanXmls } from "@/app/bizlogic/QueryplanXml";
import React, { useEffect, useState } from "react";
import { Table } from "@/app/constants/List";
import { QpvQueryPlans } from "@/app/model/qpv";
import dayjs from "dayjs";
import { getQueryFromXml } from "@/lib/QueryPlanXml";

type Props = { userId: string };

export default function List(props: Props) {
  // https://hackernoon.com/using-prismjs-as-a-syntax-highlighter-in-react
  const { userId } = props;

  const [queryPlanList, setQueryPlanList] = useState<QpvQueryPlans[]>([]);

  useEffect(() => {
    const getQueryPlanXmlList = async () => {
      console.log("userid:" + userId);
      const newlist = await getQueryPlanXmls(userId);
      if (newlist) {
        setQueryPlanList(newlist);
      }
    };

    getQueryPlanXmlList();
  }, [userId]);

  const getCellValue = (qp: QpvQueryPlans, colname: string) => {
    // console.log({ colname });
    if (colname === "xml") {
      const cellvalue = qp[colname];
      return qp[colname].substring(0, 20);
    }
    if (colname.endsWith("_at")) {
      // const cellvalue = qp[colname];
      // const day1 = dayjs(qp[colname]);
      return dayjs(qp[colname]).format("YYYY-MM-DD HH:mm:ss");
    }
    if (colname in qp) {
      const cellvalue = qp[colname];
      return cellvalue;
    }
    if (colname === "user_name") {
      return "guest";
    }
    if (colname === "cmd") {
      return (
        <a
          className="inline-flex items-center h-8 px-4 m-2 text-sm  transition-colors duration-150  rounded-full focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white "
          href={"/QueryPlanShare/result?queryplan_id=" + qp["id"]}
        >
          Result
        </a>
      );
    }
    if (colname === "query") {
      // const cellvalue = qp[colname];
      if (qp["xml"]) {
        const xml: string = qp["xml"];
        const querys: string[] = getQueryFromXml(xml);
        const queryfull = querys.join("\r\n");
        const querydisp = queryfull.substring(0, 50);
        return querydisp;
      }
      return "";
    }
  };

  return (
    <div>
      <div>
        <span className="text-xl m-1  text-gray-800 font-bold">
          List-QueryPlanXml
        </span>
        <a
          className="inline-flex items-center px-4 m-1   transition-colors duration-150  rounded-lg focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white "
          href={"/QueryPlanShare/input"}
        >
          Input
        </a>
      </div>

      <div>
        <table className="border-collapse border border-slate-400 table-auto">
          <thead>
            <tr>
              {Table.map((column) => {
                return (
                  <td key={column.name} className="border border-slate-300">
                    {column.name}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {queryPlanList.map((qp) => {
              return (
                <tr key={qp.id}>
                  {Table.map((column) => {
                    return (
                      <td key={column.name} className="border border-slate-300">
                        {getCellValue(qp, column.name)}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* <table className="border-collapse border border-slate-400 table-auto">
          <thead>
            <tr>
              <th>idididid</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
}
