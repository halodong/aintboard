import useSWR from "swr";

import Header from "~/components/Header";
import Avatar from "~/components/Avatar";
import Seo from "~/components/Common/Seo";
import Footer from "~/components/Common/Footer";
import SettingsPage from "~/components/SettingsPage";

import fetcher from "util/fetch";
import useCurrentUser from "hooks/useCurrentUser";
import { UserApiResponse } from "~/types/types";

const Settings = () => {
  const user = useCurrentUser();
  const userData = user?.userData ? JSON.parse(user?.userData) : {};

  const { data: userApiData } = useSWR<UserApiResponse>(
    userData?._id ? `/api/user/filter/_id/${userData?._id}` : null,
    fetcher
  );

  if (typeof window === "undefined") {
    return <></>;
  }

  const userObj = userApiData?.response?.data?.users?.[0];

  return (
    <>
      <Seo
        isHomepage={false}
        title={`${userObj?.username} Profile Page`}
        description={`${userObj?.username} Profile Page`}
        canonical={`/user/settings`}
      />
      <Header isSettingsPage>
        {userObj?.username} Settings
        <Avatar iconType={userObj?.avatar || ""} />
      </Header>
      <SettingsPage />
      <Footer />
    </>
  );
};

export default Settings;
