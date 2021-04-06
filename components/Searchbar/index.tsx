import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { SearchBarContainer, customSelectStyles } from "./styled";

import { ValueType, ActionMeta } from "react-select";
import AsyncSelect from "react-select/async";
import fetcher from "~/util/fetch";
import debounce from "debounce-promise";
import { BggBoardgameApiData } from "~/types/types";
import { HEADER_COMPONENT } from "util/constants";

const Searchbar = ({
  scrolling = false,
  showLinks = true,
  from = HEADER_COMPONENT,
  width,
  height,
  inputBgColor = "white",
  defaultValue = "",
}: Props) => {
  const router = useRouter();
  const [inputVal, setInputVal] = useState(defaultValue);

  const onSelectChange = (
    value: ValueType<any, boolean>,
    action: ActionMeta<any>
  ) => {
    if (action.action === "select-option" && from === HEADER_COMPONENT) {
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
    <SearchBarContainer>
      <AsyncSelect
        id="search-select"
        inputId="search-select"
        cacheOptions
        loadOptions={debounce(getOptions, 500)}
        onChange={onSelectChange}
        onBlur={() => {}}
        placeholder="Find a boardgame"
        styles={customSelectStyles}
        menuPortalTarget={document.body}
        width={width}
        height={height}
        inputBgColor={inputBgColor}
        onInputChange={(inputVal, action) => {
          if (
            action.action !== "input-blur" &&
            action.action !== "menu-close"
          ) {
            setInputVal(inputVal);
          }
        }}
        inputValue={inputVal}
      />

      {!scrolling && showLinks && from === HEADER_COMPONENT && (
        <div className="links">
          <Link href="/">Reviews</Link>
          <Link href="/">Online Battles</Link>
          <Link href="/challenges">Challenges</Link>
          <Link href="/">Game Nights</Link>
        </div>
      )}
    </SearchBarContainer>
  );
};

type Props = {
  scrolling?: boolean;
  showLinks?: boolean;
  from?: string;
  width?: string;
  height?: string;
  inputBgColor?: string;
  defaultValue?: string;
};

export default Searchbar;
