import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { PropsWithChildren } from "react";
import Link, { LinkProps } from "UI/components/navigation/Link/Link";
import RoundedButton from "UI/components/inputs/RoundedButton/RoundedButton";

export const SectionContainer = styled("section")`
  position: relative;
  min-height: 250px;
  background-image: url("/img/home/living-room.svg");
  background-repeat: no-repeat;
  background-position: right center;
  background-size: cover;

  ${({ theme }) => theme.breakpoints.down("md")} {
    display: flex;
    text-align: center;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    background-position: center;
  }
`;

export const ContaienerStyled = styled(Container)`
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "title"
    "subtitle"
    "button";
  align-content: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    grid-template-columns: 450px minmax(200px, 450px);
    grid-template-rows: 125px 55px 60px;
    grid-template-areas:
      "title picture"
      "subtitle picture"
      "button picture";
    gap: ${({ theme }) => theme.spacing(4)};
    align-items: center;
    justify-content: space-between;
    justify-items: center;
    min-height: 450px;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    max-width: 350px;
  }
`;

export const SectionTitle = styled("h1")`
  grid-area: title;
  margin: 0;
  position: relative;

  .twf-search {
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${({ theme }) => theme.palette.grey[200]};
    border-radius: 50px;
    padding: ${({ theme }) => theme.spacing(2)};
    transform: translate(20%, -20%);
  }

  em {
    font-style: inherit;
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    border: 4px solid ${({ theme }) => theme.palette.grey[200]};
    border-radius: 65px;
    padding: ${({ theme }) => theme.spacing(4, 8)};
    line-height: 30px;

    em {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: ${({ theme }) => theme.typography.body1.fontSize};
    font-weight: normal;
    .twf-search {
      display: none;
    }
  }
`;

export const SectionSubtitle = styled("p")`
  grid-area: subtitle;

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin: ${({ theme }) => theme.spacing(0, 0, 5)};
  }

  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 350px;
  }
`;

export const SectionButton = styled((props: PropsWithChildren<LinkProps>) => (
  <Link Component={RoundedButton} {...props} />
))`
  grid-area: button;
  ${({ theme }) => theme.breakpoints.up("md")} {
    width: 405px;
    height: 100%;
  }
`;

export const SectionPictureContainer = styled("div")`
  grid-area: picture;
  position: relative;

  img {
    position: relative;
    top: 35px;
    width: 100%;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 100%;
  }

  &::before {
    top: 20%;
    right: -5%;
    width: 130px;
    height: 130px;
    background-color: ${({ theme }) => theme.palette.primary.main};
    z-index: 2;
  }

  &::after {
    bottom: 0;
    right: 0;
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.palette.grey[200]};
  }
`;

export const BottomButton = styled("span")`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 11px 12px;
  border-radius: 50px;
  color: ${({ theme }) => theme.palette.common.white};
  border: 5px solid currentColor;

  i {
    position: relative;
    left: -2px;
  }
`;
