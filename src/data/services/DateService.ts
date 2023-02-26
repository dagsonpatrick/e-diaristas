import { date } from "yup";

export const DateService = {
  addHours(startTime: string, hours: number): string {
    let [hour, minute] = startTime.split(":").map(Number);

    hour = Math.min(hour + hours, 23);

    const newHour = hour.toString().padStart(2, "0"),
      newMinute = minute.toString().padStart(2, "0");

    return `${newHour}:${newMinute}`;
  },
  transformDate(value: any, originalValue: any): any {
    if (typeof originalValue === "string") {
      const [dia, mes, ano] = originalValue.split("/");
      if (+mes < 1 || +mes > 12) {
        return new Date("");
      }
      return new Date(+ano, +mes - 1, +dia);
    }
    return value;
  },
  minAdultBirthday(): Date {
    const data = new Date();
    data.setFullYear(data.getFullYear() - 18);
    return data;
  },
  maxAdultBirthday(): Date {
    const data = new Date();

    data.setFullYear(data.getFullYear() - 100);
    return data;
  },
  getTimeFromDate(date: string): string {
    const [_, time] = date.split("T"),
      [hours, minutes, ..._rest] = time.split(":");

    return `${hours}:${minutes}`;
  },
};
