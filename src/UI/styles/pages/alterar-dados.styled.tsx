import { styled } from "@mui/material/styles";
// import { } from '@mui/material';

export const FormContainer = styled("div")`
  max-width: 689px;
  margin: 0 auto;
`;

export const UserPicture = styled("label")`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width: ${({ theme }) => theme.spacing(18)};
  height: ${({ theme }) => theme.spacing(18)};
  border-radius: 100%;
  background-color: ${({ theme }) => theme.palette.grey[100]};

  &::before {
    content: "Foto";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    color: ${({ theme }) => theme.palette.text.secondary};
  }

  i {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 17px;
    background-color: ${({ theme }) => theme.palette.grey[200]};
    border-radius: 100%;
    z-index: 3;
    padding: ${({ theme }) => theme.spacing()};
  }

  input {
    display: none;
  }

  img {
    position: relative;
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }
`;
