import { ResponseBuilderData } from "@/lib/response-builder";

export const logOut = async (): Promise<ResponseBuilderData<null>> => {
  const response = await fetch(`/api/oauth/logout`, {
    method: "POST",
  });

  const responseData = await response.json();

  return responseData;
};
