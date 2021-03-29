import { DropDownContainer } from "./styled";

import Select from "react-select";

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

const DropDown = ({ placeHolder, isName = false }: Props) => {
  return (
    <DropDownContainer isName={isName}>
      <Select
        className="select"
        placeholder={placeHolder}
        isClearable={true}
        isSearchable={false}
      />
    </DropDownContainer>
  );
};

type Props = {
  placeHolder?: string;
  isName?: boolean;
};

export default DropDown;
