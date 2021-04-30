import Link from "next/link";
import LogoGray from "~/assets/img/LogoGray";

import * as Styles from "./styles";
import PrimaryLinkSidebar from "components/Common/PrimaryLinkSidebar";

const AdminDashboard = () => {
  return (
    <Styles.AdminPageWrapper>
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
                linkHref: "/",
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
                linkHref: "/",
                linkName: "Manage Users",
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
                linkHref: "/",
                linkName: "Manage Users",
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
                linkHref: "/",
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

      <Styles.AdminCards>
        <Styles.AdminCard>
          <h3>Users</h3>
          <p>10 guests</p>
          <p>10 community managers</p>
        </Styles.AdminCard>

        <Styles.AdminCard>
          <h3>Challenges</h3>
          <p>10 guests</p>
          <p>10 community managers</p>
        </Styles.AdminCard>

        <Styles.AdminCard>
          <h3>Reviews</h3>
          <p>10 guests</p>
          <p>10 community managers</p>
        </Styles.AdminCard>

        <Styles.AdminCard>
          <h3>Online Battles</h3>
          <p>10 guests</p>
          <p>10 community managers</p>
        </Styles.AdminCard>
      </Styles.AdminCards>
    </Styles.AdminPageWrapper>
  );
};

export default AdminDashboard;
