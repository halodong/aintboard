import Seo from "components/Common/Seo";
import AdminDashboard from "~/components/Admin/AdminDashboard";

const Dashboard = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Admin"
        description="Admin"
        noIndex="noindex"
        noFollow="nofollow"
      />
      <AdminDashboard />;
    </>
  );
};

export default Dashboard;
