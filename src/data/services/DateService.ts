import { date } from "yup";

export const DateService = {
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
};
