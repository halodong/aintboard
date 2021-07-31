import Seo from "components/Common/Seo";
import AdminChallenges from "components/Admin/AdminChallenges";

const Challenges = () => {
  return (
    <>
      <Seo
        isHomepage={false}
        title="Admin"
        description="Admin"
        noIndex="noindex"
        noFollow="nofollow"
      />
      <AdminChallenges />
    </>
  );
};

export default Challenges;
