import { Avatar, Divider, List, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";

export const GradientBackground = styled("section")`
  padding-bottom: ${({ theme }) => theme.spacing(20)};
  background: ${({ theme }) =>
    `linear-gradient(180deg, ${theme.palette.secondary.main} 0%, 
    ${theme.palette.primary.main} 100%)`};

  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const SectionTitle = styled("h2")`
  position: relative;
  font-weight: normal;
  font-size: ${({ theme }) => theme.typography.h6.fontSize};
  margin: 0;
  padding: ${({ theme }) => theme.spacing(7, 0, 4)};
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    width: 44px;
    height: 2px;
    background-color: currentColor;
    left: 50%;
    bottom: ${({ theme }) => theme.spacing(2)};
    transform: translateX(-50%);
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    padding: ${({ theme }) => theme.spacing(15, 0, 13)};

    &::after {
      bottom: ${({ theme }) => theme.spacing(10)};
    }
  }
`;

export const ListStyle = styled(List)`
  ${({ theme }) => theme.breakpoints.up("md")} {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing(7)};
  }
`;

export const AvatarStyled = styled(Avatar)`
  background-color: transparent;
  border: 2px solid currentColor;
  margin-right: ${({ theme }) => theme.spacing(2)};
  box-sizing: content-box;

  i {
    font-size: 25px;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: ${({ theme }) => theme.spacing(2)};
    margin-right: ${({ theme }) => theme.spacing(4)};
    i {
      font-size: 50px;
    }
  }
`;

export const ListItemTextStyled = styled(ListItemText)`
  .MuiListItemText-primary {
    font-weight: bold;
  }

  .MuiListItemText-secondary {
    color: currentColor;
  }
`;

export const ListDivider = styled(Divider)`
  &.MuiDivider-root {
    border-color: rgba(255, 255, 255, 0.25);
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    display: none;
  }
`;
