import { ButtonStyled } from "./styled";

export default function Button({ bg, children, onClick, type }: Props) {
  return (
    <ButtonStyled bg={bg} onClick={onClick} type={type}>
      {children}
    </ButtonStyled>
  );
}

type Props = {
  bg: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: string;
};
