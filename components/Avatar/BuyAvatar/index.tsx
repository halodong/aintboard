import Avatar from "components/Avatar";

import {
  GIRL_ICON,
  BOY_ICON,
  ALPACA_ICON,
  KNIGHT_ICON,
  DRAGON_ICON,
  WIZARD_ICON,
} from "util/constants";
import { BuyAvatarsWrapper } from "./styled";

const commonAvatars = [GIRL_ICON, BOY_ICON, ALPACA_ICON, KNIGHT_ICON];

const BuyAvatar = () => {
  return (
    <BuyAvatarsWrapper>
      {commonAvatars.map((avatar, i) => (
        <Avatar key={`${avatar}-${i}`} iconType={avatar} />
      ))}
    </BuyAvatarsWrapper>
  );
};

export default BuyAvatar;
