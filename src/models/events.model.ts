import { User } from "@/models/users.model";

export type Event = {
  id: string;
  title: string;
  creator: User;
  startDate: string;
  endDate: string;
  active: boolean;
  location: string;
  attendants: User[];
};
