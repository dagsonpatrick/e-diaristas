import { DiariaInterface } from "data/@types/DiariaInterface";
import { UserInterface } from "data/@types/UserInterface";
import { DiariaContext } from "data/contexts/DiariaContext";
import { ApiServiceHateoas } from "data/services/ApiService";
import { useContext, useEffect, useState } from "react";

export default function useDetalhesDiaria(diariaId: string) {
  const {
      diariaState: { diarias },
    } = useContext(DiariaContext),
    [diaria, setDiaria] = useState<DiariaInterface>(),
    [cliente, setCliente] = useState<UserInterface>(),
    [diarista, setDiarista] = useState<UserInterface>();

  useEffect(() => {
    if (diarias.length) {
      getDiaira(diarias, diariaId);
    }
  }, [diarias, diariaId]);

  async function getDiaira(diarias: DiariaInterface[], diariaId: string) {
    const diariaSelecionada = diarias.find(
      (diaria) => diaria.id === Number(diariaId)
    );

    if (diariaSelecionada) {
      ApiServiceHateoas(diariaSelecionada.links, "self", async (request) => {
        const { data: diariaCompleta } = await request<DiariaInterface>();

        if (diariaCompleta) {
          setDiaria(diariaCompleta);
          diariaCompleta.diarista && setDiarista(diariaCompleta.diarista);
          diariaCompleta.cliente && setCliente(diariaCompleta.cliente);
        }
      });
    }
  }

  return { diaria, diarista, cliente };
}
