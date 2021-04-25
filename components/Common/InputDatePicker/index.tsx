import { useState } from "react";

import DatePicker from "react-datepicker";

const InputDatePicker = ({ passDateToParent }: Props) => {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleChangeDate = (val: any) => {
    setDate(val);
    passDateToParent(val);
  };

  return (
    <DatePicker
      selected={date}
      onChange={(val) => handleChangeDate(val)}
      inline
    />
  );
};

type Props = {
  passDateToParent: (date: Date | null) => void;
};

export default InputDatePicker;
