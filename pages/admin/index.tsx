import Seo from "components/Common/Seo";
import AdminPage from "../../components/Admin/AdminPage";

const Admin = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Admin"
        description="Admin"
        noIndex="noindex"
        noFollow="nofollow"
      />
      <AdminPage />
    </>
  );
};

export default Admin;
