import React from "react";

import { CardButtonContainer, CardTitle } from "./styled";
import RightArrowCircle from "~/assets/img/right-arrow-circle.svg";

const SideButton = ({ children, onClick }: Props) => {
  return (
    <CardButtonContainer onClick={onClick}>
      <CardTitle>{children}</CardTitle>
      <RightArrowCircle />
    </CardButtonContainer>
  );
};

type Props = {
  children: string;
  onClick: () => void;
};

export default SideButton;
