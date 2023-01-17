import React, { PropsWithChildren } from "react";
// import {} from '@mui/material';
import {
  FormContainerStyled,
  PageFormContainerStyled,
} from "./UserForm.styled";

export interface UserFormProps {}

export const UserFormContainer = FormContainerStyled;
export const PageFormContainer = PageFormContainerStyled;

const UserForm: React.FC<PropsWithChildren<UserFormProps>> = () => {
  return <div>UserForm</div>;
};

export default UserForm;

export * from "./forms/AddressForm";
export * from "./forms/NewContactForm";
export * from "./forms/PaymentForm";
export * from "./forms/PictureForm";
export * from "./forms/UserDataForm";
