import React from "react";
import * as Styles from "./styles";

import PrimaryLinkSidebar from "components/Common/PrimaryLinkSidebar";

import Link from "next/link";

import LogoGray from "~/assets/img/LogoGray";

const AdminSidebar = () => {
  return (
    <Styles.AdminSidebar>
      <Styles.AdminHeader>
        <Link href="/">
          <Styles.LogoContainer>
            <LogoGray />
          </Styles.LogoContainer>
        </Link>
        <h2>Admin</h2>
      </Styles.AdminHeader>

      <Styles.SidebarContent>
        <PrimaryLinkSidebar
          buttonName="Users"
          links={[
            {
              key: "Manage Users",
              linkHref: "/admin/users",
              linkName: "Manage Users",
            },
            {
              key: "Create a User",
              linkHref: "/",
              linkName: "Create a User",
            },
          ]}
        />

        <PrimaryLinkSidebar
          buttonName="Challenges"
          links={[
            {
              key: "Manage Challenges",
              linkHref: "/admin/challenges",
              linkName: "Manage Challenges",
            },
            {
              key: "Approve Challenges",
              linkHref: "/",
              linkName: "Approve Challenges",
            },
          ]}
        />

        <PrimaryLinkSidebar
          buttonName="Reviews"
          links={[
            {
              key: "Manage Reviews",
              linkHref: "/admin/reviews",
              linkName: "Manage Reviews",
            },
            {
              key: "Approve Reviews",
              linkHref: "/",
              linkName: "Approve Reviews",
            },
          ]}
        />

        <PrimaryLinkSidebar
          buttonName="Online Battles"
          links={[
            {
              key: "Manage Online Battles",
              linkHref: "/admin/online-battles",
              linkName: "Manage Online Battles",
            },
            {
              key: "Approve Online Battles",
              linkHref: "/",
              linkName: "Approve Online Battles",
            },
            {
              key: "Online Battles Awarding",
              linkHref: "/",
              linkName: "Online Battles Awarding",
            },
          ]}
        />
      </Styles.SidebarContent>
    </Styles.AdminSidebar>
  );
};

export default AdminSidebar;
