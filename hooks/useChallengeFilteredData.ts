import { uniqBy, isEmpty, capitalize } from "lodash";

import { CHALLENGES_PAGE, REVIEWS_PAGE } from "util/constants";
import {
  ChallengesApiResponse,
  ChallengesData,
  ReviewApiResponse,
  ReviewData,
} from "types/types";

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
    }

    // only get the unique values
    return uniqBy(filter, "value");
  };

  return handleFilter;
}

type Props = {
  challengeApi?: ChallengesApiResponse | undefined;
  reviewApi?: ReviewApiResponse | undefined;
  firstSelected: string;
  type: string;
};
