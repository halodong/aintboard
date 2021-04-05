import React from "react";

import { CardButtonContainer, CardTitle } from "./styled";
import RightArrowCircle from "~/assets/img/right-arrow-circle.svg";

const CardButton = ({ children }: Props) => {
  return (
    <CardButtonContainer>
      <CardTitle>{children}</CardTitle>
      <RightArrowCircle />
    </CardButtonContainer>
  );
};

type Props = {
  children: string;
};

export default CardButton;
