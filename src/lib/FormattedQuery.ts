import { format } from "sql-formatter";


export const  getFormattedQuery= (query?:string|undefined|null)=>{ 
    
    // query:"SELECT * FROM [People] WHERE [id]=@1" → NG
    console.log("query:" + query);
    if(query){
        try {
            return format(query)
        } catch (error) {
            console.error(error);
            return query + " --error [sql-formatter]";
          }
          
    }
    return query;
  }
  