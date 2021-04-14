import fetcher from "~/util/fetch";
import Header from "~/components/Header";
import Avatar from "~/components/Avatar";
import UserProfilePage from "~/components/UserProfilePage";

import { UserData, UserApiResponse } from "~/types/types";
import { FALLBACK } from "util/constants";

const Page = ({ userData }: Props) => {
  if (typeof window === "undefined") {
    return <></>;
  }
  const user = userData?.response?.data?.users[0];

  return (
    <div>
      <Header isBoardGamePage>
        {user?.username}
        <Avatar iconType={user?.avatar || ""} />
      </Header>

      <UserProfilePage reviews={{}} />
    </div>
  );
};

type Props = {
  userData: UserApiResponse;
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

  if (userData?.response?.data?.users?.length < 1) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userData,
    },
  };
}

export async function getStaticPaths() {
  const response = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?first=2`
  );

  const pathsData =
    response?.success &&
    response.response.data.users &&
    response.response.data.users.map((user: UserData) => {
      return { params: { username: user?.username } };
    });

  return {
    paths: pathsData || [],
    fallback: FALLBACK,
  };
}
