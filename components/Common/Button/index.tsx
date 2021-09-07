import { ButtonStyled } from "./styled";

export default function Button({
  bg,
  children,
  onClick,
  type,
  disabled = false,
  className,
}: Props) {
  return (
    <ButtonStyled
      bg={bg}
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </ButtonStyled>
  );
}

type Props = {
  className?: string;
  bg: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean | false;
};
