import "@styles/globals.css";
import type { AppProps } from "next/app";
import { CircularProgress, Container, ThemeProvider } from "@mui/material";
import theme from "UI/themes/theme";
import React, { useContext } from "react";
import Header from "UI/components/surfaces/Header/Header";
import Footer from "UI/components/surfaces/Footer/Footer";
import { AppContainer } from "@styles/pages/AppContainer.styled";
import Head from "next/head";
import { MainProvider } from "data/contexts/MainContext";
import useRouterGuard, { privateRoutes } from "data/hooks/useRouterGuard.hook";
import { UserContext } from "data/contexts/UserContext";
import { LoginService } from "data/services/LoginService";

function App({ Component, pageProps }: AppProps) {
  const { userState } = useContext(UserContext);
  const router = useRouterGuard(userState.user, userState.isLogging);

  function canShow(): boolean {
    if (privateRoutes.includes(router.pathname)) {
      if (userState.isLogging) {
        return false;
      }
      return userState.user.nome_completo.length > 0;
    }
    return true;
  }

  async function onLogout() {
    await LoginService.logout();
    window.location.reload();
  }

  return (
    <>
      <Head>
        <title>e-diarista {pageProps.title && ` - ${pageProps.title}`}</title>
      </Head>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Header user={userState.user} onLogout={onLogout} />
          <main>
            {canShow() ? (
              <Component {...pageProps} />
            ) : (
              <Container sx={{ textAlign: "center", my: 10 }}>
                <CircularProgress />
              </Container>
            )}
          </main>
          <Footer />
        </AppContainer>
      </ThemeProvider>
    </>
  );
}

const AppProviderContainer: React.FC<AppProps> = (props) => {
  return (
    <MainProvider>
      <App {...props} />
    </MainProvider>
  );
};

export default AppProviderContainer;
