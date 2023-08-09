import React, { useEffect, useState } from "react";

const Files = [
  {
    name: "clustered index scan",
    description: "",
  },
  {
    name: "clustered index seek",
    description: "",
  },
  {
    name: "clustered index update",
    description: "",
  },

  {
    name: "clustered_index_merge",
    description: "",
  },
  {
    name: "constant scan",
    description: "insert into ...",
  },
  {
    name: "deleted_scan",
    description: "delete and deleted",
  },
  {
    name: "HashSpillDetails",
    description: "inner join ",
  },
  {
    name: "Not showing Seek Predicates",
    description: "",
  },
  {
    name: "table_merge",
    description: "merge ... mach update",
  },
  {
    name: "table_valued_functon",
    description: "error",
  },
  {
    name: "window_spool",
    description: "",
  },
  {
    name: "batch_hash_table_build",
    description: "large query ....",
  },
];

type Props = { userId: string };

export default function DummyList(props: Props) {
  // https://hackernoon.com/using-prismjs-as-a-syntax-highlighter-in-react
  const { userId } = props;
  const dummy = "/QueryPlanShare/dummy";

  // const filenames = getReaddirsync(dummy);
  // console.log(filenames);

  return (
    <div className="mb-2 w-5/6 mx-auto  ">
      <div>DummyList</div>

      <div className="justify-center ">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">cmd</th>
              <th className="border px-4 py-2">filename</th>
              <th className="border px-4 py-2">description</th>
              <th className="border px-4 py-2">path</th>
            </tr>
          </thead>
          <tbody>
            {Files.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">
                  <a
                    // href={{ pathname: dummy, query: { animal: "seal" } }}
                    // href=`${dummy}`
                    href={dummy + "?" + "filename=" + item.name}
                    key={index}
                  >
                    cmd
                  </a>
                </td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">{`/xml/dummy/queryplanxml/${item.name}.sqlplan`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
