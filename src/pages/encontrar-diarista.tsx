import React from "react";
import { GetStaticProps } from "next";
import VerificarProfissionais from "@partials/encontrar-diarista/_verificar-profissionais";

// import { Component } from '@styles/pages/encontrar-diarista.styled';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      title: "Encontrar Diarista",
    },
  };
};

const EncontrarDiarista: React.FC = () => {
  return <VerificarProfissionais />;
};

export default EncontrarDiarista;
