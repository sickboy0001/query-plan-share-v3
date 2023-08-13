// import { parse } from 'papaparse';

import { getFormattedQuery } from "./FormattedQuery";

// export const FileParser = (file: File) => {
//   parse(file, {
//     complete: (results:any) => {
//       console.log(results?.data);
//     },
//   });
// };

// export const  getFileContents= async  (filepath:string)=>{ 


//     try {
//       const response = await fetch(filepath);
//       const file = await response.text();
//       return file;
//     } catch (error) {
//       console.error(error);
//     }
//   }

  export   function getQueryFromXml(xml: string) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(xml, "application/xml");
    let querys: string[] = getQueryFromDom(dom);
    return querys;
  }

  function getQueryFromDom(dom: Document) {
    const stmsimples = dom.getElementsByTagName("StmtSimple");
    console.log("StmtSimple:");
    console.log(stmsimples);

    let querys: string[] = [];
    if (stmsimples.length >= 0) {
      for (var i = 0; i < stmsimples.length; i++) {
        // console.log("StatementText:");
        const stmsimple = stmsimples[i];
        // console.log(stmsimple);
        const query = stmsimple.getAttribute("StatementText");
        const formatedquery = getFormattedQuery(query);
        console.log(formatedquery);
        if (formatedquery) {
          querys.push(formatedquery.toString());
        }
      }
    }
    return querys;
  }