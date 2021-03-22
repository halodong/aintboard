import {
  HeaderWrapper,
  NavBarButtons,
  NavBarContent,
  SearchContainer,
  Tagline,
  LookingForText,
  customSelectStyles,
} from "./styled";
import { useState } from "react";
import { WhiteLogo, TreesGroup1, TreesGroup2, Tent } from "~/assets/img";
import Button from "~/components/Button";
import Link from "next/link";
import { useRouter } from "next/router";
import { InputActionMeta, ValueType, ActionMeta } from "react-select";
import AsyncSelect from "react-select/async";
import fetcher from "~/util/fetch";
import { BggBoardgameApiData } from "~/types/types";

export default function Header({ homepage, isSearchPage = false }: Props) {
  const router = useRouter();
  const { name } = router.query;
  const [inputText, setInputText] = useState("");
  const [defaultOptions, setDefaultOptions] = useState<Options[]>([]);

  const onInputChange = async (text: string, params: InputActionMeta) => {
    if (params.action === "input-change" || params.action === "set-value") {
      setInputText(text);
    }

    if (params.action === "menu-close") {
      let options = await getOptions(inputText);
      setDefaultOptions(options);
    }
  };

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
        <AsyncSelect
          id="search-select"
          inputId="search-select"
          cacheOptions
          loadOptions={getOptions}
          defaultOptions={defaultOptions}
          onInputChange={onInputChange}
          onChange={onSelectChange}
          inputValue={inputText}
          onBlur={() => {}}
          placeholder="Find a boardgame"
          styles={customSelectStyles}
        />
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
          <div className="ground"></div>
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

type Options = {
  value: string;
  label: string;
};
