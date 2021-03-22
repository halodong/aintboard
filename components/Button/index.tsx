import { ButtonStyled } from "./styled";

export default function Button({ bg, children }: Props) {
  return <ButtonStyled bg={bg}>{children}</ButtonStyled>;
}

type Props = {
  bg: string;
  children: React.ReactNode;
};
