import {
  HeaderWrapper,
  NavBarButtons,
  NavBarContent,
  SearchContainer,
  Tagline,
} from "./styled";
import {
  WhiteLogo,
  TreesGroup1,
  TreesGroup2,
  Tent,
  Search,
} from "~/assets/img";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Link from "next/link";

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

      <SearchContainer>
        <Input
          minWidth="30rem"
          placeholder="Find a boardgame"
          rightIcon={<Search className="search-icon" />}
        />
        <div className="links">
          <Link href="/">
            <a>Events</a>
          </Link>
          <Link href="/">
            <a>FAQs</a>
          </Link>
          <Link href="/">
            <a>About Us</a>
          </Link>
        </div>
      </SearchContainer>

      <TreesGroup1 className="trees-1" />
      <TreesGroup2 className="trees-2" />
      <Tent className="tent" />

      <Tagline>
        Interactive Boardgame <br /> Community
      </Tagline>
    </HeaderWrapper>
  );
}
