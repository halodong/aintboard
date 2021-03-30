import Label from "~/components/Label";
import { UserWrapper } from "~/components/Avatar/styled";

// import BoyIcon from '~/assets/img/user/boy.svg';
import { ChooseAvatarContainer } from "./styled";

const ChooseAvatar = () => {
  return (
    <ChooseAvatarContainer>
      <Label>Choose an avatar</Label>

      <UserWrapper>{/* <BoyIcon className="icon" /> */}</UserWrapper>
    </ChooseAvatarContainer>
  );
};

export default ChooseAvatar;
