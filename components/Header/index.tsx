import {
  HeaderWrapper,
  NavBarButtons,
  NavBarContent,
  SearchContainer,
  Tagline,
  LookingForText,
} from "./styled";
import { WhiteLogo, TreesGroup1, TreesGroup2, Tent } from "~/assets/img";
import Button from "~/components/Button";
import Input from "~/components/Input";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";

export default function Header({ homepage, isSearchPage = false }: Props) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <HeaderWrapper isSearchPage={isSearchPage}>
      <NavBarContent>
        <Link href="/">
          <a>
            <WhiteLogo />
          </a>
        </Link>
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

      {homepage && (
        <div className="homepage-bg-container">
          <TreesGroup1 className="trees-1" />
          <TreesGroup2 className="trees-2" />
          <Tent className="tent" />
        </div>
      )}

      <Tagline homepage={homepage}>
        Interactive Boardgame <br /> Community
      </Tagline>

      {isSearchPage && <LookingForText>Looking for "{name}"</LookingForText>}
    </HeaderWrapper>
  );
}

type Props = {
  homepage?: boolean;
  isSearchPage?: boolean;
};
