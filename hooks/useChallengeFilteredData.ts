import { uniqBy, isEmpty } from "lodash";
import { ChallengesApiResponse, ChallengesData } from "types/types";

const initialFilteredData = [
  {
    label: "",
    value: "",
  },
];

export default function useChallengeFilteredData() {
  let filter = initialFilteredData;

  const handleFilter = ({ challengeApi, firstSelected }: Props) => {
    filter =
      challengeApi?.response?.data?.challenges
        ?.map((val: ChallengesData) => {
          return {
            label: val[firstSelected]?.toString() || "",
            value: val[firstSelected]?.toString() || "",
          };
        })
        .filter((v) => !isEmpty(v.value)) || initialFilteredData;

    // only get the unique values
    return uniqBy(filter, "value");
  };

  return handleFilter;
}

type Props = {
  challengeApi?: ChallengesApiResponse | undefined;
  firstSelected: string;
};
