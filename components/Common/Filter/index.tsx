import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "~/util/fetch";
import { useDispatch } from "react-redux";
import { saveFilters } from "redux/slices/filterSlice";

import DropDown from "~/components/Common/DropDown";

import { FilterWrapper, Text } from "./styled";
import { CHALLENGES_PAGE, REVIEWS_PAGE, ONLINE_BATTLES } from "util/constants";
import useChallengeFilteredData from "~/hooks/useChallengeFilteredData";
import {
  BattlesApiResponse,
  ChallengesApiResponse,
  ReviewApiResponse,
} from "types/types";

const initialFilteredData = [
  {
    label: "",
    value: "",
  },
];

const Filter = ({ type }: Props) => {
  const dispatch = useDispatch();
  const [firstSelected, setFirstSelected] = useState<string>("");
  const [secondSelected, setSecondSelected] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<OptionProps>(
    initialFilteredData
  );

  const { data: challengeData } = useSWR<ChallengesApiResponse>(
    type === CHALLENGES_PAGE ? `/api/challenges` : null,
    fetcher
  );

  const { data: reviewData } = useSWR<ReviewApiResponse>(
    type === REVIEWS_PAGE ? `/api/reviews` : null,
    fetcher
  );

  const { data: onlineBattleData } = useSWR<BattlesApiResponse>(
    type === ONLINE_BATTLES ? `/api/online-battles` : null,
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

  const handleFilter = useChallengeFilteredData();

  useEffect(() => {
    if (firstSelected !== null) {
      let filter = initialFilteredData;

      switch (type) {
        case CHALLENGES_PAGE:
          filter = handleFilter({
            challengeApi: challengeData,
            firstSelected,
            type,
          });
          break;
        case REVIEWS_PAGE:
          filter = handleFilter({ reviewApi: reviewData, firstSelected, type });
          break;
        case ONLINE_BATTLES:
          filter = handleFilter({
            onlineBattleApi: onlineBattleData,
            firstSelected,
            type,
          });
          break;
      }

      // this filteredData to filled for second dropdown
      setFilteredData(filter);
      return;
    }

    setFilteredData([
      {
        label: "",
        value: "",
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstSelected, challengeData]);

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
    case REVIEWS_PAGE:
      options = [
        {
          label: "Boardgame Name",
          value: "bgName",
        },
        {
          label: "Review Type",
          value: "reviewType",
        },
        {
          label: "Language",
          value: "language",
        },
        {
          label: "Overall Rating",
          value: "overallRating",
        },
      ];
      break;
    case ONLINE_BATTLES:
      options = [
        {
          label: "Boardgame Name",
          value: "boardGameName",
        },
        {
          label: "Event End Date",
          value: "eventEndDate",
        },
        {
          label: "Created By Me",
          value: "createdBy",
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
