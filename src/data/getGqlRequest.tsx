import { API } from "@/constants";
import request from "graphql-request";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function getGqlRequest(document: any, variables?: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any = await request({
    url: API,
    document,
    variables,
  }).catch(console.error);

  return {
    data: data || {},
  };
}
