import { User } from "@/@types";
import { mainAppAdapter } from "@/infra";
import { useQuery } from "@tanstack/react-query";

interface Response {
  user: User;
  accessToken: string;
  refreshToken: string;
}

const handler = async (): Promise<Response> =>
  (await mainAppAdapter.get("/auth/me"))?.data?.data;

export const useGetAuthenticatedUser = () =>
  useQuery(["user"], async () => handler());
