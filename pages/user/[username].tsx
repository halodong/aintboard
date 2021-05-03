import Header from "~/components/Header";
import Avatar from "~/components/Avatar";
import Seo from "~/components/Common/Seo";
import UserProfilePage from "~/components/UserProfilePage";

import fetcher from "~/util/fetch";
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
  if (typeof window === "undefined") {
    return <></>;
  }
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

  const userData: UserApiResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/user/filter/username/${username}?first=1`
  );

  const challengeData: ChallengesApiResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/challenge/filter/createdBy/${userData.response.data.users[0]._id}`
  );

  const reviewData: ReviewApiResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/review/filter/userId/${userData.response.data.users[0]._id}?first=4`
  );

  const userChallengeData: UserChallangesApiResponse = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/userChallenges/filter/userId/${userData.response.data.users[0]._id}?first=1`
  );

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
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?first=2`
  );

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
