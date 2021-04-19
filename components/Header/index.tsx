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
} from "./styled";
import { TreesGroup1, TreesGroup2, Tent } from "~/assets/img";

import Filter from "~/components/Common/Filter";
import Navbar from "~/components/Navbar";
// import Searchbar from "~/components/Searchbar"; obsolete for now
import Modal from "~/components/Common/Modal";
import CreateChallengeForm from "~/components/Challenges/CreateChallengeForm";

import { chooseModal } from "redux/slices/modalSlice";
import {
  CHALLENGES_PAGE,
  CREATE_CHALLENGE_BUTTON,
  ONLINE_BATTLES,
} from "util/constants";
import { ModalState } from "types/types";

const modalCta = [
  {
    id: 1,
    name: "Create a Challenge",
    type: CREATE_CHALLENGE_BUTTON,
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
  children,
}: Props) {
  const router = useRouter();
  const { name } = router.query;
  const dispatch = useDispatch();

  const modalClicked = useSelector(
    (state: ModalState) => state.modal.modalChosen
  );

  const closeModal = () => {
    // @TODO dispatch this with setTimeout to have a fadeout of modal
    dispatch(chooseModal(""));
  };

  return (
    <HeaderWrapper
      homepage={homepage}
      isSearchPage={isSearchPage}
      isChallengePage={isChallengesPage}
      isBoardGamePage={isBoardGamePage}
      isEditorPage={isEditorPage}
      isBuyAvatarsPage={isBuyAvatarsPage}
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

      {(isChallengesPage || isOnlineBattles || isBuyAvatarsPage) && (
        <Tent className="tent" />
      )}

      {isChallengesPage && (
        <>
          <GameFont>CHALLENGES</GameFont>
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

      {isBoardGamePage && <BoardGameName>{children}</BoardGameName>}

      {modalCta.map((mdl) => (
        <Modal
          key={`${mdl.type}-${mdl.id}`}
          isOpen={modalClicked !== ""}
          closeModal={closeModal}
          headerLabel={mdl.name}
          closeTimeoutMS={0}
          maxwidth="35rem"
        >
          {(() => {
            switch (modalClicked) {
              case CREATE_CHALLENGE_BUTTON:
                return <CreateChallengeForm closeModal={closeModal} />;
              default:
                return null;
            }
          })()}
        </Modal>
      ))}
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
  children?: any;
};
