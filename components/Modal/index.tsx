import Modal from "react-modal";
import { ModalHeader, ModalContent } from "./styled";
import CloseIcon from "~/assets/img/close.svg";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999999,
    padding: 0,
    border: 0,
    background: "none",
    borderRadius: 10,
    minWidth: "30rem",
  },
  overlay: {
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    zIndex: 1000,
  },
};

const ModalComponent = ({
  children,
  isOpen,
  closeModal,
  headerLabel = "Ain't Board",
}: Props) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={500}
      shouldCloseOnOverlayClick={false}
      htmlOpenClassName="ReactModal__Html--open"
    >
      <ModalHeader>
        <h3>{headerLabel}</h3>
        <CloseIcon onClick={closeModal} className="close-icon" />
      </ModalHeader>
      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  closeModal: () => void;
  headerLabel: string;
};

export default ModalComponent;
