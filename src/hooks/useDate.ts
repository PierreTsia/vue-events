import format from "date-fns/format";
import isToday from "date-fns/isToday";
import isThisWeek from "date-fns/isThisWeek";
import isThisMonth from "date-fns/isThisMonth";

export const useDate = () => {
  const toReadableFormat = (date: Date | string) => {
    return format(new Date(date), "eeee d MMMM yyyy");
  };

  const dateIsToday = (date: Date | string): boolean => {
    return isToday(new Date(date));
  };

  const dateIsThisWeek = (firstDate: Date | string): boolean => {
    return isThisWeek(new Date(firstDate), { weekStartsOn: 1 });
  };

  const dateIsThisMonth = (date: Date | string) => {
    return isThisMonth(new Date(date));
  };

  return { toReadableFormat, dateIsToday, dateIsThisWeek, dateIsThisMonth };
};
