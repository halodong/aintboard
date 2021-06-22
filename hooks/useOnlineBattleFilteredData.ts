import { uniqBy, isEmpty } from "lodash";
import { OnlineBattlesApiResponse, OnlineBattlesData } from "types/types";

import dayjs from "dayjs";

const initialFilteredData = [
  {
    label: "",
    value: "",
  },
];

export default function useOnlineBattleFilteredData() {
  let filter = initialFilteredData;

  const handleFilter = ({ onlineBattleApi, firstSelected }: Props) => {
    filter =
      onlineBattleApi?.response?.data?.onlineBattles
        ?.map((val: OnlineBattlesData | any) => {
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

    return uniqBy(filter, "value");
  };

  return handleFilter;
}

type Props = {
  onlineBattleApi: OnlineBattlesApiResponse | undefined;
  firstSelected: string;
};
