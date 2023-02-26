import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UserProfileAvatarProps } from "./UserProfileAvatar";
// import {  } from '@mui/material';
// import { UserProfileAvatarProps } from './UserProfileAvatar';

export const UserAvatar = styled(Avatar)`
  border: solid 2px currentColor;
`;

export const AvatarIcon = styled("i")<UserProfileAvatarProps>`
  font-size: ${({ theme }) => theme.spacing(1)};
  vertical-align: middle;
  display: ${({ user }) => (user.nome_completo ? "initial" : "none")};
`;
