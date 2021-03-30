import { ButtonStyled } from "./styled";

export default function Button({ bg, children, onClick }: Props) {
  return (
    <ButtonStyled bg={bg} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
}

type Props = {
  bg: string;
  children: React.ReactNode;
  onClick: () => void;
};
