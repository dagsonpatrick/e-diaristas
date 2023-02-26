import { FormValues } from "data/@types/forms/FormValue";
import { useFormContext } from "react-hook-form";
import TextField from "UI/components/inputs/TextField/TextField";
import { FinancialData } from "../UserForm.styled";

const FinalcialForm = () => {
  const { register } = useFormContext<FormValues>();
  return (
    <FinancialData>
      <TextField
        label={"Chave Pix"}
        defaultValue={""}
        {...register("usuario.chave_pix", { minLength: 5 })}
      />
    </FinancialData>
  );
};

export default FinalcialForm;
