import {
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  Wave,
  SectionContainer,
  SectionTitle,
  SectionSubTitle,
  AccondionStyled,
} from "./_frequent-question.styled";

const questionsList = [
  {
    question: "Dúvida 1",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, voluptates saepe et, maiores cupiditate ratione rerum voluptatum dolores alias ipsa sint tempore molestiae hic. Sit assumenda nisi in labore nihil.",
  },
  {
    question: "Dúvida 2",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, voluptates saepe et, maiores cupiditate ratione rerum voluptatum dolores alias ipsa sint tempore molestiae hic. Sit assumenda nisi in labore nihil.",
  },
  {
    question: "Dúvida 3",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, voluptates saepe et, maiores cupiditate ratione rerum voluptatum dolores alias ipsa sint tempore molestiae hic. Sit assumenda nisi in labore nihil.",
  },
  {
    question: "Dúvida 4",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, voluptates saepe et, maiores cupiditate ratione rerum voluptatum dolores alias ipsa sint tempore molestiae hic. Sit assumenda nisi in labore nihil.",
  },
];

const FrequestQuestion = () => {
  const [activeAccordion, setActiveAccordion] = useState(0);

  function isOpen(accordionIndex: number): boolean {
    return activeAccordion === accordionIndex;
  }

  function changeOpenAccordion(accordionIndex: number): void {
    if (isOpen(accordionIndex)) {
      setActiveAccordion(0);
    } else {
      setActiveAccordion(accordionIndex);
    }
  }

  function getIcon(accordionIndex: number): string {
    return isOpen(accordionIndex) ? "twf-minus" : "twf-plus";
  }

  return (
    <SectionContainer>
      <Wave src={"/img/home/waves.svg"} />
      <Container>
        <SectionTitle>Ainda está com dúvidas ?</SectionTitle>
        <SectionSubTitle>Veja abaixo as perguntas frequentes</SectionSubTitle>

        {questionsList.map((item, index) => (
          <AccondionStyled
            key={index}
            expanded={isOpen(index + 1)}
            onChange={() => changeOpenAccordion(index + 1)}
          >
            <AccordionSummary expandIcon={<i className={getIcon(index + 1)} />}>
              <Typography color={"primary"}>{item.question}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </AccondionStyled>
        ))}
      </Container>
    </SectionContainer>
  );
};

export default FrequestQuestion;
