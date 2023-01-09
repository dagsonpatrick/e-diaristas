import {
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import { AccordionStyled } from "./DataList.styled";

export interface DataListProps {
  header?: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
}

const DataList: React.FC<PropsWithChildren<DataListProps>> = ({
  header,
  body,
  actions,
}) => {
  return (
    <AccordionStyled>
      <AccordionSummary expandIcon={<i className="twf-caret-down" />}>
        {header}
      </AccordionSummary>
      <AccordionDetails>{body}</AccordionDetails>
      {actions && <AccordionActions>{actions}</AccordionActions>}
    </AccordionStyled>
  );
};

export default DataList;
