import { useState, useEffect } from "react";
import Label from "~/components/Common/Label";
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
  DRAGON_ICON,
  WIZARD_ICON,
  CHOOSE_AVATAR_COMPONENT,
  GIRL_ICON_DEFAULT_BG,
  BOY_ICON_DEFAULT_BG,
  ALPACA_ICON_DEFAULT_BG,
  KNIGHT_ICON_DEFAULT_BG,
  DRAGON_ICON_DEFAULT_BG,
  WIZARD_ICON_DEFAULT_BG,
} from "~/util/constants";

const avatarList = [
  {
    key: GIRL_ICON,
    icon: GIRL_ICON,
    bgColor: GIRL_ICON_DEFAULT_BG,
    className: "icon",
    component: <GirlAvatar className="icon" />,
  },
  {
    key: BOY_ICON,
    icon: BOY_ICON,
    bgColor: BOY_ICON_DEFAULT_BG,
    className: "icon",
    component: <BoyAvatar className="icon" />,
  },
  {
    key: ALPACA_ICON,
    icon: ALPACA_ICON,
    bgColor: ALPACA_ICON_DEFAULT_BG,
    className: "icon",
    component: <AlpacaAvatar className="icon" />,
  },
  {
    key: KNIGHT_ICON,
    icon: KNIGHT_ICON,
    bgColor: KNIGHT_ICON_DEFAULT_BG,
    className: "icon",
    component: <KnightAvatar className="icon" />,
  },
  {
    key: DRAGON_ICON,
    bgColor: DRAGON_ICON_DEFAULT_BG,
    className: "icon",
    component: <DragonAvatar className="icon" />,
    special: true,
  },
  {
    key: WIZARD_ICON,
    bgColor: WIZARD_ICON_DEFAULT_BG,
    className: "icon",
    component: <WizardAvatar className="icon" />,
    special: true,
  },
];

const ChooseAvatar = ({ chooseAvatar }: Props) => {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    chooseAvatar(avatar);
  }, [avatar, chooseAvatar]);

  return (
    <ChooseAvatarContainer>
      <Label>Choose an avatar</Label>

      <AvatarWrapper>
        {avatarList.map((a, i) => (
          <UserWrapper
            key={`${a.key}-${i}`}
            className={a.special === true ? "special-icon" : ""}
            onClick={() =>
              a.special !== true && a.icon ? setAvatar(a.icon) : null
            }
            isChosen={a.special !== true ? avatar === a.icon : false}
            bgColor={a.bgColor}
            from={CHOOSE_AVATAR_COMPONENT}
          >
            {a.component}
          </UserWrapper>
        ))}
      </AvatarWrapper>
    </ChooseAvatarContainer>
  );
};

type Props = {
  chooseAvatar: (type: string) => void;
};

export default ChooseAvatar;
