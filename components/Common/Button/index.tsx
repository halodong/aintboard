import { ButtonStyled } from "./styled";

export default function Button({
  bg,
  children,
  onClick,
  type,
  disabled = false,
  className,
  noPointer = false,
}: Props) {
  return (
    <ButtonStyled
      bg={bg}
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
      noPointer={noPointer}
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
  noPointer?: boolean;
};
