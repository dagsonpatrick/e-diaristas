import { DiariaInterface } from "./DiariaInterface";
import { EnderecoInterface } from "./EnderecoInterface";
import { UserInterface } from "./UserInterface";

export interface NovaDiariaFormDataInterface {
  endereco: EnderecoInterface;
  faxina: DiariaInterface;
}

export interface CadastroClienteFormDataInterface {
  usuario: UserInterface;
}

export interface LoginFormDataInterface<T> {
  login: T;
}

export interface CredenciaisInterface {
  email: string;
  password: string;
}

export interface PagamentoFormDataInterface {
  pagamento: {
    nome_cartao: string;
    numero_cartao: string;
    codigo: string;
    validade: string;
  };
  pagamento_recusado?: boolean;
}
