import { ButtonStyled } from "./styled";

export default function Button({
  bg,
  children,
  onClick,
  type,
  disabled = false,
}: Props) {
  return (
    <ButtonStyled bg={bg} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </ButtonStyled>
  );
}

type Props = {
  bg: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | false;
};
