import classnames from "classnames";
import { UserWrapper } from "./styled";
import {
  GIRL_ICON,
  BOY_ICON,
  ALPACA_ICON,
  KNIGHT_ICON,
  DRAGON_ICON,
  WIZARD_ICON,
  GIRL_ICON_DEFAULT_BG,
  BOY_ICON_DEFAULT_BG,
  ALPACA_ICON_DEFAULT_BG,
  KNIGHT_ICON_DEFAULT_BG,
  DRAGON_ICON_DEFAULT_BG,
  WIZARD_ICON_DEFAULT_BG,
} from "util/constants";

import GirlAvatar from "assets/img/GirlAvatar";
import BoyAvatar from "assets/img/BoyAvatar";
import AlpacaAvatar from "assets/img/AlpacaAvatar";
import KnightAvatar from "assets/img/KnightAvatar";
import DragonAvatar from "~/assets/img/dragon";
import WizardAvatar from "~/assets/img/wizardAvatar";
import UserMale from "assets/img/user/UserMale";

const Avatar = ({ iconType, from, isChosen, special }: Props) => {
  let icon = <></>;
  let bgColor = "";

  switch (iconType) {
    case GIRL_ICON:
      icon = <GirlAvatar className="icon" />;
      bgColor = GIRL_ICON_DEFAULT_BG;
      break;
    case BOY_ICON:
      icon = <BoyAvatar className="icon" />;
      bgColor = BOY_ICON_DEFAULT_BG;
      break;
    case ALPACA_ICON:
      icon = <AlpacaAvatar className="icon" />;
      bgColor = ALPACA_ICON_DEFAULT_BG;
      break;
    case KNIGHT_ICON:
      icon = <KnightAvatar className="icon" />;
      bgColor = KNIGHT_ICON_DEFAULT_BG;
      break;
    case DRAGON_ICON:
      icon = <DragonAvatar className="icon" />;
      bgColor = DRAGON_ICON_DEFAULT_BG;
      break;
    case WIZARD_ICON:
      icon = <WizardAvatar className="icon" />;
      bgColor = WIZARD_ICON_DEFAULT_BG;
      break;
    default:
      icon = <UserMale className="icon" />;
      break;
  }

  return (
    <UserWrapper
      from={from}
      bgColor={bgColor}
      isChosen={isChosen}
      className={classnames("avatar-icon", { "special-icon": special })}
    >
      {icon}
    </UserWrapper>
  );
};

type Props = {
  iconType: string;
  from?: string;
  isChosen?: boolean;
  special?: boolean;
};

export default Avatar;
