import { DiariaInterface, DiariaStatus } from "data/@types/DiariaInterface";
import { DiariaContext } from "data/contexts/DiariaContext";
import useIsMobile from "data/hooks/useIsMobile";
import usePagination from "data/hooks/usePagination.hook";
import { ApiServiceHateoas, linksResolver } from "data/services/ApiService";
import { useContext, useMemo, useState } from "react";
import { mutate } from "swr";

type FilterType = "pendentes" | "cancelados" | "avaliados";

export default function useMinhasDiarias() {
  const isMobile = useIsMobile(),
    {
      diariaState: { diarias },
    } = useContext(DiariaContext),
    [filtro, setFiltro] = useState<FilterType>("pendentes"),
    filteredData = useMemo(() => {
      return filtrarDiaria(diarias, filtro);
    }, [diarias, filtro]),
    { currentPage, setCurrentPage, totalPages, itemsPerPage } = usePagination(
      filteredData,
      5
    ),
    [diariaConfirmar, setDariaConfirmar] = useState<DiariaInterface>(),
    [diariaAvaliar, setDiairaAvaliar] = useState<DiariaInterface>(),
    [diariaCancelar, setDiariaCancelar] = useState<DiariaInterface>();

  function filtrarDiaria(
    diarias: DiariaInterface[],
    filtro: FilterType
  ): DiariaInterface[] {
    return diarias.filter((diaria) => {
      const avaliadas = [DiariaStatus.AVALIADO].includes(diaria.status ?? 0),
        cancelado = [
          DiariaStatus.CANCELADO,
          DiariaStatus.SEM_PAGAMENTO,
        ].includes(diaria.status ?? 0),
        pendente = [
          DiariaStatus.PAGO,
          DiariaStatus.CONFIRMADO,
          DiariaStatus.CONCLUIDO,
        ].includes(diaria.status ?? 0);

      if (
        (avaliadas && filtro === "avaliados") ||
        (cancelado && filtro === "cancelados") ||
        (pendente && filtro === "pendentes")
      ) {
        return true;
      }
      return false;
    });
  }

  function alterarFiltro(filtro: FilterType) {
    setCurrentPage(1);
    setFiltro(filtro);
  }

  function podeVisualizar(diaria: DiariaInterface): boolean {
    return linksResolver(diaria.links, "self") != undefined;
  }

  function podeCancelar(diaria: DiariaInterface): boolean {
    return linksResolver(diaria.links, "cancelar_diaria") !== undefined;
  }

  function podeConfirmar(diaria: DiariaInterface): boolean {
    return linksResolver(diaria.links, "confirmar_diarista") !== undefined;
  }

  function podeAvaliar(diaria: DiariaInterface): boolean {
    return linksResolver(diaria.links, "avaliar_diaria") !== undefined;
  }

  async function confirmarDiaria(diaria: DiariaInterface) {
    ApiServiceHateoas(diaria.links, "confirmar_diarista", async (request) => {
      try {
        await request();
        setDariaConfirmar(undefined);
        atualizarDiarias();
      } catch (error) {}
    });
  }

  async function avaliarDiaria(
    diaria: DiariaInterface,
    avaliacao: { descricao: string; nota: number }
  ) {
    ApiServiceHateoas(diaria.links, "avaliar_diaria", async (request) => {
      try {
        await request({
          data: avaliacao,
        });
        setDiairaAvaliar(undefined);
        atualizarDiarias();
      } catch (error) {}
    });
  }

  async function cancelarDiaria(diaria: DiariaInterface, motivo: string) {
    ApiServiceHateoas(diaria.links, "cancelar_diaria", async (request) => {
      try {
        await request({
          data: {
            motivo_cancelamento: motivo,
          },
        });
        setDiariaCancelar(undefined);
        atualizarDiarias();
      } catch (error) {}
    });
  }

  function atualizarDiarias() {
    mutate("lista_diarias");
  }

  return {
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
    filtro,
    setFiltro,
    alterarFiltro,
  };
}
