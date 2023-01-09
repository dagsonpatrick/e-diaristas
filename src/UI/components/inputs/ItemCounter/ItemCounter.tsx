import React, { PropsWithChildren } from "react";
// import {} from '@mui/material';
import { ItemCounterContainer, CircleButton } from "./ItemCounter.styled";

export interface ItemCounterProps {
  label: string;
  plural: string;
  counter: number;
  onInc: () => void;
  onDec: () => void;
}

const ItemCounter: React.FC<PropsWithChildren<ItemCounterProps>> = ({
  label,
  plural,
  counter = 0,
  onDec,
  onInc,
}) => {
  return (
    <ItemCounterContainer>
      <CircleButton onClick={onDec}>
        <i className="twf-minus" />
      </CircleButton>
      <span>
        {counter} {counter > 1 ? plural : label}
      </span>
      <CircleButton onClick={onInc}>
        <i className="twf-plus" />
      </CircleButton>
    </ItemCounterContainer>
  );
};

export default ItemCounter;
