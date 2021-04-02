import { useRouter } from "next/router";
import Link from "next/link";

import { SearchBarContainer, customSelectStyles } from "./styled";

import { ValueType, ActionMeta } from "react-select";
import AsyncSelect from "react-select/async";
import fetcher from "~/util/fetch";
import debounce from "debounce-promise";
import { BggBoardgameApiData } from "~/types/types";

const Searchbar = ({ scrolling = false }: Props) => {
  const router = useRouter();

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
      />

      {!scrolling && (
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
};

export default Searchbar;
