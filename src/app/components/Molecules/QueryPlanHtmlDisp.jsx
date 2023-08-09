import React, { useEffect, useState } from "react";


export default function QueryPlanHtmlDisp(props) {
  // https://hackernoon.com/using-prismjs-as-a-syntax-highlighter-in-react
  const { sqlplan } = props;
  const [scriptCode, setSriptCode] = useState("");

  useEffect(() => {
    const head = document.getElementsByTagName("head")[0] ;
    const scriptUrl = document.createElement("script");
    scriptUrl.type = "text/javascript";
    scriptUrl.src = "/js/qp/qp.js";
    head.appendChild(scriptUrl);

    // <link rel="stylesheet" type="text/css" href="../css/qp.css" />

    const linkUrl = document.createElement("link");
    linkUrl.rel = "stylesheet";
    linkUrl.type = "text/css";
    linkUrl.href = "/css/qp.css";
    head.appendChild(linkUrl);

    return () => {
      head.removeChild(scriptUrl);
      head.removeChild(linkUrl);
    };
  }, []);

  useEffect(() => {
    if (typeof QP !== "undefined") {
      QP.showPlan(document.getElementById("container"), sqlplan);
      // QP.drawLines(document.getElementById("container"));
    }

  }, [sqlplan]);

  return (
    <div>
      <div>
        <div>quer_plan_chart</div>
      </div>
      <div id="container"></div>
    </div>
  );
}
