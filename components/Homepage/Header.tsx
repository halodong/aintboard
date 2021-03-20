import {
  HeaderWrapper,
  NavBarButtons,
  NavBarContent,
  SearchContainer,
  Tagline,
} from "./styled";
import { WhiteLogo, TreesGroup1, TreesGroup2, Tent } from "~/assets/img";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

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
        <Formik
          initialValues={{
            searchInput: "",
          }}
          onSubmit={(values) => {
            router.push(`/search/${values.searchInput}`);
          }}
        >
          <Form>
            <Input
              name="searchInput"
              minWidth="30rem"
              placeholder="Find a boardgame"
              rightIcon="search"
              showRightIcon
            />
          </Form>
        </Formik>
        <div className="links">
          <Link href="/">
            <a>Reviews</a>
          </Link>
          <Link href="/">
            <a>Online Battles</a>
          </Link>
          <Link href="/">
            <a>Challenges</a>
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
