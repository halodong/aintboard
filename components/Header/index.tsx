import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import {
  HeaderWrapper,
  Tagline,
  LookingForText,
  GameFont,
  ChallengesTagline,
  BattlesTagline,
  BoardGameName,
  CenterTagline,
  CenterButtonContainer,
  Rubik,
} from "./styled";
import { TreesGroup1, TreesGroup2, Tent } from "~/assets/img";

import Navbar from "~/components/Navbar";
import Modal from "~/components/Common/Modal";
import Filter from "~/components/Common/Filter";
import Button from "~/components/Common/Button";
// import Searchbar from "~/components/Searchbar"; obsolete for now
import OnlineBattleForm from "~/components/OnlineBattle/OnlineBattleForm";
import CreateChallengeForm from "~/components/Challenges/CreateChallengeForm";

import { chooseModal, setPopup } from "redux/slices/modalSlice";
import {
  CHALLENGES_PAGE,
  ONLINE_BATTLES,
  CREATE_CHALLENGE_BUTTON,
  CREATE_ONLINE_BATTLE_BUTTON,
} from "util/constants";
import { ModalState } from "types/reduxTypes";

const modalCta = [
  {
    id: 1,
    name: "Create a Challenge",
    type: CREATE_CHALLENGE_BUTTON,
  },
  {
    id: 2,
    name: "Create an Online Battle",
    type: CREATE_ONLINE_BATTLE_BUTTON,
  },
];

export default function Header({
  homepage,
  isSearchPage = false,
  isChallengesPage = false,
  tagline,
  centerTagline,
  isBoardGamePage = false,
  isEditorPage = false,
  isOnlineBattles = false,
  isBuyAvatarsPage = false,
  isReviewsPage = false,
  isReviewArticlePage = false,
  children,
}: Props) {
  const router = useRouter();
  const { name } = router.query;
  const dispatch = useDispatch();

  const modalClicked = useSelector(
    (state: ModalState) => state.modal.modalChosen
  );

  const popupTriggered = useSelector((state: ModalState) => state.modal.popup);

  const closeModal = () => {
    // @TODO dispatch this with setTimeout to have a fadeout of modal
    dispatch(chooseModal(""));
  };

  const closePopup = () => {
    dispatch(
      setPopup({
        open: false,
        header: "",
        content: "",
      })
    );
  };

  const getModalHeaderLabel = () => {
    switch (modalClicked) {
      case CREATE_CHALLENGE_BUTTON:
        return modalCta[0].name;
      case CREATE_ONLINE_BATTLE_BUTTON:
        return modalCta[1].name;
      default:
        return "";
    }
  };

  return (
    <HeaderWrapper
      homepage={homepage}
      isSearchPage={isSearchPage}
      isChallengePage={isChallengesPage}
      isBoardGamePage={isBoardGamePage}
      isEditorPage={isEditorPage}
      isBuyAvatarsPage={isBuyAvatarsPage}
      isReviewsPage={isReviewsPage}
      isOnlineBattles={isOnlineBattles}
      isReviewArticlePage={isReviewArticlePage}
    >
      <Navbar />

      {/* <Searchbar /> obsolete for now */}

      {(homepage || isBoardGamePage) && (
        <div className="homepage-bg-container">
          <TreesGroup1 className="trees-1" />
          <TreesGroup2 className="trees-2" />
          <Tent className="tent" />
          <div className="ground"></div>
        </div>
      )}

      <Tagline homepage={homepage}>
        {tagline ? (
          tagline
        ) : (
          <>
            Interactive Boardgame <br /> Community{" "}
          </>
        )}
      </Tagline>

      {isBuyAvatarsPage && <CenterTagline>{centerTagline}</CenterTagline>}

      {isSearchPage && <LookingForText>Looking for "{name}"</LookingForText>}

      {(isChallengesPage ||
        isOnlineBattles ||
        isBuyAvatarsPage ||
        isReviewArticlePage) && <Tent className="tent" />}

      {isChallengesPage && (
        <>
          <Tent className="tent" />
          <GameFont>CHALLENGES</GameFont>\
          <ChallengesTagline>
            Achieve challenges to get PowerUps!
          </ChallengesTagline>
          <Filter type={CHALLENGES_PAGE} />
        </>
      )}

      {isOnlineBattles && (
        <>
          <GameFont>ONLINE BATTLES</GameFont>
          <BattlesTagline>
            Get to the top of the leaderboards to get trophies!
          </BattlesTagline>
          <Filter type={ONLINE_BATTLES} />
        </>
      )}

      {isReviewsPage && (
        <>
          <Tent className="tent" />
          <Rubik>REVIEWS</Rubik>
          <Filter type={CHALLENGES_PAGE} />
        </>
      )}

      {isBoardGamePage && <BoardGameName>{children}</BoardGameName>}

      {modalCta.map((mdl) => (
        <Modal
          key={`${mdl.type}-${mdl.id}`}
          isOpen={modalClicked !== "" && modalClicked === mdl.type}
          closeModal={closeModal}
          headerLabel={
            modalCta.filter((m) => m.type === modalClicked)?.[0]?.name || ""
          }
          closeTimeoutMS={0}
          maxwidth="35rem"
        >
          {(() => {
            switch (modalClicked) {
              case CREATE_CHALLENGE_BUTTON:
                return <CreateChallengeForm closeModal={closeModal} />;
              case CREATE_ONLINE_BATTLE_BUTTON:
                return <OnlineBattleForm closeModal={closeModal} />;
              default:
                return null;
            }
          })()}
        </Modal>
      ))}

      <Modal
        isOpen={popupTriggered?.open}
        closeModal={closePopup}
        headerLabel={popupTriggered?.header}
        closeTimeoutMS={0}
        maxwidth="35rem"
      >
        {popupTriggered?.content}

        <CenterButtonContainer>
          <Button onClick={closePopup} bg="lightYellow">
            OK
          </Button>
        </CenterButtonContainer>
      </Modal>
    </HeaderWrapper>
  );
}

type Props = {
  homepage?: boolean;
  isSearchPage?: boolean;
  isChallengesPage?: boolean;
  tagline?: string;
  centerTagline?: string;
  isBoardGamePage?: boolean;
  isEditorPage?: boolean;
  isOnlineBattles?: boolean;
  isBuyAvatarsPage?: boolean;
  isReviewsPage?: boolean;
  isReviewArticlePage?: boolean;
  children?: any;
};
