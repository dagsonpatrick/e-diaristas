import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import SafeEnvironment from "UI/components/feedback/SafeEnvironment/SafeEnvironment";
import BreadCrumb from "UI/components/navigation/BreadCrumb/BreadCrumb";
import PageTitle from "UI/components/data-display/PageTitle/PageTitle";
import Link from "UI/components/navigation/Link/Link";
import useCadastroDiarista from "data/hooks/pages/cadastro/useCadastroDiarista.page";
import { BrawserService } from "data/services/BrawserService";
import {
  AddressForm,
  PageFormContainer,
  PictureForm,
  UserDataForm,
  UserFormContainer,
} from "UI/components/inputs/UserForm/UserForm";
import SideInformation from "UI/components/data-display/SideInformation/SideInformation";
import useIsMobile from "data/hooks/useIsMobile";
import { FormProvider } from "react-hook-form";
import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { FinancialData } from "UI/components/inputs/UserForm/UserForm.styled";
import FinalcialForm from "UI/components/inputs/UserForm/forms/FiancialForm";
import NewContactForm from "UI/components/inputs/UserForm/forms/NewContactForm";
import { CitiesForm } from "UI/components/inputs/UserForm/forms/CitiesForm";
import Dialog from "UI/components/feedback/Dialog/Dialog";

// import { Component } from '@styles/pages/cadastro/diarista.styled';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Diarista",
    },
  };
};

const Diarista: React.FC = () => {
  const {
      breadcrumbItems,
      step,
      setStep,
      userForm,
      addressListForm,
      onUserSubmit,
      load,
      onAddressSubmit,
      enderecsAtendidos,
      newAddress,
      sucessoCadastro,
    } = useCadastroDiarista(),
    isMobile = useIsMobile();

  useEffect(() => {
    BrawserService.scrollToTop();
  }, [step]);

  return (
    <div>
      <SafeEnvironment />
      <BreadCrumb
        items={breadcrumbItems}
        selected={breadcrumbItems[step - 1]}
      />
      {step === 1 && (
        <PageTitle
          title="Precisamos conhecer um pouco sobre você!"
          subtitle={
            <span>
              Caso já tenha cadastro <Link href="/login">clique aqui</Link>
            </span>
          }
        />
      )}

      {step === 2 && (
        <PageTitle
          title="Quais cidades você atenderá?"
          subtitle={
            <span>
              Você pode escolher se aceita ou não um serviço. Então, não se
              preocupe se mora em uma grande cidade
            </span>
          }
        />
      )}

      <UserFormContainer>
        <PageFormContainer>
          {step === 1 && (
            <FormProvider {...userForm}>
              <Paper
                sx={{ p: 4 }}
                component={"form"}
                onSubmit={userForm.handleSubmit(onUserSubmit)}
              >
                <Typography sx={{ fontWeight: "bold", pb: 2 }}>
                  Dados pessoais
                </Typography>
                <UserDataForm cadastro={true} />
                <Divider sx={{ mb: 5 }} />

                <Typography sx={{ fontWeight: "bold", pb: 2 }}>
                  Financeiro
                </Typography>
                <FinalcialForm />
                <Divider sx={{ mb: 5 }} />

                <Typography sx={{ fontWeight: "bold" }}>
                  Hora da self! Envie uma self segurando o documento
                </Typography>
                <Typography sx={{ pb: 2 }}>
                  Para sua segurança, todos os profissionais e clientes precisam
                  enviar
                </Typography>
                <PictureForm />
                <Typography sx={{ pt: 1, pb: 5 }} variant={"body2"}>
                  Essa foto não será vista por ninguém
                </Typography>
                <Divider sx={{ mb: 5 }} />

                <Typography sx={{ fontWeight: "bold", pb: 2 }}>
                  Endereço
                </Typography>
                <AddressForm />
                <Divider sx={{ mb: 5 }} />

                <Typography sx={{ fontWeight: "bold", pb: 2 }}>
                  Dados de acesso
                </Typography>
                <NewContactForm />
                <Container sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color={"secondary"}
                    type={"submit"}
                    disabled={load}
                  >
                    Cadastrar e escolher cidades
                  </Button>
                </Container>
              </Paper>
            </FormProvider>
          )}

          {step === 2 && (
            <FormProvider {...addressListForm}>
              <Paper
                component={"form"}
                sx={{ p: 4 }}
                onSubmit={addressListForm.handleSubmit(onAddressSubmit)}
              >
                <Typography sx={{ fontWeight: "bold", pb: 2 }}>
                  Selecione a cidade
                </Typography>
                {newAddress && <CitiesForm estado={newAddress.estado} />}
                <Container sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type={"submit"}
                    disabled={load || enderecsAtendidos?.length === 0}
                  >
                    Finalizar o cadastro
                  </Button>
                </Container>
              </Paper>
            </FormProvider>
          )}

          {!isMobile && (
            <SideInformation
              title="Como funciona?"
              items={[
                {
                  title: "1 - Cadastro",
                  descricao: [
                    "Você faz o cadastro e escolhe as cidades atendidas",
                  ],
                },
                {
                  title: "2 - Receba Propostas",
                  descricao: [
                    "Você receberá avisos por E-mail sobre novos serviços nas cidades atendidas",
                  ],
                },
                {
                  title: "3 - Diária Agendada",
                  descricao: [
                    "Se o seu perfil for escolhido pelo cliente, você receberá a confirmação do agendamento",
                  ],
                },
              ]}
            />
          )}
        </PageFormContainer>
      </UserFormContainer>
      <Dialog
        title="Cadastro realizado com sucesso"
        noCancel
        confirmLabel="Ver oportunidades"
        isOpen={sucessoCadastro}
        onConfirm={() => window.location.reload()}
        onClose={() => {}}
      >
        Agora você pode visualizar as oportunidades disponíveis na sua região.
      </Dialog>
    </div>
  );
};

export default Diarista;
