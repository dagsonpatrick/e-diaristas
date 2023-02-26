import { Button } from "@mui/material";
import useIsMobile from "data/hooks/useIsMobile";
import React, { PropsWithChildren } from "react";
// import {} from '@mui/material';
import {
  DialogContainer,
  DialogTitle,
  DialogContent,
  DialogActions,
  CloseButon,
  DialogSubtitle,
} from "./Dialog.styled";

export interface DialogProps {
  title?: string;
  subtitle?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  noConfirm?: boolean;
  noCancel?: boolean;
}

const Dialog: React.FC<PropsWithChildren<DialogProps>> = (props) => {
  const isMobile = useIsMobile();
  return (
    <DialogContainer
      open={props.isOpen}
      fullWidth
      fullScreen={isMobile}
      onClose={props.onClose}
    >
      {props.title && (
        <DialogTitle>
          {props.title}
          <CloseButon onClick={props.onCancel || props.onClose}>
            <i className="twf-times" />
          </CloseButon>
        </DialogTitle>
      )}
      <DialogContent>
        {props.subtitle && <DialogSubtitle>{props.subtitle}</DialogSubtitle>}
        {props.children}
      </DialogContent>
      <DialogActions>
        {!props.noCancel && (
          <Button
            size={"large"}
            variant={"outlined"}
            onClick={props.onCancel || props.onClose}
          >
            {props.cancelLabel ?? "Fechar"}
          </Button>
        )}
        {!props.noConfirm && (
          <Button
            size={"large"}
            variant={"contained"}
            color={"secondary"}
            onClick={props.onConfirm || props.onClose}
          >
            {props.confirmLabel ?? "Confirmar"}
          </Button>
        )}
      </DialogActions>
    </DialogContainer>
  );
};

export default Dialog;
