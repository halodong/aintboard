import _ from "lodash";
import { useState } from "react";
import Select from "react-select";

import { DropDownContainer } from "./styled";

const DropDown = ({
  placeholder,
  marginLeft,
  options,
  selected,
  keyProp = "key",
  onChange,
}: Props) => {
  const emptyDefault = {
    label: placeholder || "Please choose" || "",
    value: "",
  };
  const [selectedState, setSelectedState] = useState(emptyDefault);
  // Sort Event End Date ascending
  options = _.sortBy(options, (e) => e.value);

  return (
    <DropDownContainer marginLeft={marginLeft}>
      <Select
        key={keyProp}
        className="select"
        id={`search-select-${keyProp}`}
        inputId="search-select"
        placeholder={placeholder}
        isClearable={true}
        isSearchable={false}
        options={_.uniqBy(options, (e) => e.label)}
        value={
          (selected &&
            selected.length > 0 &&
            options?.filter((o) => o.value === selected)) ||
          selectedState ||
          emptyDefault
        }
        onChange={(selectedOption) => {
          onChange(selectedOption || emptyDefault);
          setSelectedState(selectedOption || emptyDefault);
        }}
      />
    </DropDownContainer>
  );
};

type OptionItem = {
  label: string;
  value: string;
};

type Props = {
  placeholder?: string;
  marginLeft?: string;
  selected?: string;
  options?: OptionItem[];
  onChange: (selected: OptionItem) => void;
  keyProp?: string;
};

export default DropDown;
