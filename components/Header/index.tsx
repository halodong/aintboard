import { useRouter } from "next/router";
import { useWindowSize } from "react-use";
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
import * as Styles from "./styled";
import Tent from "assets/img/Tent";
import PlayingBoardGameImg from "assets/img/PlayingBoardGame";
import TreesGroup1 from "assets/img/TreesGroup1";
import TreesGroup2 from "assets/img/TreesGroup2";

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
  REVIEWS_PAGE,
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
  isStaticPage = false,
  isSearchPage = false,
  isChallengesPage = false,
  tagline,
  centerTagline,
  isBoardGamePage = false,
  isEditorPage = false,
  isErrorPage = false,
  isOnlineBattles = false,
  isBuyAvatarsPage = false,
  isReviewsPage = false,
  isReviewArticlePage = false,
  isUserPage = false,
  isSettingsPage = false,
  isOnlineBattlePage = false,
  children,
}: Props) {
  const router = useRouter();
  const { name } = router.query;
  const dispatch = useDispatch();
  const { width: windowWidth } = useWindowSize();

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

  return (
    <HeaderWrapper
      homepage={homepage}
      isStaticPage={isStaticPage}
      isSearchPage={isSearchPage}
      isChallengePage={isChallengesPage}
      isBoardGamePage={isBoardGamePage}
      isEditorPage={isEditorPage}
      isErrorPage={isErrorPage}
      isBuyAvatarsPage={isBuyAvatarsPage}
      isReviewsPage={isReviewsPage}
      isOnlineBattles={isOnlineBattles}
      isReviewArticlePage={isReviewArticlePage}
      isUserPage={isUserPage}
      isSettingsPage={isSettingsPage}
      isOnlineBattlePage={isOnlineBattlePage}
    >
      <Navbar />

      {/* <Searchbar /> obsolete for now */}

      {(isUserPage || isSettingsPage || isStaticPage) && (
        <CenterTagline isUserPage>{children}</CenterTagline>
      )}

      {(homepage || isBoardGamePage || isUserPage || isSettingsPage) && (
        <div className="homepage-bg-container">
          <TreesGroup1 className="trees-1" />
          <TreesGroup2 className="trees-2" />
          <Tent className="tent" />
          <PlayingBoardGameImg className="playing-icon" />
          <div className="ground"></div>
        </div>
      )}

      {!isStaticPage && (
        <Tagline homepage={homepage}>
          {tagline ? (
            tagline
          ) : (
            <>
              Interactive Boardgame <br /> Community{" "}
            </>
          )}
        </Tagline>
      )}

      {isBuyAvatarsPage && <CenterTagline>{centerTagline}</CenterTagline>}

      {((homepage && !isStaticPage) || (isStaticPage && windowWidth > 600)) && (
        <Styles.HomepageSubHeading>
          Be a part of the best boardgame community. <br /> Make reviews and
          strategies. Join challenges and online battles.
        </Styles.HomepageSubHeading>
      )}

      {isSearchPage && <LookingForText>Looking for "{name}"</LookingForText>}

      {(isChallengesPage ||
        isOnlineBattles ||
        isBuyAvatarsPage ||
        isReviewArticlePage ||
        isOnlineBattlePage) && <Tent className="tent" />}

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
          <Filter type={REVIEWS_PAGE} />
        </>
      )}

      {isBoardGamePage && <BoardGameName>{children}</BoardGameName>}
      {isReviewArticlePage && <Rubik>{children}</Rubik>}
      {isOnlineBattlePage && <Rubik>{children}</Rubik>}

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
  isStaticPage?: boolean;
  isSearchPage?: boolean;
  isChallengesPage?: boolean;
  tagline?: string;
  centerTagline?: string;
  isBoardGamePage?: boolean;
  isEditorPage?: boolean;
  isErrorPage?: boolean;
  isOnlineBattles?: boolean;
  isBuyAvatarsPage?: boolean;
  isReviewsPage?: boolean;
  isReviewArticlePage?: boolean;
  isUserPage?: boolean;
  isSettingsPage?: boolean;
  isOnlineBattlePage?: boolean;
  children?: any;
};
