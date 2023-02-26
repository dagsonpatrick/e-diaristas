import {
  Container,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Toolbar,
} from "@mui/material";
import Link from "UI/components/navigation/Link/Link";
import {
  HeaderAppBar,
  HeaderLogo,
  ButtonsContainer,
  HeaderDrawer,
} from "./Header.styled";
import RoundedButton from "UI/components/inputs/RoundedButton/RoundedButton";
import { useState } from "react";
import useIsMobile from "data/hooks/useIsMobile";
import { UserInterface, UserType } from "data/@types/UserInterface";
import UserHeaderMenu from "UI/components/navigation/UserHeaderMenu/UserHeaderMenu";
import { useEffect } from "react";
import UserProfileAvatar from "UI/components/data-display/UserProfileAvatar/UserProfileAvatar";

interface HeaderProps {
  user: UserInterface;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const isMobile = useIsMobile();
  return isMobile ? <HeaderMobile {...props} /> : <HeaderDesktop {...props} />;
};

export default Header;

const HeaderDesktop: React.FC<HeaderProps> = (props) => {
  const hasUser = props.user.nome_completo.length > 0,
    userType = props.user.tipo_usuario,
    [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!hasUser) {
      setIsMenuOpen(false);
    }
  }, [hasUser]);
  return (
    <HeaderAppBar>
      <Toolbar component={Container}>
        <Link href="/">
          <HeaderLogo src="/img/logos/logo.svg" alt="e-diarista" />
        </Link>

        <ButtonsContainer>
          {hasUser && (
            <>
              {userType === UserType.Diarista ? (
                <Link href="/oportunidades" Component={RoundedButton}>
                  Oportunidades
                </Link>
              ) : (
                <Link href="/encontrar-diarista" Component={RoundedButton}>
                  Encontrar Diarista
                </Link>
              )}
              <Link href="/diarias" Component={RoundedButton}>
                Diárias
              </Link>
              {userType === UserType.Diarista && (
                <Link href="/pagamentos" Component={RoundedButton}>
                  Pagamentos
                </Link>
              )}
            </>
          )}
        </ButtonsContainer>
        <div>&nbsp;</div>

        {hasUser ? (
          <UserHeaderMenu
            user={props.user}
            isMenuOpen={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
            onMenuClick={() => setIsMenuOpen(false)}
            onMenuClose={() => setIsMenuOpen(false)}
            onLogout={props.onLogout}
          />
        ) : (
          <ButtonsContainer>
            <Link
              Component={RoundedButton}
              mui={{ variant: "contained", color: "primary" }}
              href="/cadastro/diarista"
            >
              Seja um(a) diarista
            </Link>
            <Link href="/login" Component={RoundedButton}>
              Login
            </Link>
          </ButtonsContainer>
        )}
      </Toolbar>
    </HeaderAppBar>
  );
};

const HeaderMobile: React.FC<HeaderProps> = (props) => {
  const [isDraweroPen, setDrawerOpen] = useState(false),
    hasUser = props.user.nome_completo.length > 0,
    userType = props.user.tipo_usuario;

  return (
    <HeaderAppBar>
      <Toolbar component={Container}>
        <IconButton
          edge={"start"}
          color={"inherit"}
          onClick={() => setDrawerOpen(true)}
        >
          <i className="twf-bars" />
        </IconButton>
        <Link href="/">
          <HeaderLogo src="/img/logos/logo.svg" alt="e-diarista" />
        </Link>
        <HeaderDrawer
          open={isDraweroPen}
          onClose={() => setDrawerOpen(false)}
          onClick={() => setDrawerOpen(false)}
        >
          {hasUser ? (
            <>
              <UserProfileAvatar user={props.user} />
              <MenuList>
                {userType === UserType.Diarista ? (
                  <Link href="/oportunidades" Component={MenuItem}>
                    Oportunidades
                  </Link>
                ) : (
                  <Link href="/encontrar-diarista" Component={MenuItem}>
                    Encontrar Diarista
                  </Link>
                )}

                <Link href="/diarias" Component={MenuItem}>
                  Diária
                </Link>
                {userType === UserType.Diarista && (
                  <Link href="/pagamentos" Component={MenuItem}>
                    Pagamentos
                  </Link>
                )}
                <Divider />
                <Link href="/alterar-dados" Component={MenuItem}>
                  Alterar Dados
                </Link>
                <Link href="" Component={MenuItem} onClick={props.onLogout}>
                  Sair
                </Link>
              </MenuList>
            </>
          ) : (
            <MenuList>
              <Link href="/login" Component={MenuItem}>
                Login
              </Link>
              <Divider />
              <Link href="/cadastro/diarista" Component={MenuItem}>
                Seja um(a) diarista
              </Link>
            </MenuList>
          )}
        </HeaderDrawer>
      </Toolbar>
    </HeaderAppBar>
  );
};
