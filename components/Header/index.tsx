import {
  HeaderWrapper,
  NavBarButtons,
  NavBarContent,
  SearchContainer,
  Tagline,
  LookingForText,
  customSelectStyles,
  GameFont,
  ChallengesTagline,
} from "./styled";
import { WhiteLogo, TreesGroup1, TreesGroup2, Tent } from "~/assets/img";
import Button from "~/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { ValueType, ActionMeta } from "react-select";
import AsyncSelect from "react-select/async";
import fetcher from "~/util/fetch";
import { BggBoardgameApiData } from "~/types/types";
import debounce from "debounce-promise";
import Filter from "~/components/Filter";

export default function Header({
  homepage,
  isSearchPage = false,
  isChallengesPage = false,
}: Props) {
  const router = useRouter();
  const { name } = router.query;

  const onSelectChange = (
    value: ValueType<any, boolean>,
    action: ActionMeta<any>
  ) => {
    if (action.action === "select-option") {
      router.push(`/boardgame/${value?.value}`);
    }
  };

  const getOptions = async (inputValue: string) => {
    if (inputValue.length > 2) {
      let options: BggBoardgameApiData = await fetcher(
        `/api/bg-items?itemName=${inputValue}`
      );

      return options?.items[0].item?.slice(0, 8).map((bg) => {
        return {
          value: bg._attributes.id,
          label: bg.name[0]._attributes.value,
        };
      });
    }

    return [];
  };

  return (
    <HeaderWrapper
      isSearchPage={isSearchPage}
      isChallengePage={isChallengesPage}
    >
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
        <AsyncSelect
          id="search-select"
          inputId="search-select"
          cacheOptions
          loadOptions={debounce(getOptions, 500)}
          onChange={onSelectChange}
          onBlur={() => {}}
          placeholder="Find a boardgame"
          styles={customSelectStyles}
        />
        <div className="links">
          <Link href="/">Reviews</Link>
          <Link href="/">Online Battles</Link>
          <Link href="/">Challenges</Link>
        </div>
      </SearchContainer>

      {homepage && (
        <div className="homepage-bg-container">
          <TreesGroup1 className="trees-1" />
          <TreesGroup2 className="trees-2" />
          <Tent className="tent" />
          <div className="ground"></div>
        </div>
      )}

      <Tagline homepage={homepage}>
        Interactive Boardgame <br /> Community
      </Tagline>

      {isSearchPage && <LookingForText>Looking for "{name}"</LookingForText>}
      {isChallengesPage && <GameFont>Challenges</GameFont>}
      {isChallengesPage && (
        <ChallengesTagline>
          Achieve challenge to get PowerUps!
        </ChallengesTagline>
      )}

      {isChallengesPage && <Filter />}
    </HeaderWrapper>
  );
}

type Props = {
  homepage?: boolean;
  isSearchPage?: boolean;
  isChallengesPage?: boolean;
};

type Options = {
  value: string;
  label: string;
};
