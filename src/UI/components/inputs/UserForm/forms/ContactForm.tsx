import { ContactData } from "../UserForm.styled";
import TextField from "UI/components/inputs/TextField/TextField";
import { useFormContext } from "react-hook-form";
import { FormValues } from "data/@types/forms/FormValue";
import PasswordStrenght from "UI/components/feedback/PasswordStrenght/PasswordStrenght";
import { useContext } from "react";
import { UserContext } from "data/contexts/UserContext";

const ContactForm = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<FormValues>();
  const newPassword = watch("usuario.new_password"),
    {
      userState: { user },
    } = useContext(UserContext);
  return (
    <ContactData>
      <TextField
        type={"email"}
        label={"E-email"}
        defaultValue={user.email}
        style={{ gridArea: "email" }}
        {...register("usuario.email")}
        error={errors?.usuario?.email != undefined}
        helperText={errors?.usuario?.email?.message}
      />
      <TextField
        type={"password"}
        label={"Senha antiga"}
        style={{ gridArea: "senha-antiga" }}
        {...register("usuario.password")}
        error={errors?.usuario?.password != undefined}
        helperText={errors?.usuario?.password?.message}
        required={false}
      />
      <TextField
        type={"password"}
        label={"Nova senha"}
        style={{ gridArea: "nova-senha" }}
        {...register("usuario.new_password")}
        error={errors?.usuario?.new_password != undefined}
        helperText={errors?.usuario?.new_password?.message}
        required={false}
      />
      <TextField
        type={"password"}
        label={"Confirmação da Senha"}
        style={{ gridArea: "confirmar-senha" }}
        {...register("usuario.password_confirmation")}
        error={errors?.usuario?.password_confirmation != undefined}
        helperText={errors?.usuario?.password_confirmation?.message}
        required={false}
      />
      <PasswordStrenght password={newPassword} />
    </ContactData>
  );
};

export default ContactForm;
