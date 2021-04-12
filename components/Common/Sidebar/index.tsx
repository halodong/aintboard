import { useEffect } from "react";
import Link from "next/link";

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
} from "./styled";
import useCurrentUser from "~/hooks/useCurrentUser";
import {
  SIDEBAR_COMPONENT,
  MAKE_REVIEW_BUTTON,
  CREATE_CHALLENGE_BUTTON,
  CREATE_ONLINE_BATTLE_BUTTON,
} from "util/constants";

import Avatar from "components/Avatar";
import PrimaryLinkSidebar from "components/Common/PrimaryLinkSidebar";

import cookie from "js-cookie";
import Router from "next/router";

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

  return (
    <>
      <SidebarContainer menuOpen={menuOpen}>
        <UserSidebar>
          <Avatar iconType={userData?.avatar} from={SIDEBAR_COMPONENT} />
          <h4>{userData?.username || ""}</h4>
        </UserSidebar>

        <UlSidebar>
          <PrimaryLinkSidebar
            buttonName="Reviews"
            links={[
              {
                key: "see-reviews",
                linkHref: "/",
                linkName: "See Reviews",
              },
              {
                key: "make-review",
                button: true,
                type: MAKE_REVIEW_BUTTON,
                linkHref: "/",
                linkName: "Make a Review or Strategy",
              },
            ]}
          />
          <PrimaryLinkSidebar
            buttonName="Challenges"
            links={[
              {
                key: "see-challenges",
                linkHref: "/",
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
                linkHref: "/",
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
        </UlSidebar>

        <UlSidebar>
          <SecondaryLinkSidebar>
            {userData?.stars || 0} Stars
          </SecondaryLinkSidebar>
          <SecondaryLinkSidebar>
            {userData?.powerups || 0} PowerUps
          </SecondaryLinkSidebar>
          <SecondaryLinkSidebar>0 Gold Trophies</SecondaryLinkSidebar>
          <SecondaryLinkSidebar>0 Silver Trophies</SecondaryLinkSidebar>
          <SecondaryLinkSidebar>0 Bronze Trophies</SecondaryLinkSidebar>
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
              <Link href="/">About Us</Link>
            </TertiaryLinkSidebar>
            <TertiaryLinkSidebar>
              <Link href="/">FAQs</Link>
            </TertiaryLinkSidebar>
            <TertiaryLinkSidebar>
              <Link href="/">Contact Us</Link>
            </TertiaryLinkSidebar>
            <Copyright>Copyright &copy;2021</Copyright>
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
