import { capitalize, isEmpty, uniqWith } from "lodash";
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
          let label = val[firstSelected]?.toString() || "";
          let value = val[firstSelected]?.toString() || "";

          if (["bgName"].includes(firstSelected)) {
            label = label.replace(/\w+/g, capitalize);
            value = capitalize(value);
          }

          return {
            label,
            value,
          };
        })
        .filter((v) => !isEmpty(v.value)) || initialFilteredData;

    // only get the unique values
    return uniqWith(
      filter,
      (a, b) => a.value.toLowerCase() === b.value.toLowerCase()
    );
  };

  return handleFilter;
}

type Props = {
  challengeApi?: ChallengesApiResponse | undefined;
  firstSelected: string;
};
