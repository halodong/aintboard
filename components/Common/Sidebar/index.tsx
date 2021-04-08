import Link from "next/link";

import {
  SidebarContainer,
  OverlaySidebar,
  UserSidebar,
  UlSidebar,
  PrimaryLinkSidebar,
  SecondaryLinkSidebar,
  LogoutButton,
  TertiaryLinkSidebar,
  FooterSidebar,
  Copyright,
} from "./styled";
import useCurrentUser from "~/hooks/useCurrentUser";
import { SIDEBAR_COMPONENT } from "util/constants";

import Avatar from "components/Avatar";

import cookie from "js-cookie";
import Router from "next/router";

const Sidebar = ({ menuOpen, closeMenu }: Props) => {
  const user = useCurrentUser();
  const userData = user?.userData ? JSON.parse(user?.userData) : {};

  return (
    <>
      <SidebarContainer menuOpen={menuOpen}>
        <UserSidebar>
          <Avatar iconType={userData?.avatar} from={SIDEBAR_COMPONENT} />
          <h4>{userData?.username || ""}</h4>
        </UserSidebar>

        <UlSidebar>
          <PrimaryLinkSidebar>
            <Link href="/">Reviews</Link>
          </PrimaryLinkSidebar>
          <PrimaryLinkSidebar>
            <Link href="/">Challenges</Link>
          </PrimaryLinkSidebar>
          <PrimaryLinkSidebar>
            <Link href="/">Online Battles</Link>
          </PrimaryLinkSidebar>
          <PrimaryLinkSidebar>
            <Link href="/">Game Nights</Link>
          </PrimaryLinkSidebar>
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
