import { useContext, useReducer } from "react";
import { DiariaInterface } from "data/@types/DiariaInterface";
import produce from "immer";
import { UserContext } from "data/contexts/UserContext";
import useApiHateoas from "data/hooks/useApi.hook";
import { useEffect } from "react";
export const initialState = {
  diarias: [] as DiariaInterface[],
  isFetching: true,
};

type InitialStateType = typeof initialState;

type DiariaAction = "SET_DIARIA" | "SET_FETCHING";

export type DiariaActionType = {
  type: DiariaAction;
  payload?: unknown;
};

const reducer = (
  state: InitialStateType,
  action: DiariaActionType
): InitialStateType => {
  const nextState = produce(state, (draftState) => {
    switch (action.type) {
      case "SET_DIARIA":
        draftState.diarias = action.payload as DiariaInterface[];
        draftState.isFetching = false;
        break;
      case "SET_FETCHING":
        draftState.isFetching = action.payload as boolean;
        break;
    }
  });

  return nextState;
};

export interface DiariaReducerInterface {
  diariaState: InitialStateType;
  diariaDispatch: React.Dispatch<DiariaActionType>;
}

export function useDiariaReducer(): DiariaReducerInterface {
  const [state, dispatch] = useReducer(reducer, initialState),
    { userState } = useContext(UserContext),
    diarias = useApiHateoas<DiariaInterface[]>(
      userState.user.links,
      "lista_diarias"
    ).data;

  useEffect(() => {
    if (diarias) {
      dispatch({ type: "SET_DIARIA", payload: diarias });
    }
  }, [diarias]);

  return {
    diariaState: state,
    diariaDispatch: dispatch,
  };
}
