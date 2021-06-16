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
  isDisabled,
}: Props) => {
  const emptyDefault = {
    label: placeholder || "Please choose" || "",
    value: "",
  };
  const [selectedState, setSelectedState] = useState(emptyDefault);

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
        options={options}
        value={
          isDisabled
            ? null
            : (selected &&
                selected.length > 0 &&
                options?.filter((o) => o.value === selected)) ||
              selectedState ||
              emptyDefault
        }
        onChange={(selectedOption) => {
          onChange(selectedOption || emptyDefault);
          setSelectedState(selectedOption || emptyDefault);
        }}
        isDisabled={isDisabled}
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
  isDisabled?: boolean;
};

export default DropDown;
