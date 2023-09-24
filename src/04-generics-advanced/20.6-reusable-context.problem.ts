import { CSSProperties } from "react";

const makeUseStyled = <TTheme = {}>() => {
  return (func: (theme: TTheme) => CSSProperties) => {
    // Imagine that this function hooks into a global theme
    // and returns the CSSProperties
    return {} as CSSProperties;
  };
};

interface MyTheme {
  color: {
    primary: string;
  };
  fontSize: {
    small: string;
  };
}

const useStyled = makeUseStyled<MyTheme>();

const buttonStyle = useStyled((theme) => ({
  color: theme.color.primary,
  fontSize: theme.fontSize.small,
}));

const divStyle = useStyled((theme) => ({
  backgroundColor: theme.color.primary,
}));
