import React, { useEffect, useState } from "react";
import Prism from "prismjs";
type Props = {
  code: string;
  language: string;
};

export default function PrismJsCode(props: Props) {
  const { code, language } = props;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="Code">
      <h2> Code Syntax Block {language}</h2>
      <pre>
        <code className={`line-numbers language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
