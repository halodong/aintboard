import { useState, useRef } from "react";
import {
  DropDownWrapper,
  DropDownMenu,
  Select,
  OptionContainer,
  Option,
} from "./styled";

import DownArrow from "~/assets/img/downarrow.svg";

import useOutsideClick from "./useOutsideClick";

const DropDown = ({ placeHolder, isName = false }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeHolder);
  const toggle = () => setIsOpen(!isOpen);

  const dropdownRef = useRef(null);

  useOutsideClick(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const handleSelect = (e: any) => {
    setSelectedValue(e.currentTarget.innerText);
    setIsOpen(false);
  };

  const options = [
    "chess1",
    "chess2",
    "chess3",
    "chess4",
    "chess1",
    "chess2",
    "chess3",
    "chess4",
    "chess1",
    "chess2",
    "chess3",
    "chess4",
    "chess1",
    "chess2",
    "chess3",
    "chess4",
    "chess1",
    "chess2",
    "chess3",
    "chess4",
    "chess1",
    "chess2",
    "chess3",
    "chess4",
    "chess1",
    "chess2",
    "chess3",
    "chess4",
    "chess1",
    "chess2",
    "chess3",
    "chess4",
    "chess1",
    "chess2",
    "chess3",
    "chess4",
    "chess1",
    "chess2",
    "chess3",
    "chess4",
  ];

  return (
    <DropDownWrapper isName={isName}>
      <DropDownMenu onClick={toggle}>
        <Select>{selectedValue}</Select>
        <DownArrow />
      </DropDownMenu>

      {isOpen && (
        <OptionContainer ref={dropdownRef}>
          {options.map((option) => (
            <Option onClick={(e) => handleSelect(e)}>{option}</Option>
          ))}
        </OptionContainer>
      )}
    </DropDownWrapper>
  );
};

type Props = {
  placeHolder?: string;
  isName?: boolean;
};

export default DropDown;
