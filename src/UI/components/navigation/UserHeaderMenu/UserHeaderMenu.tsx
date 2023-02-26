import { UserInterface } from "data/@types/UserInterface";
import React, { PropsWithChildren, useRef } from "react";
import UserProfileAvatar from "UI/components/data-display/UserProfileAvatar/UserProfileAvatar";
// import {} from '@mui/material';
import { UserHeaderMenuContainer, UserMenu } from "./UserHeaderMenu.styled";
import Link from "UI/components/navigation/Link/Link";

export interface UserHeaderMenuProps {
  user: UserInterface;
  isMenuOpen: boolean;
  onClick: (event: React.MouseEvent) => void;
  onLogout?: () => void;
  onMenuClick?: (event: React.MouseEvent) => void;
  onMenuClose?: (event: React.MouseEvent) => void;
}

const UserHeaderMenu: React.FC<PropsWithChildren<UserHeaderMenuProps>> = (
  props
) => {
  const containerRef = useRef(null);
  return (
    <UserHeaderMenuContainer ref={containerRef}>
      <UserProfileAvatar user={props.user} onClick={props.onClick} />
      <UserMenu
        open={props.isMenuOpen}
        anchorEl={containerRef.current}
        onClose={props.onMenuClose}
        onClick={props.onMenuClick}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <li>
          <Link href="/alterar-dados" mui={{ color: "inherit" }}>
            Alterar Dados
          </Link>
        </li>
        <li>
          <Link href="" onClick={props.onLogout} mui={{ color: "inherit" }}>
            Sair
          </Link>
        </li>
      </UserMenu>
    </UserHeaderMenuContainer>
  );
};

export default UserHeaderMenu;
