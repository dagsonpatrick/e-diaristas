import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  ButtonProps,
} from "@mui/material";
import Router from "next/router";
import { PropsWithChildren } from "react";

export interface LinkProps {
  href: string;
  mui?: MuiLinkProps | ButtonProps;
  next?: NextLinkProps;
  Component?: React.ElementType;
  onClick?: () => void;
}

const Link: React.FC<PropsWithChildren<LinkProps>> = ({
  children,
  href,
  next,
  mui,
  Component = MuiLink,
  ...props
}) => {
  const isNextEnv = Boolean(Router.router);

  return isNextEnv ? (
    <NextLink href={href} passHref {...next}>
      <Component {...mui} {...props}>
        {children}
      </Component>
    </NextLink>
  ) : (
    <Component href={href} {...mui} {...props}>
      {children}
    </Component>
  );
};

export default Link;
