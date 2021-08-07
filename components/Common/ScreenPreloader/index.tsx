import { useSelector } from "react-redux";

import { ModalState } from "types/reduxTypes";
import * as Styles from "./styled";

const ScreenPreloader = () => {
  const showPreloader = useSelector(
    (state: ModalState) => state.modal.preloader
  );
  return (
    <Styles.Preloader show={showPreloader}>
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Styles.Preloader>
  );
};

export default ScreenPreloader;
