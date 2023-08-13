import { InsertQueryPlanXml,selectQueryPlanXml,selectQueryPlanXmls ,updateQueryPlanXmlName,readQueryPlanXmlUserName} from "../db/QueryPlanXml";

export const newQueryPlanXml =  async (
  user_id: string,
  queryplanXml: string,
  queryplanName: string,
) => {
  console.log([{ user_id,queryplanName, queryplanXml }]);
const result =  await  InsertQueryPlanXml(user_id, queryplanXml,queryplanName);
return result;
};

export const getQueryPlanXmls =  async (
  user_id: string
) => {
  console.log([{ user_id }]);
  const result =  await  selectQueryPlanXmls(user_id);
  return result;
};

export const getQueryPlanXml = async( queryplan_id:string) =>{
  console.log([{ queryplan_id }]);
  const result =  await  selectQueryPlanXml(queryplan_id);
  return result;

}

export const registQueryPlanXmlName = async( queryplan_id:string,name:string) =>{
  console.log([{ queryplan_id }]);
  const result =  await  updateQueryPlanXmlName(queryplan_id,name);
  return result;

}

export const getUserName = async( user_id:string) =>{
  console.log([{ user_id }]);
  const result =  await  readQueryPlanXmlUserName(user_id);
  return result;

}

//getUserName