import { EnderecoInterface } from "data/@types/EnderecoInterface";

const CurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
export const TextFormatService = {
  reverseDate(data: string): string {
    if (data.includes("/")) {
      return data.split("/").reverse().join("-");
    }

    if (data.includes("T")) {
      [data] = data.split("T");
    }
    return data.split("-").reverse().join("/");
  },
  currency(price = 0): string {
    if (isNaN(price)) {
      price = 0;
    }
    return CurrencyFormatter.format(price);
  },
  getNumbersFromText(text = ""): string {
    return text.replace(/\D/g, "");
  },
  dateToString(date: Date, withTime = false): string {
    const time = date.toISOString();
    if (withTime) {
      return time.substring(0, 19);
    }

    return time.substring(0, 10);
  },

  getAddress(endereco: EnderecoInterface | undefined): string {
    let enderecoFormatado = "";
    if (endereco) {
      enderecoFormatado += endereco.logradouro
        ? `${endereco.logradouro}, `
        : "";
      enderecoFormatado += endereco.numero ? `${endereco.numero} - ` : "";
      enderecoFormatado += endereco.bairro ? `${endereco.bairro}, ` : "";
      enderecoFormatado += endereco.cidade ? `${endereco.cidade} - ` : "";
      enderecoFormatado += endereco.estado ? `${endereco.estado}` : "";
    }

    return enderecoFormatado;
  },
  formatPhoneNumber(phoneNumber: string): string {
    const match = phoneNumber.match(/^(\d{2})(\d{5})(\d{4})/);

    if (match) {
      const [_, ddd, n1, n2] = match;
      return `(${ddd}) ${n1}-${n2}`;
    }
    return phoneNumber;
  },
  dateTime(date = ""): string {
    const dia = this.reverseDate(date),
      hora = date.substring(10, 5);

    // 2022-10-10T13:00:00Z

    // 2022-10-10 às 13:00:
    return `${dia} às ${hora}`;
  },
};
