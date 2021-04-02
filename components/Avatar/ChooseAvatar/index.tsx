import { useState, useEffect } from "react";
import Label from "~/components/Label";
import { UserWrapper, AvatarWrapper } from "~/components/Avatar/styled";

import GirlAvatar from "~/assets/img/GirlAvatar";
import BoyAvatar from "~/assets/img/BoyAvatar";
import AlpacaAvatar from "~/assets/img/AlpacaAvatar";
import KnightAvatar from "~/assets/img/KnightAvatar";
import DragonAvatar from "~/assets/img/dragon";
import WizardAvatar from "~/assets/img/wizardAvatar";
import { ChooseAvatarContainer } from "./styled";
import {
  GIRL_ICON,
  BOY_ICON,
  ALPACA_ICON,
  KNIGHT_ICON,
  CHOOSE_AVATAR_COMPONENT,
} from "~/util/constants";

const ChooseAvatar = ({ chooseAvatar }: Props) => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    chooseAvatar(avatar);
  }, [avatar, chooseAvatar]);

  return (
    <ChooseAvatarContainer>
      <Label>Choose an avatar</Label>

      <AvatarWrapper>
        <UserWrapper
          onClick={() => setAvatar(GIRL_ICON)}
          isChosen={avatar === GIRL_ICON}
          from={CHOOSE_AVATAR_COMPONENT}
        >
          <GirlAvatar className="icon" />
        </UserWrapper>

        <UserWrapper
          onClick={() => setAvatar(BOY_ICON)}
          isChosen={avatar === BOY_ICON}
          from={CHOOSE_AVATAR_COMPONENT}
        >
          <BoyAvatar className="icon" />
        </UserWrapper>

        <UserWrapper
          onClick={() => setAvatar(ALPACA_ICON)}
          isChosen={avatar === ALPACA_ICON}
          from={CHOOSE_AVATAR_COMPONENT}
        >
          <AlpacaAvatar className="icon" />
        </UserWrapper>

        <UserWrapper
          onClick={() => setAvatar(KNIGHT_ICON)}
          isChosen={avatar === KNIGHT_ICON}
          from={CHOOSE_AVATAR_COMPONENT}
        >
          <KnightAvatar className="icon" />
        </UserWrapper>

        <UserWrapper className="special-icon" from={CHOOSE_AVATAR_COMPONENT}>
          <DragonAvatar className="icon" />
        </UserWrapper>

        <UserWrapper className="special-icon" from={CHOOSE_AVATAR_COMPONENT}>
          <WizardAvatar className="icon" />
        </UserWrapper>
      </AvatarWrapper>
    </ChooseAvatarContainer>
  );
};

type Props = {
  chooseAvatar: (type: string) => void;
};

export default ChooseAvatar;
