import React from "react";
import { GetStaticProps } from "next";
import {
  Button,
  Container,
  Divider,
  Snackbar,
  Typography,
} from "@mui/material";
import PageTitle from "UI/components/data-display/PageTitle/PageTitle";
import useOportunidades from "data/hooks/pages/useOportunidades.page";
import DataList from "UI/components/data-display/DataList/DataList";
import { TextFormatService } from "data/services/TextFormatService";
import Table, {
  TableCell,
  TablePagination,
  TableRow,
} from "UI/components/data-display/Table/Table";
import Dialog from "UI/components/feedback/Dialog/Dialog";
import JobInformation from "UI/components/data-display/JobInformation/JobInformation";
import UserInformation from "UI/components/data-display/UserInformation/UserInformation";

// import { Component } from '@styles/pages/oportunidades.styled';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Oportunidades",
    },
  };
};

const Oportunidades: React.FC = () => {
  const {
    oportunidades,
    isMobile,
    totalComodos,
    podeCandidatar,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    oportunidadeSelecionada,
    setOportunidadeSelecionada,
    mensagemSnackbar,
    setMensagemSnackbar,
    seCandidatar,
  } = useOportunidades();

  return (
    <Container sx={{ mb: 5, p: 0 }}>
      <PageTitle title="Oportunidades de trabalho" />

      {oportunidades ? (
        isMobile ? (
          oportunidades.map((oportunidade) => {
            return (
              <DataList
                key={oportunidade.id}
                header={
                  <>
                    Data:{" "}
                    {TextFormatService.reverseDate(
                      oportunidade.data_atendimento as string
                    )}
                    <br />
                    {oportunidade.nome_servico}
                    <br />
                    {TextFormatService.currency(oportunidade.preco)}
                  </>
                }
                body={
                  <>
                    Cidade: {oportunidade.cidade}
                    <br />
                    Numero de cômodos {totalComodos(oportunidade)}
                  </>
                }
                actions={
                  <>
                    {podeCandidatar(oportunidade) && (
                      <Button
                        variant={"contained"}
                        color={"secondary"}
                        onClick={() => setOportunidadeSelecionada(oportunidade)}
                      >
                        Se candidatar
                      </Button>
                    )}
                  </>
                }
              />
            );
          })
        ) : (
          <>
            <Table
              header={[
                "Data",
                "Tipo de Serviço",
                "Número de Cômodos",
                "Cidade",
                "Valor",
                "",
              ]}
              data={oportunidades}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              rowElement={(oportunidade, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <strong>
                      {TextFormatService.reverseDate(
                        oportunidade.data_atendimento as string
                      )}
                    </strong>
                  </TableCell>
                  <TableCell>{oportunidade.nome_servico}</TableCell>
                  <TableCell>{totalComodos(oportunidade)} cômodos</TableCell>
                  <TableCell>
                    {oportunidade.cidade} - {oportunidade.estado}
                  </TableCell>
                  <TableCell>
                    {TextFormatService.currency(oportunidade.preco)}
                  </TableCell>
                  <TableCell>
                    {podeCandidatar(oportunidade) && (
                      <Button
                        onClick={() => setOportunidadeSelecionada(oportunidade)}
                      >
                        Se candidatar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            />
            <TablePagination
              count={totalPages}
              page={currentPage}
              onChange={(_event, nextPage) => setCurrentPage(nextPage)}
            />
          </>
        )
      ) : (
        <Typography align="center">Nenhuma oportunidade ainda</Typography>
      )}

      <Dialog
        isOpen={oportunidadeSelecionada != undefined}
        onClose={() => setOportunidadeSelecionada(undefined)}
        title={"Se candidatar à diária"}
        onConfirm={() => seCandidatar(oportunidadeSelecionada!)}
        subtitle={"Tem certeza que deseja se candidatar à diária abaixo?"}
      >
        <div>
          <JobInformation>
            <>
              <div>
                DATA:{" "}
                <strong>
                  {TextFormatService.dateTime(
                    oportunidadeSelecionada?.data_atendimento as string
                  )}
                </strong>
              </div>
              <div>
                Endereco:{" "}
                {TextFormatService.getAddress(oportunidadeSelecionada)}
              </div>
              <div>
                Valor:{" "}
                <strong>
                  {TextFormatService.currency(oportunidadeSelecionada?.preco)}
                </strong>
              </div>
            </>
          </JobInformation>
        </div>

        <UserInformation
          name={oportunidadeSelecionada?.cliente.nome_completo ?? ""}
          rating={oportunidadeSelecionada?.cliente.reputacao ?? 0}
          picture={oportunidadeSelecionada?.cliente.foto_usuario ?? ""}
        />
        <Divider />

        {oportunidadeSelecionada &&
          oportunidadeSelecionada!.avaliacoes_cliente.length > 0 && (
            <>
              <Typography
                sx={{ p: 3, fontWeight: "medium", bgcolor: "grey.50" }}
              >
                Últimas avaliações do cliente
              </Typography>

              {oportunidadeSelecionada!.avaliacoes_cliente.map(
                (item, index) => {
                  return (
                    <UserInformation
                      key={index}
                      name={item.nome_avaliador}
                      rating={item.nota}
                      picture={item.foto_avaliador}
                      isRating={true}
                    />
                  );
                }
              )}
            </>
          )}

        <Typography
          sx={{ py: 2 }}
          variant={"subtitle2"}
          color={"textSecundary"}
        >
          Ao se candidatar você ainda não é o(a) diarista escolhido(a) para
          realizar o trabalho. Vamos analisar suas qualificações e a distância
          para o local da diária. Caso você seja a pessoa selecionada, receberá
          um email avisando. Atente-se à sua caixa de entrada!
        </Typography>
      </Dialog>
      <Snackbar
        open={mensagemSnackbar.length > 0}
        message={mensagemSnackbar}
        autoHideDuration={4000}
        onClose={() => setMensagemSnackbar("")}
      />
    </Container>
  );
};

export default Oportunidades;
