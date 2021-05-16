import Header from "~/components/Header";
import Avatar from "~/components/Avatar";
import Seo from "~/components/Common/Seo";
import UserProfilePage from "~/components/UserProfilePage";

import { filterUsers } from "db/user";
import { getUsers } from "db/users";
import { filterReviews } from "db/reviews";
import { filterChallenges } from "db/challenges";
import database from "middlewares/dbForFrontend";
import { filterUserChallenges } from "db/userChallenges";

import { FALLBACK } from "util/constants";
import {
  UserData,
  UserApiResponse,
  ChallengesApiResponse,
  UserChallangesApiResponse,
  ReviewApiResponse,
} from "~/types/types";

const Page = ({
  userData,
  challengeData,
  reviewData,
  userChallengeData,
}: Props) => {
  const user = userData?.response?.data?.users[0];

  return (
    <>
      <Seo
        isHomepage={false}
        title={`${user?.username} Profile Page`}
        description={`${user?.username} Profile Page`}
        canonical={`/user/${user?.username}`}
      />
      <Header isUserPage>
        {user?.username}
        <Avatar iconType={user?.avatar || ""} />
      </Header>

      <UserProfilePage
        challenges={challengeData}
        reviews={reviewData}
        userChallenges={userChallengeData}
      />
    </>
  );
};

type Props = {
  userData: UserApiResponse;
  challengeData: ChallengesApiResponse;
  reviewData: ReviewApiResponse;
  userChallengeData: UserChallangesApiResponse;
};

export default Page;

type Params = {
  params: {
    username: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { username } = params;

  const db = await database();
  const userData = await filterUsers(db, {
    filter: "username",
    field: username,
    first: 1,
  });
  const challengeData = await filterChallenges(db, {
    filter: "createdBy",
    field: userData.response.data.users[0]._id,
    first: null,
  });
  const reviewData = await filterReviews(db, {
    filter: "userId",
    field: userData.response.data.users[0]._id,
    first: 4,
  });
  const userChallengeData = await filterUserChallenges(db, {
    filter: "userId",
    field: userData.response.data.users[0]._id,
    first: 1,
  });

  if (userData?.response?.data?.users?.length < 1) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userData,
      challengeData,
      reviewData,
      userChallengeData,
    },
  };
}

export async function getStaticPaths() {
  const db = await database();
  const response = await getUsers(db, { first: 2 });

  const pathsData =
    response?.success &&
    response?.response?.data?.users &&
    response?.response?.data?.users?.map((user: UserData) => {
      return { params: { username: user?.username } };
    });

  return {
    paths: pathsData || [],
    fallback: FALLBACK,
  };
}
