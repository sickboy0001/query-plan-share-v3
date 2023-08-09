import { InsertQueryPlanXml } from "../db/QueryPlanXml";

export const newQueryPlanXml =  async (
  user_id: string,
  queryplanXml: string
) => {
  console.log([{ user_id, queryplanXml }]);
const result =  await  InsertQueryPlanXml(user_id, queryplanXml);
return result;
};
