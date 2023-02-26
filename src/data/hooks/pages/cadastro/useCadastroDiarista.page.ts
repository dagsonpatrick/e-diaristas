import { yupResolver } from "@hookform/resolvers/yup";
import { EnderecoInterface } from "data/@types/EnderecoInterface";
import { CadastroDiaristaFormDataInterface } from "data/@types/FormInterface";
import { UserInterface, UserType } from "data/@types/UserInterface";
import { ExternalServiceContext } from "data/contexts/ExternalServiceContext";
import {
  ApiService,
  ApiServiceHateoas,
  linksResolver,
} from "data/services/ApiService";
import { FormSchemaService } from "data/services/FormSchemaService";
import { LocalStorage } from "data/services/StorageService";
import { TextFormatService } from "data/services/TextFormatService";
import { UserService } from "data/services/UserService";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export default function useCadastroDiarista() {
  const [step, setStep] = useState(1),
    breadcrumbItems = ["Identificação", "Cidades atendidas"],
    userForm = useForm<CadastroDiaristaFormDataInterface>({
      resolver: yupResolver(
        FormSchemaService.userData()
          .concat(FormSchemaService.address())
          .concat(FormSchemaService.newContact())
      ),
    }),
    addressListForm = useForm<CadastroDiaristaFormDataInterface>(),
    { externalServicesState } = useContext(ExternalServiceContext),
    [load, setLoad] = useState(false),
    [newAddress, setNewAddress] = useState<EnderecoInterface>(),
    [newUser, setNewUser] = useState<UserInterface>(),
    enderecsAtendidos = addressListForm.watch("enderecosAtendidos"),
    [sucessoCadastro, setSucessoCadastro] = useState(false);

  async function onUserSubmit(data: CadastroDiaristaFormDataInterface) {
    const newUserLink = linksResolver(
      externalServicesState.externalService,
      "cadastrar_usuario"
    );

    if (newUserLink) {
      try {
        setLoad(true);
        const newUser = await UserService.cadastrar(
          data.usuario,
          UserType.Diarista,
          newUserLink
        );
        if (newUser) {
          setNewUser(newUser);
          await cadastrarEndereco(data, newUser);
        }
      } catch (error) {
        UserService.handleNewUserError(error, userForm);
      } finally {
        setLoad(false);
      }
    }
  }

  async function cadastrarEndereco(
    data: CadastroDiaristaFormDataInterface,
    newUser: UserInterface
  ) {
    ApiService.defaults.headers.common.Authorization =
      "Bearer " + newUser?.token?.access;

    LocalStorage.set("token", newUser.token?.access);
    LocalStorage.set("token_refresh", newUser.token?.refresh);

    ApiServiceHateoas(newUser.links, "cadastrar_endereco", async (request) => {
      const { data: newAddress } = await request<EnderecoInterface>({
        data: {
          ...data.endereco,
          cep: TextFormatService.getNumbersFromText(data.endereco?.cep),
        },
      });

      if (newAddress) {
        setNewAddress(newAddress);
        setStep(2);
      }
    });
  }

  async function onAddressSubmit(data: CadastroDiaristaFormDataInterface) {
    if (newUser) {
      ApiServiceHateoas(
        newUser.links,
        "relacionar_cidades",
        async (request) => {
          try {
            setLoad(true);
            await request({
              data: {
                cidades: data.enderecosAtendidos,
              },
            });
            setSucessoCadastro(true);
          } catch (error) {
          } finally {
            setLoad(false);
          }
        }
      );
    }
  }

  return {
    step,
    setStep,
    breadcrumbItems,
    userForm,
    addressListForm,
    onUserSubmit,
    load,
    onAddressSubmit,
    enderecsAtendidos,
    newAddress,
    sucessoCadastro,
  };
}
