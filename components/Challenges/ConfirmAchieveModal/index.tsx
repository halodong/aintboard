import * as Styles from "./styled";
import Modal from "components/Common/Modal";
import Button from "components/Common/Button";

const ConfirmAchieveModal = ({
  isOpen,
  closeModal,
  powerups,
  challengeName,
  handleConfirm,
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      headerLabel="Achieve Challenge"
      closeTimeoutMS={0}
      maxwidth="35rem"
    >
      <span>{challengeName}</span> <br />
      <span>Have you achieved this challenge? &nbsp;</span>
      <span>
        You will get {powerups} <Styles.PowerUpText>UP</Styles.PowerUpText>{" "}
      </span>
      <br />
      <br />
      <Button bg="lightYellow" onClick={handleConfirm}>
        Confirm
      </Button>
    </Modal>
  );
};

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  powerups: number;
  challengeName: string;
  handleConfirm: () => void;
};

export default ConfirmAchieveModal;
