import { FilterWrapper, Text } from "./styled";

import DropDown from "~/components/DropDown";

const Filter = () => {
  return (
    <FilterWrapper>
      <Text>Filter by</Text>

      <DropDown placeHolder="Boardgame" />
      <DropDown placeHolder="Name" isName />
    </FilterWrapper>
  );
};

export default Filter;
