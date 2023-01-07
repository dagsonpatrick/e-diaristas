import {
  BuscaCepResponse,
  UserShortInformationInterface,
} from "data/@types/UserInterface";
import { useMemo, useState } from "react";
import { ValidationService } from "data/services/ValidationService";
import { ApiService } from "data/services/ApiService";

export default function useVerificarProfissionais() {
  const [cep, setCep] = useState(""),
    [error, setError] = useState(""),
    [buscaFeita, setBuscaFeita] = useState(false),
    [carregando, setCarregando] = useState(false),
    [diaristas, setDiaristas] = useState<UserShortInformationInterface[]>([]),
    [diaristasRestantes, setDiaristaRestante] = useState(0),
    cepValido = useMemo(() => {
      return ValidationService.cep(cep);
    }, [cep]);

  async function buscarProfissionais(cep: string) {
    setBuscaFeita(false);
    setCarregando(true);
    setError("");

    try {
      const { data } = await ApiService.get<BuscaCepResponse>(
        `/api/diaristas/localidades?cep=${cep.replace(/\D/g, "")}`
      );

      setBuscaFeita(true);
      setDiaristas(data.diaristas);
      setDiaristaRestante(data.quantidade_diaristas);
    } catch (error) {
      setError("CEP não encontrado");
    } finally {
      setCarregando(false);
    }
  }

  return {
    cep,
    setCep,
    cepValido,
    error,
    diaristas,
    buscaFeita,
    carregando,
    diaristasRestantes,
    buscarProfissionais,
  };
}
