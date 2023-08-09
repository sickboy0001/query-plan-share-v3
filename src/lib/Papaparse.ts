// import { parse } from 'papaparse';

// export const FileParser = (file: File) => {
//   parse(file, {
//     complete: (results:any) => {
//       console.log(results?.data);
//     },
//   });
// };

export const  getFileContents= async  (filepath:string)=>{ 


  try {
    const response = await fetch(filepath);
    const file = await response.text();
    return file;
  } catch (error) {
    console.error(error);
  }
}
