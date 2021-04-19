import Avatar from "components/Avatar";

import { GIRL_ICON, BOY_ICON, ALPACA_ICON, KNIGHT_ICON } from "util/constants";
import {
  BuyAvatarsWrapper,
  CommonAvatars,
  SpecialAvatars,
  SpecialAvatarWrapper,
  GameFont,
  UnlockText,
} from "./styled";
import useCurrentUser from "~/hooks/useCurrentUser";
import { SpecialAvatarsData } from "~/types/types";

const commonAvatars = [GIRL_ICON, BOY_ICON, ALPACA_ICON, KNIGHT_ICON];

const BuyAvatar = ({ specialAvatars }: Props) => {
  const user = useCurrentUser();
  const userData = user?.userData ? JSON.parse(user?.userData) : {};

  return (
    <BuyAvatarsWrapper>
      <CommonAvatars>
        <h4>Common Avatars</h4>
        <div className="avatars">
          {commonAvatars.map((avatar, i) => (
            <Avatar
              key={`${avatar}-${i}`}
              iconType={avatar}
              isChosen={userData?.avatar === avatar}
            />
          ))}
        </div>
      </CommonAvatars>
      <SpecialAvatars>
        <h4>Special Avatars</h4>
        <div className="avatars">
          {specialAvatars.map((avatar, i) => (
            <SpecialAvatarWrapper>
              <Avatar
                key={`${avatar}-${i}`}
                iconType={avatar.icon}
                isChosen={userData?.avatar === avatar.icon}
              />
              <UnlockText>
                <label>Unlock for {avatar?.powerUpAmount}</label>
                <GameFont>UP</GameFont>
              </UnlockText>
            </SpecialAvatarWrapper>
          ))}
        </div>
      </SpecialAvatars>
    </BuyAvatarsWrapper>
  );
};

type Props = {
  specialAvatars: SpecialAvatarsData[];
};

export default BuyAvatar;
