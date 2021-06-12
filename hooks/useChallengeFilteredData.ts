import { uniqBy, isEmpty, capitalize } from "lodash";

import { CHALLENGES_PAGE, ONLINE_BATTLES, REVIEWS_PAGE } from "util/constants";
import {
  ChallengesApiResponse,
  ChallengesData,
  ReviewApiResponse,
  ReviewData,
  OnlineBattlesApiResponse,
} from "types/types";
import dayjs from "dayjs";

const initialFilteredData = [
  {
    label: "",
    value: "",
  },
];

export default function useChallengeFilteredData() {
  let filter = initialFilteredData;

  const handleFilter = ({
    challengeApi,
    reviewApi,
    onlineBattleApi,
    firstSelected,
    type,
  }: Props) => {
    switch (type) {
      case CHALLENGES_PAGE:
        filter =
          challengeApi?.response?.data?.challenges
            ?.map((val: ChallengesData) => {
              return {
                label: val[firstSelected]?.toString() || "",
                value: val[firstSelected]?.toString() || "",
              };
            })
            .filter((v) => !isEmpty(v.value)) || initialFilteredData;
        break;
      case REVIEWS_PAGE:
        filter =
          reviewApi?.response?.data?.reviews
            ?.map((val: ReviewData) => {
              let label = val[firstSelected]?.toString() || "";

              // capitalize labels under these filter categories
              if (["language", "reviewType"].includes(firstSelected)) {
                label = capitalize(label);
              }

              return {
                label,
                value: val[firstSelected]?.toString() || "",
              };
            })
            .filter((v) => !isEmpty(v.value)) || initialFilteredData;
        break;

      case ONLINE_BATTLES:
        filter =
          onlineBattleApi?.response?.data?.onlineBattles
            ?.map((val: any) => {
              let label = val[firstSelected]?.toString() || "";
              let value = val[firstSelected]?.toString() || "";

              if (["eventEndDate"].includes(firstSelected)) {
                label = dayjs(label).format("MMMM DD, YYYY");
                value = dayjs(label).format("MM-DD-YYYY");
              }

              return {
                label,
                value,
              };
            })
            .filter((v) => !isEmpty(v.value) || initialFilteredData) ||
          initialFilteredData;
        break;
    }

    // only get the unique values
    return uniqBy(filter, "value");
  };

  return handleFilter;
}

type Props = {
  challengeApi?: ChallengesApiResponse | undefined;
  reviewApi?: ReviewApiResponse | undefined;
  onlineBattleApi?: OnlineBattlesApiResponse | undefined;
  firstSelected: string;
  type: string;
};
