import { User } from "@/@types";

export interface Users {
  data: {
    users: User[];
    totalCount: number;
  };
}
