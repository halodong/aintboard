import { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "~/util/fetch";
import { useDispatch } from "react-redux";
import { saveFilters } from "redux/slices/filterSlice";

import DropDown from "~/components/Common/DropDown";

import { FilterWrapper, Text } from "./styled";
import { CHALLENGES_PAGE, REVIEWS_PAGE, ONLINE_BATTLES } from "util/constants";
import useChallengeFilteredData from "~/hooks/useChallengeFilteredData";
import useOnlineBattleFilteredData from "~/hooks/useOnlineBattleFilteredData";
import useReviewFilteredData from "~/hooks/useReviewFilteredData";
import {
  ChallengesApiResponse,
  OnlineBattlesApiResponse,
  ReviewApiResponse,
} from "types/types";
import _, { isEmpty } from "lodash";

import useCurrentUser from "~/hooks/useCurrentUser";

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
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const user = useCurrentUser();
  const userData = user?.userData ? JSON.parse(user?.userData) : {};

  const { data: challengeData } = useSWR<ChallengesApiResponse>(
    type === CHALLENGES_PAGE ? `/api/challenges` : null,
    fetcher
  );

  const { data: reviewData } = useSWR<ReviewApiResponse>(
    type === REVIEWS_PAGE ? `/api/reviews?approved=true` : null,
    fetcher
  );

  const { data: onlineBattleData } = useSWR<OnlineBattlesApiResponse>(
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

  const handleFilterChallenge = useChallengeFilteredData();
  const handleFilterOnlineBattle = useOnlineBattleFilteredData();
  const handleFilterReview = useReviewFilteredData();

  useEffect(() => {
    if (firstSelected !== null) {
      let filter = initialFilteredData;

      switch (type) {
        case CHALLENGES_PAGE:
          filter = handleFilterChallenge({
            challengeApi: challengeData,
            firstSelected,
          });
          break;
        case REVIEWS_PAGE:
          filter = handleFilterReview({
            reviewApi: reviewData,
            firstSelected,
          });
          break;
        case ONLINE_BATTLES:
          filter = handleFilterOnlineBattle({
            onlineBattleApi: onlineBattleData,
            firstSelected,
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
        {
          label: "Created By Me",
          value: "createdBy",
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
    setSecondSelected(selected?.value === "createdBy" ? userData?._id : null);
  };

  const onSecondDropdownChange = (selected: OptionItem) => {
    setSecondSelected(selected?.value);
  };

  useEffect(() => {
    if (firstSelected === "createdBy" || isEmpty(firstSelected)) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }, [firstSelected, showDropdown]);

  return (
    <FilterWrapper>
      <Text>Filter by</Text>

      <DropDown
        placeholder="Please choose"
        options={options}
        onChange={onFirstDropdownChange}
      />

      {showDropdown && (
        <DropDown
          placeholder="Please choose"
          onChange={onSecondDropdownChange}
          options={_.sortBy(filteredData, (e) => e.value)}
          keyProp={filteredData?.[0]?.value || "first-key"}
        />
      )}
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
