import React from "react";
import { GetStaticProps } from "next";
import VerificarProfissionais from "@partials/encontrar-diarista/_verificar-profissionais";
import Contratacao from "@partials/encontrar-diarista/_contratacao";

// import { Component } from '@styles/pages/encontrar-diarista.styled';

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: "Encontrar Diarista",
        },
    };
};

const EncontrarDiarista: React.FC = () => {
    // return <VerificarProfissionais />;
    return <Contratacao />;
};

export default EncontrarDiarista;

