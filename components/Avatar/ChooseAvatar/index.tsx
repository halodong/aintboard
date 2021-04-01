import Label from "~/components/Label";
import { UserWrapper, AvatarWrapper } from "~/components/Avatar/styled";

import GirlAvatar from "~/assets/img/GirlAvatar";
import BoyAvatar from "~/assets/img/BoyAvatar";
import AlpacaAvatar from "~/assets/img/AlpacaAvatar";
import KnightAvatar from "~/assets/img/KnightAvatar";
import DragonAvatar from "~/assets/img/dragon";
import WizardAvatar from "~/assets/img/wizardAvatar";
import { ChooseAvatarContainer } from "./styled";

const ChooseAvatar = () => {
  return (
    <ChooseAvatarContainer>
      <Label>Choose an avatar</Label>

      <AvatarWrapper>
        <UserWrapper>
          <GirlAvatar className="icon" />
        </UserWrapper>
        <UserWrapper>
          <BoyAvatar className="icon" />
        </UserWrapper>
        <UserWrapper>
          <AlpacaAvatar className="icon" />
        </UserWrapper>
        <UserWrapper>
          <KnightAvatar className="icon" />
        </UserWrapper>

        <UserWrapper className="special-icon">
          <DragonAvatar className="icon" />
        </UserWrapper>
        <UserWrapper className="special-icon">
          <WizardAvatar className="icon" />
        </UserWrapper>
      </AvatarWrapper>
    </ChooseAvatarContainer>
  );
};

export default ChooseAvatar;
