import { HeaderWrapper, NavBarButtons, NavBarContent } from "./styled";
import { WhiteLogo } from "~/assets/img";
import Button from "~/components/Button";

export default function Header() {
  return (
    <HeaderWrapper>
      <NavBarContent>
        <WhiteLogo />
        <NavBarButtons>
          <Button bg="white">Login</Button>
          <Button bg="lightYellow">Join us!</Button>
        </NavBarButtons>
      </NavBarContent>
    </HeaderWrapper>
  );
}
