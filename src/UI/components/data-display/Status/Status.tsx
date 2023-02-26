import { TextColor } from "data/@types/DiariaInterface";
import React, { PropsWithChildren } from "react";
// import {} from '@mui/material';
import { StatusStyled } from "./Status.styled";

export interface StatusProps {
  colors?: TextColor;
}

const Status: React.FC<PropsWithChildren<StatusProps>> = ({
  colors = "success",
  ...props
}) => {
  return <StatusStyled sx={{ bgcolor: `${colors}.main` }} {...props} />;
};

export default Status;
