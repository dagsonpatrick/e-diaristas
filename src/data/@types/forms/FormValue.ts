export type FormValues = {
  usuario: {
    email: string;
    password: string;
    password_confirmation: string;
    nome_completo: string;
    nascimento: string;
    cpf: string;
    telefone: string;
  };

  pagamento: {
    numero_cartao: string;
    nome_cartao: string;
    validade: string;
    codigo: string;
  };

  pagamento_recusado?: string;

  endereco: {
    cep: string;
    bairro: string;
    estado: string;
    cidade: string;
    logradouro: string;
    numero: string;
    complemento: string;
    codigo_ibge: number;
  };

  faxina: {
    data_atendimento: string;
    hora_inicio: string;
    hora_termino: string;
    observacoes: string;
    servico: number;
  };

  login: {
    email: string;
    password: string;
  };
};
