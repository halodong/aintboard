import { uniqBy, isEmpty, capitalize } from "lodash";
import { ReviewApiResponse, ReviewData } from "../types/types";

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

    return uniqBy(filter, "value");
  };
  return handleFilter;
}

type Props = {
  reviewApi: ReviewApiResponse | undefined;
  firstSelected: string;
};
