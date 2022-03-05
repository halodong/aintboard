import Link from "next/link";

import Button from "components/Common/Button";
import ChallengesCard from "components/Challenges/ChallengesCard";
// import OnlineBattleCard from "~/components/OnlineBattleCard";
import { ReviewCard } from "components/Reviews/ReviewCard";

import {
  ChallengesApiResponse,
  ReviewApiResponse,
  UserChallengesApiResponse,
} from "~/types/types";

import * as Styles from "./../styled";

const RightSideDetails = ({ reviews, challenges, userChallenges }: Props) => {
  return (
    <Styles.RightSide>
      <Styles.ReviewsSection>
        <Styles.H1Rubik>REVIEWS</Styles.H1Rubik>
        <Styles.ReviewsCardWrapper>
          {reviews && reviews?.response?.data?.reviews.length > 0 ? (
            reviews?.response?.data?.reviews?.map((r) => (
              <ReviewCard key={r._id} data={r} />
            ))
          ) : (
            <Styles.NoReviews>User has no Reviews yet</Styles.NoReviews>
          )}
        </Styles.ReviewsCardWrapper>
      </Styles.ReviewsSection>

      <Styles.ChallengesSection>
        <Styles.H1GameFont>CHALLENGES</Styles.H1GameFont>
        <Styles.ChallengesCardWrapper>
          {challenges && challenges?.response?.data?.challenges?.length > 0 ? (
            <>
              <ChallengesCard
                key={challenges?.response?.data?.challenges[0]?._id}
                data={challenges?.response?.data?.challenges[0]}
              />
              {challenges?.response?.data?.challenges
                ?.filter(
                  (c) =>
                    c._id ===
                    userChallenges?.response?.data?.challenge[0]?.challengeId
                )
                .map((c) => (
                  <ChallengesCard key={c._id} data={c} achieved />
                ))}
            </>
          ) : (
            <Styles.NoReviews>User has no Challenges yet</Styles.NoReviews>
          )}
        </Styles.ChallengesCardWrapper>
        <Link href="/challenges">
          <a href="/challenges">
            <Button bg="white">See more Challenges</Button>
          </a>
        </Link>
      </Styles.ChallengesSection>

      <Styles.OnlineBattlesSection>
        <Styles.H1GameFont>ONLINE BATTLES</Styles.H1GameFont>
        <Styles.OnlineBattleCardWrapper>
          {/* <OnlineBattleCard /> */}
        </Styles.OnlineBattleCardWrapper>
        <Link href="/online-battles">
          <a href="/online-battles">
            <Button bg="white" onClick={() => {}}>
              See more Online Battles
            </Button>
          </a>
        </Link>
      </Styles.OnlineBattlesSection>
    </Styles.RightSide>
  );
};

type Props = {
  reviews?: ReviewApiResponse;
  challenges?: ChallengesApiResponse;
  userChallenges?: UserChallengesApiResponse;
};

export default RightSideDetails;
