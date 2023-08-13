import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";
// import "/css/prism.css";
type Props = {
  code: string;
  language: string;
};

export default function PrismJsCode(props: Props) {
  const { code, language } = props;
  const ref = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   Prism.highlightAll();
  // }, []);

  useEffect(() => {
    const head = document.getElementsByTagName("head")[0];

    const scriptUrl = document.createElement("script");
    scriptUrl.type = "text/javascript";
    scriptUrl.src = "/js/prismjs/prism.js";
    head.appendChild(scriptUrl);

    const linkUrl = document.createElement("link");
    linkUrl.rel = "stylesheet";
    linkUrl.type = "text/css";
    linkUrl.href = "/css/prismjs/prism.css";
    head.appendChild(linkUrl);

    return () => {
      head.removeChild(scriptUrl);
      head.removeChild(linkUrl);
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      Prism.highlightElement(ref.current);
    }
  }, []);

  return (
    <div className="Code">
      <h2> Code Syntax Block {language}</h2>
      <pre>
        <code className={`line-numbers language-${language}`} ref={ref}>
          {code}
        </code>
      </pre>
    </div>
  );
}
