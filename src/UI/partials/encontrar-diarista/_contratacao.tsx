import { Box, Button, Paper, Typography } from "@mui/material";
import { spawn } from "child_process";
import useContratacao from "data/hooks/pages/useContratacao.page";
import useIsMobile from "data/hooks/useIsMobile";
import React, { PropsWithChildren } from "react";
import { FormProvider } from "react-hook-form";
import PageTitle from "UI/components/data-display/PageTitle/PageTitle";
import SideInformation from "UI/components/data-display/SideInformation/SideInformation";
import SafeEnvironment from "UI/components/feedback/SafeEnvironment/SafeEnvironment";
import {
  UserFormContainer,
  PageFormContainer,
} from "UI/components/inputs/UserForm/UserForm";
import BreadCrumb from "UI/components/navigation/BreadCrumb/BreadCrumb";
import Link from "UI/components/navigation/Link/Link";
import CadastroCliente, { LoginCliente } from "./_cadastro-cliente";
import DetalheServico from "./_detalhe-servico";
import InformacoesPagamento from "./_informacoes-pagamento";

// import { Component } from './_contratacao.styled';

const Contratacao: React.FC<PropsWithChildren> = () => {
  const {
    step,
    breadcrumbItems,
    serviceForm,
    onServiceFormSubmit,
    servicos,
    hasLogin,
    setHasLogin,
    cleintForm,
    onClientFormSubmit,
    setStep,
    loginForm,
    onLoginFormSubmit,
    loginError,
    paymentForm,
    onPaymentFormSubmit,
  } = useContratacao();
  const isMobile = useIsMobile();
  return (
    <div>
      {!isMobile && <SafeEnvironment />}
      <BreadCrumb
        selected={breadcrumbItems[step - 1]}
        items={breadcrumbItems}
      />
      {step === 1 && <PageTitle title="Nos conte um pouco sobre o serviço!" />}

      {step === 2 && (
        <PageTitle
          title="Precisamos conhecer um pouco sobre você!"
          subtitle={
            !hasLogin ? (
              <span>
                Caso já tenha cadastro,{" "}
                <Button onClick={() => setHasLogin(true)}>clique aqui</Button>
              </span>
            ) : (
              <span>
                Caso não tenha cadastro,{" "}
                <Button onClick={() => setHasLogin(false)}>clique aqui</Button>
              </span>
            )
          }
        />
      )}

      {step === 3 && (
        <PageTitle
          title="Informe os dados do cartão para pagamento"
          subtitle={
            "Será feita uma reserva, mas o valor só será descontado quando você confirmar a presença do/da diarista"
          }
        />
      )}

      <UserFormContainer>
        <PageFormContainer fullWidth={step === 4}>
          <Paper>
            <FormProvider {...serviceForm}>
              <form
                onSubmit={serviceForm.handleSubmit(onServiceFormSubmit)}
                hidden={step !== 1}
              >
                <DetalheServico servicos={servicos} />
              </form>
            </FormProvider>

            <FormProvider {...cleintForm}>
              <form
                onSubmit={cleintForm.handleSubmit(onClientFormSubmit)}
                hidden={step !== 2 || hasLogin}
              >
                <CadastroCliente onBack={() => setStep(1)} />
              </form>
            </FormProvider>

            {step === 2 && hasLogin && (
              <FormProvider {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginFormSubmit)}>
                  {loginError && (
                    <Typography color={"error"} align={"center"} sx={{ mb: 2 }}>
                      {loginError}
                    </Typography>
                  )}

                  <LoginCliente onBack={() => setStep(1)} />
                </form>
              </FormProvider>
            )}

            {step === 3 && (
              <FormProvider {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(onPaymentFormSubmit)}>
                  <InformacoesPagamento />
                </form>
              </FormProvider>
            )}

            {step === 4 && (
              <Box sx={{ textAlign: "center" }}>
                <Typography sx={{ fontSize: "82px" }} color={"secondary"}>
                  <i className="twf-check-circle" />
                </Typography>

                <Typography
                  sx={{ fontSize: "22px", pb: 3 }}
                  color={"secondary"}
                >
                  Pagamento realizado com sucesso!
                </Typography>

                <Typography
                  sx={{ mb: 3, maxWidth: "410px", mx: "auto" }}
                  color={"textSecondary"}
                >
                  Sua diária foi paga com sucesso! Já estamos procurando o(a)
                  melhor profissional para atender sua residência. Caso
                  nenhum(a) profissional seja encontrado(a), devolvemos seu
                  dinheiro automaticamente 24 horas antes da data agendada. Você
                  também pode cancelar a sua diária sem nenhuma multa até 24
                  horas antes da hora do agendamento.
                </Typography>

                <Link
                  href="/diarias"
                  Component={Button}
                  mui={{ color: "secondary", variant: "contained" }}
                >
                  Ir para minhas diárias
                </Link>
              </Box>
            )}
          </Paper>
          {!isMobile && step !== 4 && (
            <SideInformation
              title="Detalhes"
              items={[
                {
                  title: "Tipo",
                  descricao: [""],
                  icon: "twf-check-circle",
                },
                {
                  title: "Tamanho",
                  descricao: [""],
                  icon: "twf-check-circle",
                },
                {
                  title: "Data",
                  descricao: [""],
                  icon: "twf-check-circle",
                },
              ]}
              footer={{
                text: "R$80,00",
                icon: "twf-credit-card",
              }}
            />
          )}
        </PageFormContainer>
      </UserFormContainer>
    </div>
  );
};

export default Contratacao;
