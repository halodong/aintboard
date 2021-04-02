import { useRouter } from "next/router";

import {
  HeaderWrapper,
  Tagline,
  LookingForText,
  GameFont,
  ChallengesTagline,
} from "./styled";
import { TreesGroup1, TreesGroup2, Tent } from "~/assets/img";

import Filter from "~/components/Filter";
import Navbar from "~/components/Navbar";
import Searchbar from "~/components/Searchbar";

export default function Header({
  homepage,
  isSearchPage = false,
  isChallengesPage = false,
  tagline,
}: Props) {
  const router = useRouter();
  const { name } = router.query;

  return (
    <HeaderWrapper
      isSearchPage={isSearchPage}
      isChallengePage={isChallengesPage}
    >
      <Navbar />

      <Searchbar />

      {homepage && (
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
            {" "}
            Interactive Boardgame <br /> Community{" "}
          </>
        )}
      </Tagline>

      {isSearchPage && <LookingForText>Looking for "{name}"</LookingForText>}

      {isChallengesPage && <Tent className="tent" />}

      {isChallengesPage && <GameFont>CHALLENGES</GameFont>}
      {isChallengesPage && (
        <ChallengesTagline>
          Achieve challenges to get PowerUps!
        </ChallengesTagline>
      )}

      {isChallengesPage && <Filter />}
    </HeaderWrapper>
  );
}

type Props = {
  homepage?: boolean;
  isSearchPage?: boolean;
  isChallengesPage?: boolean;
  tagline?: string;
};
