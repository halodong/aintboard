import { LabelStyled } from "./styled";

const Label = ({ children }: Props) => {
  return <LabelStyled>{children}</LabelStyled>;
};

type Props = {
  children: React.ReactNode;
};

export default Label;
