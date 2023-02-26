import { ExternalServiceProvider } from "./ExternalServiceContext";
import React, { PropsWithChildren } from "react";
import { UserProvider } from "./UserContext";

export const MainProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ExternalServiceProvider>
        <UserProvider>{children}</UserProvider>
      </ExternalServiceProvider>
    </>
  );
};
