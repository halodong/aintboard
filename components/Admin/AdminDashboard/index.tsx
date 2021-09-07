import * as Styles from "./styles";
import AdminSidebar from "~/components/Admin/AdminSidebar";

const AdminDashboard = () => {
  return (
    <Styles.AdminPageWrapper>
      <AdminSidebar />
      <Styles.AdminCards>
        <Styles.AdminCard>
          <h3>Users</h3>
          <p>10 guests</p>
          <p>10 community managers</p>
        </Styles.AdminCard>

        <Styles.AdminCard>
          <h3>Challenges</h3>
          <p>Made by</p>
          <p>10 guests</p>
          <p>10 community managers</p>
        </Styles.AdminCard>

        <Styles.AdminCard>
          <h3>Reviews</h3>
          <p>Made by</p>
          <p>10 guests</p>
          <p>10 community managers</p>
        </Styles.AdminCard>

        <Styles.AdminCard>
          <h3>Online Battles</h3>
          <p>Made by</p>
          <p>10 guests</p>
          <p>10 community managers</p>
        </Styles.AdminCard>
      </Styles.AdminCards>
    </Styles.AdminPageWrapper>
  );
};

export default AdminDashboard;
