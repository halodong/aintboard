import { ButtonStyled } from "./styled";

export default function Button({
  bg,
  children,
  onClick,
  type,
  className,
}: Props) {
  return (
    <ButtonStyled className={className} bg={bg} onClick={onClick} type={type}>
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
};
