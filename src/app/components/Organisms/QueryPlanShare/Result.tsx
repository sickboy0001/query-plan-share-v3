"use client";

import React, { useEffect, useState } from "react";

type Props = { userId: string };

export default function Result(props: Props) {
  // https://hackernoon.com/using-prismjs-as-a-syntax-highlighter-in-react
  const { userId } = props;
  const [openTab, setOpenTab] = useState(1);

  return (
    <div>
      <div className="justify-center ">
        <div className="flex flex-col ">
          <ul className="flex ">
            <li>
              <a
                href="#"
                onClick={() => setOpenTab(1)}
                className={` ${
                  openTab === 1 ? " bg-sky-600 text-white" : "bg-white "
                } inline-block px-4 py-2 text-gray-600 rounded shadow`}
              >
                chart
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
          </ul>
          <div className="p-1 mt-1 bg-white">
            <div className={openTab === 1 ? "block" : "hidden"}>
              <div>chart</div>
              <img src="/images/dummy.png" />
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
              <div>url</div>
              URL:https/xxxxxx/xxxx/xxxxxx
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                chart
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">
                Url
              </button>
              <button className="bg-red-500 hover:bg-red-700 text-white  py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="Code"></div>
      <div>
        {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown> */}
      </div>
    </div>
  );
}
