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
import { SIDEBAR_COMPONENT } from "util/constants";

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
                linkHref: "/",
                linkName: "See Reviews",
              },
              {
                linkHref: "/",
                linkName: "Make a Review or Strategy",
              },
            ]}
          />
          <PrimaryLinkSidebar
            buttonName="Challenges"
            links={[
              {
                linkHref: "/",
                linkName: "See Challenges",
              },
              {
                linkHref: "/",
                linkName: "Create a Challenge",
              },
            ]}
          />
          <PrimaryLinkSidebar
            buttonName="Online Battles"
            links={[
              {
                linkHref: "/",
                linkName: "See Online Battles",
              },
              {
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
            margintop="3rem"
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
