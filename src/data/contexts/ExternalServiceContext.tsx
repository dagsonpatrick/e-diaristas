import {
  ExternalServiceReducerInterface,
  initialState,
  useExternalServicesReducer,
} from "data/reduces/ExternalServiceReducer";
import { createContext } from "react";
import React, { PropsWithChildren } from "react";

const initialValue: ExternalServiceReducerInterface = {
  externalServicesDispatch: () => {},
  externalServicesState: initialState,
};

export const ExternalServiceContext = createContext(initialValue);

export const ExternalServiceProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const provider = useExternalServicesReducer();

  return (
    <ExternalServiceContext.Provider value={provider}>
      {children}
    </ExternalServiceContext.Provider>
  );
};
