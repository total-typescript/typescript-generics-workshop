import { CSSProperties } from "react";

const makeUseStyled = <TTheme = {}>() => {
  const useStyled = (func: (theme: TTheme) => CSSProperties) => {
    return {} as CSSProperties;
  };

  return useStyled;
};

interface MyTheme {
  color: {
    primary: string;
  };
  fontSize: {
    small: string;
  };
}

export const useStyled = makeUseStyled<MyTheme>();

const buttonStyle = useStyled((theme) => ({
  color: theme.color.primary,
  fontSize: theme.fontSize.small,
}));

const divStyle = useStyled((theme) => ({
  backgroundColor: theme.color.primary,
}));
