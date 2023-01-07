import React, { PropsWithChildren } from "react";
import InputMask from "react-input-mask";
import TextField from "../TextField/TextField";
import { OutlinedTextFieldProps } from "@mui/material";
// import {} from './TextFieldMask.styled'

export interface TextFieldMaskProps
  extends Omit<OutlinedTextFieldProps, "variant"> {
  mask: string;
}

const TextFieldMask: React.FC<PropsWithChildren<TextFieldMaskProps>> = ({
  mask,
  value,
  onChange,
  onBlur,
  ...props
}) => {
  return (
    <InputMask mask={mask} value={value} onChange={onChange} onBlur={onBlur}>
      {() => <TextField {...props} variant={"outlined"} />}
    </InputMask>
  );
};

export default TextFieldMask;
