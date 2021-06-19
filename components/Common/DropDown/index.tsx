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

  const getValue = () => {
    const optionsValue = options?.filter((o) => o.value === selected);

    if (selected && selected?.length > 0 && optionsValue) {
      return selectedState || emptyDefault;
    }
  };

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
        value={getValue()}
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
