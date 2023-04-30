import React from "react";
import { GetStaticProps } from "next";
import { useRecuperarSenha } from "data/hooks/pages/useRecuperarSenha";
import {
  FormFieldsContainer,
  LoginButton,
} from "@styles/pages/recuperar-senha.styled";
import TextField from "UI/components/inputs/TextField/TextField";
import { Container, Snackbar } from "@mui/material";
import PageTitle from "UI/components/data-display/PageTitle/PageTitle";
import PasswordStrenght from "UI/components/feedback/PasswordStrenght/PasswordStrenght";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "RecuperarSenha",
    },
  };
};

const RecuperarSenha: React.FC = () => {
  const router = useRouter();
  const {
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
  } = useRecuperarSenha(router.query.token as string);
  return (
    <Container>
      <PageTitle title={"Recuperação de Senha"} />
      {router.query.token ? (
        <FormFieldsContainer>
          <TextField
            label={"Digite seu E-mail"}
            type={"email"}
            fullWidth
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            label={"Digite a nova senha"}
            type={"password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
          />
          <TextField
            label={"Confirme a nova senha"}
            type={"password"}
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
            fullWidth
          />
          <PasswordStrenght password={password} />
          <LoginButton
            size={"large"}
            variant={"contained"}
            color={"secondary"}
            onClick={resetarSenha}
          >
            Redefinir Senha
          </LoginButton>
        </FormFieldsContainer>
      ) : (
        <FormFieldsContainer>
          <TextField
            label={"Digite seu E-mail"}
            type={"email"}
            onChange={(event) => {
              setEmail(event.target.value);
              setRequestEmail(false);
            }}
          />
          {requestEmail && (
            <TextField
              label={"Digite seu Token"}
              type={"text"}
              onChange={(event) => setValueInputToken(event.target.value)}
            />
          )}
          <LoginButton
            size={"large"}
            variant={"contained"}
            color={"secondary"}
            onClick={pedirTokenRecuperacao}
          >
            {requestEmail ? "Alterar Senha" : "Enviar E-mail"}
          </LoginButton>
        </FormFieldsContainer>
      )}
      <Snackbar
        open={mensagemSnack.length > 0}
        message={mensagemSnack}
        autoHideDuration={4000}
        onClose={() => setMensagemSnack("")}
      />
    </Container>
  );
};

export default RecuperarSenha;
