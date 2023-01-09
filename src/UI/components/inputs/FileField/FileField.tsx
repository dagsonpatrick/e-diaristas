import React, { ChangeEvent, PropsWithChildren, useState } from "react";
import { TextFieldProps } from "@mui/material";
import { FileContainer, UploadIcon } from "./FileField.styled";
import TextField from "UI/components/inputs/TextField/TextField";

export interface FileFieldProps extends Omit<TextFieldProps, "onChange"> {
  onChange: (files: FileList) => void;
}

const FileField: React.FC<PropsWithChildren<FileFieldProps>> = ({
  onChange,
  ...props
}) => {
  const [filePth, setFilePath] = useState("");

  function handleFileChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement,
      files = target.files;

    if (files !== null && files.length) {
      setFilePath(files[0]?.name ?? "");
      onChange(files);
    }
  }

  return (
    <FileContainer>
      <TextField
        label={"Selecione o arquivo"}
        value={filePth}
        InputProps={{ endAdornment: <UploadIcon className="twf-upload" /> }}
        {...props}
        fullWidth
      />
      <TextField
        type={"file"}
        {...props}
        fullWidth
        onChange={handleFileChange}
      />
    </FileContainer>
  );
};

export default FileField;
