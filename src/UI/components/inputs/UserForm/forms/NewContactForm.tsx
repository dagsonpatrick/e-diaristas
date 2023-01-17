import { NewContactData } from "../UserForm.styled";
import TextField from "UI/components/inputs/TextField/TextField";
import { useFormContext } from "react-hook-form";
import { FormValues } from "data/@types/forms/FormValue";
import PasswordStrenght from "UI/components/feedback/PasswordStrenght/PasswordStrenght";

const NewContactForm = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormValues>();
  const newPassword = watch("usuario.password");
  return (
    <NewContactData>
      <TextField
        type={"email"}
        label={"E-email"}
        style={{ gridArea: "email" }}
        {...register("usuario.email")}
        error={errors?.usuario?.email != undefined}
        helperText={errors?.usuario?.email?.message}
      />
      <TextField
        type={"password"}
        label={"password"}
        style={{ gridArea: "senha" }}
        {...register("usuario.password")}
        error={errors?.usuario?.password != undefined}
        helperText={errors?.usuario?.password?.message}
      />
      <TextField
        type={"password"}
        label={"Confirmação da Senha"}
        style={{ gridArea: "confirmar-senha" }}
        {...register("usuario.password_confirmation")}
        error={errors?.usuario?.password_confirmation != undefined}
        helperText={errors?.usuario?.password_confirmation?.message}
      />
      <PasswordStrenght password={newPassword} />
    </NewContactData>
  );
};

export default NewContactForm;
