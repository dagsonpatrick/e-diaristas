import { ExternalServiceContext } from "data/contexts/ExternalServiceContext";
import { ApiServiceHateoas } from "data/services/ApiService";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

export function useRecuperarSenha(token = "") {
  const router = useRouter(),
    [email, setEmail] = useState(""),
    { externalServicesState } = useContext(ExternalServiceContext),
    [mensagemSnack, setMensagemSnack] = useState(""),
    [password, setPassword] = useState(""),
    [confirmarSenha, setConfirmarSenha] = useState(""),
    [requestEmail, setRequestEmail] = useState(false),
    [valueInputToken, setValueInputToken] = useState("");

  async function pedirTokenRecuperacao() {
    if (email.length > 8) {
      if (valueInputToken) {
        router.push({
          pathname: "/recuperar-senha",
          query: { token: valueInputToken },
        });
        token = valueInputToken;
        return;
      }
      ApiServiceHateoas(
        externalServicesState.externalService,
        "solicitar_alteracao_senha",
        async (request) => {
          try {
            await request({
              data: {
                email,
              },
            });
            setRequestEmail(true);
            setMensagemSnack(
              "Uma mensagem foi enviada ao seu E-mail para a recuperação da senha"
            );
          } catch (error) {}
        }
      );
    } else {
      setMensagemSnack("Digite um E-mail válido");
    }
  }

  async function resetarSenha() {
    if (password.length < 8) {
      setMensagemSnack("Senha muito curta!");
      return;
    }
    if (password != confirmarSenha) {
      setMensagemSnack("As senhas estão diferentes!");
      return;
    }
    ApiServiceHateoas(
      externalServicesState.externalService,
      "confirmar_alteracao_senha",
      async (request) => {
        try {
          await request({
            data: {
              token,
              email,
              password,
              password_confirmation: confirmarSenha,
            },
          });
          setMensagemSnack("Senha resetada");
        } catch (error) {
          setMensagemSnack("Erro ao resetar senha");
        }
      }
    );
  }

  return {
    router,
    email,
    setEmail,
    mensagemSnack,
    setMensagemSnack,
    confirmarSenha,
    setConfirmarSenha,
    pedirTokenRecuperacao,
    resetarSenha,
    setValueInputToken,
    password,
    setPassword,
    requestEmail,
    setRequestEmail,
  };
}
