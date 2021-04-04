import { uniqBy } from "lodash";
import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "~/util/fetch";
import { useDispatch } from "react-redux";
import { saveFilters } from "redux/slices/filterSlice";

import DropDown from "~/components/Common/DropDown";
import { CHALLENGES_PAGE } from "util/constants";
import { FilterWrapper, Text } from "./styled";

import { ChallengesApiResponse, ChallengesData } from "types/types";

const Filter = ({ type }: Props) => {
  const dispatch = useDispatch();
  const [firstSelected, setFirstSelected] = useState<string>("");
  const [secondSelected, setSecondSelected] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<OptionProps>([
    {
      label: "",
      value: "",
    },
  ]);

  const { data } = useSWR<ChallengesApiResponse>(
    type === CHALLENGES_PAGE ? `/api/challenges` : null,
    fetcher
  );

  useEffect(() => {
    if (secondSelected !== null) {
      dispatch(
        saveFilters({
          firstSelected,
          secondSelected,
        })
      );
    }
    //eslint-disable-next-line
  }, [secondSelected]);

  useEffect(() => {
    if (firstSelected !== null) {
      let filter =
        data?.response?.data?.challenges?.map((c: ChallengesData) => {
          return {
            label: c[firstSelected]?.toString() || "",
            value: c[firstSelected]?.toString() || "",
          };
        }) || [];

      filter = uniqBy(filter, "value");

      setFilteredData(filter);
      return;
    }

    setFilteredData([
      {
        label: "",
        value: "",
      },
    ]);
  }, [firstSelected, data]);

  let options: OptionProps = [];

  switch (type) {
    case CHALLENGES_PAGE:
      options = [
        {
          label: "Boardgame Name",
          value: "bgName",
        },
        {
          label: "Boardgame Year",
          value: "bgYear",
        },
        {
          label: "PowerUp Amount",
          value: "powerUpAmount",
        },
      ];
      break;
    default:
      options = [];
  }

  const onFirstDropdownChange = (selected: OptionItem) => {
    setFirstSelected(selected?.value || "");
    setSecondSelected(null);
  };

  const onSecondDropdownChange = (selected: OptionItem) => {
    const removeColon = selected?.value
      ? selected?.value.replace(/:\s*/g, " ")
      : null;
    setSecondSelected(removeColon);
  };

  return (
    <FilterWrapper>
      <Text>Filter by</Text>

      <DropDown
        placeholder="Please choose"
        options={options}
        onChange={onFirstDropdownChange}
      />
      <DropDown
        placeholder=""
        onChange={onSecondDropdownChange}
        options={filteredData}
        keyProp={filteredData?.[0]?.value || "first-key"}
      />
    </FilterWrapper>
  );
};

type Props = {
  type: string;
  onLoadData?: (data: ChallengesApiResponse | undefined) => void;
};

type OptionItem = {
  label: string;
  value: string;
};

type OptionProps = OptionItem[];

export default Filter;
