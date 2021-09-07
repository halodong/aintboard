import { isEmpty, uniqWith, capitalize } from "lodash";
import { ReviewApiResponse, ReviewData } from "types/types";

const initialFilteredData = [
  {
    label: "",
    value: "",
  },
];

export default function useReviewFilteredData() {
  let filter = initialFilteredData;

  const handleFilter = ({ reviewApi, firstSelected }: Props) => {
    filter =
      reviewApi?.response?.data?.reviews
        ?.map((val: ReviewData) => {
          let label = val[firstSelected]?.toString() || "";
          let value = val[firstSelected]?.toString() || "";

          // capitalize labels under these filter categories
          if (["language", "reviewType", "bgName"].includes(firstSelected)) {
            label = label.replace(/\w+/g, capitalize); // capitalize every word in labels without removing the special chars
            value = capitalize(value); // for sorting
          }

          return {
            label,
            value,
          };
        })
        .filter((v) => !isEmpty(v.value)) || initialFilteredData;

    return uniqWith(
      filter,
      (a, b) => a.value.toLowerCase() === b.value.toLowerCase()
    );
  };
  return handleFilter;
}

type Props = {
  reviewApi: ReviewApiResponse | undefined;
  firstSelected: string;
};
