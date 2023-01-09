import React, { PropsWithChildren } from "react";
import { Typography } from "@mui/material";
import { passwordStrength } from "check-password-strength";
import {
  PasswordStrengthLabel,
  PasswordStrengthBar,
} from "./PasswordStrenght.styled";

export interface PasswordStrenghtProps {
  password: string;
}

const PasswordStrenght: React.FC<PropsWithChildren<PasswordStrenghtProps>> = ({
  password,
}) => {
  const strength = password ? passwordStrength(password).id : 0,
    strengthValue = ((strength + 1) / 4) * 100;
  return (
    <div style={{ gridArea: "password-strength" }}>
      <Typography variant="body2" component={"span"} color={"textSecondary"}>
        Nível da senha:&nbsp;
        <PasswordStrengthLabel value={strengthValue}>
          {strength === 0 && "FRACA"}
          {strength === 1 && "MÉDIA"}
          {strength === 2 && "FORTE"}
          {strength === 3 && "FORTE"}
        </PasswordStrengthLabel>
      </Typography>
      <PasswordStrengthBar variant="determinate" value={strengthValue} />
    </div>
  );
};

export default PasswordStrenght;
