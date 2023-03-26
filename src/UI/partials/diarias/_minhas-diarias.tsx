import { Button, Container, Typography } from "@mui/material";
import useMinhasDiarias from "data/hooks/pages/diarias/useMinhasDiarias.page";
import { DiariaService } from "data/services/DiariaService";
import { TextFormatService } from "data/services/TextFormatService";
import React, { PropsWithChildren } from "react";
import DataList from "UI/components/data-display/DataList/DataList";
import PageTitle from "UI/components/data-display/PageTitle/PageTitle";
import Status from "UI/components/data-display/Status/Status";
import Table, {
  TableCell,
  TablePagination,
  TableRow,
} from "UI/components/data-display/Table/Table";
import Link from "UI/components/navigation/Link/Link";
import {
  CancelDialog,
  ConfirmDialog,
  RatingDialog,
} from "./_minhas-diarias-dialogs";

// import { Component } from './_minhas-diarias.styled';

const MinhasDiarias: React.FC<PropsWithChildren> = () => {
  const {
    isMobile,
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    filteredData,
    podeVisualizar,
    podeCancelar,
    podeConfirmar,
    podeAvaliar,
    diariaConfirmar,
    setDariaConfirmar,
    confirmarDiaria,
    diariaAvaliar,
    setDiairaAvaliar,
    avaliarDiaria,
    diariaCancelar,
    setDiariaCancelar,
    cancelarDiaria,
  } = useMinhasDiarias();
  return (
    <Container sx={{ mb: 5, p: 0 }}>
      <PageTitle title="Minhas diárias" />
      {filteredData.length > 0 ? (
        isMobile ? (
          <>
            {filteredData.map((diaria) => {
              return (
                <DataList
                  key={diaria.id}
                  header={
                    <>
                      Data:
                      {TextFormatService.reverseDate(
                        diaria.data_atendimento as string
                      )}
                      <br />
                      {diaria.nome_servico}
                    </>
                  }
                  body={
                    <>
                      Status: {DiariaService.getStatus(diaria.status!).label}
                      <br />
                      Valor: {TextFormatService.currency(diaria.preco)}
                    </>
                  }
                  actions={
                    <>
                      {podeVisualizar(diaria) && (
                        <Button
                          component={Link}
                          href={`?id=${diaria.id}`}
                          color={"inherit"}
                          variant={"outlined"}
                        >
                          Detalhes
                        </Button>
                      )}
                      {podeCancelar(diaria) && (
                        <Button
                          color={"error"}
                          variant={"contained"}
                          onClick={() => setDiariaCancelar(diaria)}
                        >
                          Cancelado
                        </Button>
                      )}
                      {podeConfirmar(diaria) && (
                        <Button
                          color={"success"}
                          variant={"contained"}
                          onClick={() => setDariaConfirmar(diaria)}
                        >
                          Confirmar Presença
                        </Button>
                      )}
                      {podeAvaliar(diaria) && (
                        <Button
                          color={"success"}
                          variant={"contained"}
                          onClick={() => setDiairaAvaliar(diaria)}
                        >
                          Avaliar
                        </Button>
                      )}
                    </>
                  }
                />
              );
            })}
          </>
        ) : (
          <>
            <Table
              header={["Data", "Status", "Tipo de Serviço", "Valor", "", ""]}
              data={filteredData}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              rowElement={(item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <strong>
                      {TextFormatService.reverseDate(
                        item.data_atendimento as string
                      )}
                    </strong>
                  </TableCell>
                  <TableCell>
                    <Status
                      colors={DiariaService.getStatus(item.status!).color}
                    >
                      {DiariaService.getStatus(item.status!).label}
                    </Status>
                  </TableCell>
                  <TableCell>{item.nome_servico}</TableCell>
                  <TableCell>
                    {TextFormatService.currency(item.preco)}
                  </TableCell>
                  <TableCell>
                    {podeVisualizar(item) && (
                      <Link href={`?id=${item.id}`}>Detalhes</Link>
                    )}
                  </TableCell>
                  <TableCell>
                    {podeCancelar(item) && (
                      <Button
                        color={"error"}
                        onClick={() => setDiariaCancelar(item)}
                      >
                        Cancelar
                      </Button>
                    )}
                    {podeConfirmar(item) && (
                      <Button
                        color={"success"}
                        onClick={() => setDariaConfirmar(item)}
                      >
                        Confirmar Presença
                      </Button>
                    )}
                    {podeAvaliar(item) && (
                      <Button
                        color={"success"}
                        onClick={() => setDiairaAvaliar(item)}
                      >
                        Avaliar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              )}
            />
            <TablePagination
              count={totalPages}
              page={currentPage}
              onChange={(_evt, nextPage) => setCurrentPage(nextPage)}
            />
          </>
        )
      ) : (
        <Typography align="center">Nenhuma diária ainda</Typography>
      )}

      {diariaConfirmar && (
        <ConfirmDialog
          diaria={diariaConfirmar}
          onConfirm={confirmarDiaria}
          onCancel={() => setDariaConfirmar(undefined)}
        />
      )}

      {diariaAvaliar && (
        <RatingDialog
          diaria={diariaAvaliar}
          onConfirm={avaliarDiaria}
          onCancel={() => setDiairaAvaliar(undefined)}
        />
      )}

      {diariaCancelar && (
        <CancelDialog
          diaria={diariaCancelar}
          onConfirm={cancelarDiaria}
          onCancel={() => setDiariaCancelar(undefined)}
        />
      )}
    </Container>
  );
};

export default MinhasDiarias;
