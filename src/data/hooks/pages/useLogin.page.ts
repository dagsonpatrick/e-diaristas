import { yupResolver } from "@hookform/resolvers/yup";
import {
  CredenciaisInterface,
  LoginFormDataInterface,
} from "data/@types/FormInterface";
import { ExternalServiceContext } from "data/contexts/ExternalServiceContext";
import { UserContext } from "data/contexts/UserContext";
import { FormSchemaService } from "data/services/FormSchemaService";
import { LoginService } from "data/services/LoginService";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export default function useLogin() {
  const formMethods = useForm<LoginFormDataInterface<CredenciaisInterface>>({
      resolver: yupResolver(FormSchemaService.login()),
    }),
    [errorMessage, setErrorMessage] = useState(""),
    { userDispatch } = useContext(UserContext),
    { externalServicesState } = useContext(ExternalServiceContext);

  async function onSubmit(data: LoginFormDataInterface<CredenciaisInterface>) {
    setErrorMessage("");

    const loginSuccess = await LoginService.login(data.login);
    if (loginSuccess) {
      const user = await LoginService.getUser();
      if (user) {
        userDispatch({ type: "SET_USER", payload: user });
        return;
      }
    }

    setErrorMessage("E-mail e/ou Senha inválidos");
  }

  return { formMethods, onSubmit, externalServicesState, errorMessage };
}
