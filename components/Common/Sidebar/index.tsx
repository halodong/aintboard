import useSWR from "swr";
import Link from "next/link";
import cookie from "js-cookie";
import Router from "next/router";
import { useEffect } from "react";

import {
  SidebarContainer,
  OverlaySidebar,
  UserSidebar,
  UlSidebar,
  SecondaryLinkSidebar,
  LogoutButton,
  TertiaryLinkSidebar,
  FooterSidebar,
  Copyright,
  PowerUps,
} from "./styled";
import {
  SIDEBAR_COMPONENT,
  MAKE_REVIEW_BUTTON,
  CREATE_CHALLENGE_BUTTON,
  CREATE_ONLINE_BATTLE_BUTTON,
} from "util/constants";
import useCurrentUser from "~/hooks/useCurrentUser";
import { UserApiResponse } from "~/types/types";
import fetcher from "~/util/fetch";

import Avatar from "components/Avatar";
import PrimaryLinkSidebar from "components/Common/PrimaryLinkSidebar";

import StarIcon from "~/assets/img/Star";
import GoldIcon from "~/assets/img/Gold";
import BronzeIcon from "~/assets/img/Bronze";
import SilverIcon from "~/assets/img/Silver";

const Sidebar = ({ menuOpen, closeMenu }: Props) => {
  const user = useCurrentUser();
  const userData = user?.userData ? JSON.parse(user?.userData) : {};

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [menuOpen]);

  const { data: userApiData } = useSWR<UserApiResponse>(
    userData?._id ? `/api/user/filter/_id/${userData?._id}` : null,
    fetcher
  );

  const userObj = userApiData?.response?.data?.users?.[0];

  return (
    <>
      <SidebarContainer menuOpen={menuOpen}>
        <UserSidebar>
          <Link href={`/user/${userData?.username}`}>
            <a>
              <Avatar
                iconType={userObj?.avatar || ""}
                from={SIDEBAR_COMPONENT}
              />
              <h4>{userData?.username || ""}</h4>
            </a>
          </Link>
        </UserSidebar>

        <UlSidebar>
          <PrimaryLinkSidebar
            buttonName="Reviews"
            links={[
              {
                key: "see-reviews",
                linkHref: "/reviews",
                linkName: "See Reviews",
              },
              {
                key: "make-review",
                button: false,
                type: MAKE_REVIEW_BUTTON,
                linkHref: "/review/new",
                linkName: "Make a Review or Strategy",
              },
            ]}
          />
          <PrimaryLinkSidebar
            buttonName="Challenges"
            links={[
              {
                key: "see-challenges",
                linkHref: "/challenges",
                linkName: "See Challenges",
              },
              {
                key: "create-challenge",
                button: true,
                type: CREATE_CHALLENGE_BUTTON,
                linkHref: "/",
                linkName: "Create a Challenge",
              },
            ]}
          />
          <PrimaryLinkSidebar
            buttonName="Online Battles"
            links={[
              {
                key: "see-ob",
                linkHref: "/online-battles",
                linkName: "See Online Battles",
              },
              {
                key: "create-ob",
                button: true,
                type: CREATE_ONLINE_BATTLE_BUTTON,
                linkHref: "/",
                linkName: "Create an Online Battle",
              },
            ]}
          />
          <PrimaryLinkSidebar buttonName="Buy Avatars" link="/buy/avatars/" />
          {/* <PrimaryLinkSidebar buttonName="Settings" link="/user/settings/" /> */}
        </UlSidebar>

        <UlSidebar>
          <SecondaryLinkSidebar>
            {userObj?.powerups || 0} <PowerUps>UP</PowerUps>
          </SecondaryLinkSidebar>
          <SecondaryLinkSidebar>
            {userObj?.stars || 0} <StarIcon className="icon" />
          </SecondaryLinkSidebar>
          <SecondaryLinkSidebar>
            0 <GoldIcon className="icon" />
          </SecondaryLinkSidebar>
          <SecondaryLinkSidebar>
            0 <SilverIcon className="icon" />
          </SecondaryLinkSidebar>
          <SecondaryLinkSidebar>
            0 <BronzeIcon className="icon" />
          </SecondaryLinkSidebar>
          <LogoutButton
            onClick={() => {
              cookie.remove("access_token");
              cookie.remove("user_data");
              Router.push("/");
              closeMenu();
            }}
          >
            Logout
          </LogoutButton>
        </UlSidebar>

        <FooterSidebar>
          <UlSidebar>
            <TertiaryLinkSidebar>
              <Link href="/about">About Us</Link>
            </TertiaryLinkSidebar>
            <TertiaryLinkSidebar>
              <Link href="/faqs">FAQs</Link>
            </TertiaryLinkSidebar>
            <TertiaryLinkSidebar>
              <Link href="/">Contact Us</Link>
            </TertiaryLinkSidebar>
            <Copyright>Copyright &copy; {new Date().getFullYear()}</Copyright>
          </UlSidebar>
        </FooterSidebar>
      </SidebarContainer>
      <OverlaySidebar menuOpen={menuOpen} onClick={closeMenu} />
    </>
  );
};

type Props = {
  menuOpen: boolean;
  closeMenu: () => void;
};

export default Sidebar;
