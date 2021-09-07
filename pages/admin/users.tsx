import Seo from "components/Common/Seo";
import AdminUsers from "~/components/Admin/AdminUsers";

const Users = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Admin"
        description="Admin"
        noIndex="noindex"
        noFollow="nofollow"
      />
      <AdminUsers />;
    </>
  );
};

export default Users;
