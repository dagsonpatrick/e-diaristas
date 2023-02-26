import { Box, CircularProgress, Container, Typography } from "@mui/material";
import useDetalhesDiaria from "data/hooks/pages/diarias/useDetalhesDiaria.page";
import { DateService } from "data/services/DateService";
import { DiariaService } from "data/services/DiariaService";
import { TextFormatService } from "data/services/TextFormatService";
import React, { PropsWithChildren } from "react";
import PageTitle from "UI/components/data-display/PageTitle/PageTitle";
import Status from "UI/components/data-display/Status/Status";
import UserInformation from "UI/components/data-display/UserInformation/UserInformation";

import {
  CardsContainer,
  JobDetails,
  JobTitle,
  UserTitle,
  UserCard,
} from "./_detalhe-diaria.styled";

const DetalheDiaria: React.FC<PropsWithChildren<{ id: string }>> = ({ id }) => {
  const { cliente, diaria, diarista } = useDetalhesDiaria(id);

  if (!diaria?.id) {
    return (
      <Container sx={{ textAlign: "center", my: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle title={`Detalhes da diária: #${id}`} />
      <CardsContainer>
        <JobDetails>
          <JobTitle>Detalhes da diária</JobTitle>
          <Box sx={{ mb: 2 }}>
            Status:
            <Status colors={DiariaService.getStatus(diaria.status!).color}>
              {DiariaService.getStatus(diaria.status!).label}
            </Status>
          </Box>
          <div>
            Data:{" "}
            <strong>
              {TextFormatService.reverseDate(diaria.data_atendimento as string)}
            </strong>
            <br />
            Horário:{" "}
            <strong>
              {DateService.getTimeFromDate(diaria.data_atendimento as string)}
            </strong>
            <br />
            Endereço: <strong>{TextFormatService.getAddress(diaria)}</strong>
          </div>
        </JobDetails>

        <UserCard>
          {diarista?.id ? (
            <>
              <UserTitle>Diarista</UserTitle>
              <UserInformation
                picture={diarista?.foto_usuario ?? ""}
                name={diarista?.nome_completo ?? ""}
                rating={diarista?.reputacao ?? 1}
                sx={{ bgcolor: "inherit", px: 0 }}
              />
              <Typography>
                Telefone:{" "}
                {TextFormatService.formatPhoneNumber(diarista?.telefone ?? "")}
              </Typography>
            </>
          ) : (
            <Typography>Diarista ainda não selecionado(a)</Typography>
          )}
        </UserCard>

        <UserCard>
          <UserTitle>Cliente</UserTitle>
          <UserInformation
            picture={cliente?.foto_usuario ?? ""}
            name={cliente?.nome_completo ?? ""}
            rating={cliente?.reputacao ?? 1}
            sx={{ bgcolor: "inherit", px: 0 }}
          />
          <Typography>
            Telefone:{" "}
            {TextFormatService.formatPhoneNumber(cliente?.telefone ?? "")}
          </Typography>
        </UserCard>
      </CardsContainer>
    </Container>
  );
};

export default DetalheDiaria;
