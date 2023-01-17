import * as yup from "yup";
import { ValidationService } from "./ValidationService";
import { DateService } from "./DateService";
import { PaymentService } from "./PaymentService";

export const FormSchemaService = {
  newContact() {
    return yup
      .object()
      .shape({
        usuario: yup.object().shape({
          email: yup.string().email("E-mail inválido"),
          password: yup.string().min(5, "Senha muito curta"),
          password_confirmation: yup
            .string()
            .min(5, "Senha muito curta")
            .oneOf([yup.ref("password"), null], "As senhas não estão iguais"),
        }),
      })
      .defined();
  },
  userData() {
    return yup
      .object()
      .shape({
        usuario: yup.object().shape({
          nome_completo: yup.string().min(3, "Digite seu nome completo"),
          nascimento: yup
            .date()
            .transform(DateService.transformDate)
            .min(DateService.maxAdultBirthday(), "Digite uma data válida")
            .max(DateService.minAdultBirthday(), "Proibido menores de idade")
            .typeError("Digite uma data válida"),
          cpf: yup.string().test("cpf", "CPF inválido", ValidationService.cpf),
          telefone: yup
            .string()
            .test("telefone", "Telefone inválido", ValidationService.telefone),
        }),
      })
      .defined();
  },
  payment() {
    return yup
      .object()
      .shape({
        pagamento: yup.object().shape({
          numero_cartao: yup.string().test(
            "card_number",
            "Número de cartão inválido",
            (value) =>
              PaymentService.validate({
                card_number: value as string,
                card_holder_name: "",
                card_cvv: "",
                card_expiration_date: "",
              }).card_number
          ),
          nome_cartao: yup.string(),
          validade: yup.string().test(
            "card_expiration_date",
            "Data de validade inválida",
            (value) =>
              PaymentService.validate({
                card_number: "",
                card_holder_name: "",
                card_cvv: "",
                card_expiration_date: value as string,
              }).card_expiration_date
          ),
          codigo: yup.string().test(
            "card_cvv",
            "Código de validação inválido",
            (value) =>
              PaymentService.validate({
                card_number: "",
                card_holder_name: "",
                card_cvv: value as string,
                card_expiration_date: "",
              }).card_cvv
          ),
        }),
      })
      .defined();
  },
  address() {
    return yup
      .object()
      .shape({
        endereco: yup.object().shape({
          cep: yup.string().test("cep", "CEP Inválido", ValidationService.cep),
          estado: yup.string(),
          cidade: yup.string(),
          bairro: yup.string(),
          logradouro: yup.string(),
          numero: yup.string(),
          complemento: yup.string().nullable().default(undefined).notRequired(),
        }),
      })
      .defined();
  },
  detalheServico() {
    return yup.object().shape({
      faxina: yup.object().shape({
        data_atendiment: yup
          .date()
          .transform(DateService.transformDate)
          .typeError("Digite uma data válida")
          .test(
            "antecedencia",
            "O agendamento deve ser feito com pelo menos 48 horas de antecedência",
            (value, data) => {
              if (typeof value === "object") {
                return ValidationService.horarioDeAgendamento(
                  value.toJSON().substring(0, 10),
                  data.parent.hora_inicio as string
                );
              }
              return false;
            }
          ),

        hora_inicio: yup
          .string()
          .test("hora_valida", "Digite uma hora válida", ValidationService.hora)
          .test(
            "hora_inicio",
            "O serviço não deve começar antes das 06:00",
            (value) => {
              if (value) {
                const [hora] = value.split(":");
                return +hora >= 6;
              }
              return false;
            }
          ),
        hora_termino: yup
          .string()
          .test(
            "hora_termino",
            "O serviço não deve encerrar após as 22:00",
            (value) => {
              if (value) {
                const [hora, minuto] = value.split(":");
                if (+hora < 22) {
                  return true;
                } else if (+hora === 22) {
                  return +minuto === 0;
                }
                return false;
              }
              return false;
            }
          )
          .test(
            "tempo_servico",
            "O serviço não deve levar mais de 8 horas",
            (value, data) => {
              if (value) {
                const [horaTermino] = value.split(":"),
                  [horaInicio] = data.parent?.hora_inicio?.split(":") ?? [""];

                return +horaTermino - +horaInicio <= 8;
              }

              return false;
            }
          ),
      }),
    });
  },
  login() {
    return yup.object().shape({
      login: yup.object().shape({
        email: yup.string().email("E-mail inválido"),
        password: yup.string().min(5, "Senha muito curta"),
      }),
    });
  },
};
