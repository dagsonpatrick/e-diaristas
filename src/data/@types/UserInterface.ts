export interface UserShortInformationInterface {
  nome_completo: string;
  foto_usuario?: string;
  reputacao?: number;
  cidade: string;
}

export interface BuscaCepResponse {
  diaristas: UserShortInformationInterface[];
  quantidade_diaristas: number;
}
