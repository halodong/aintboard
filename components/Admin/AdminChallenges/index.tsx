import useSWR, { mutate } from "swr";
import axios from "axios";

import * as Styles from "./styles";
import AdminSidebar from "~/components/Admin/AdminSidebar";
import Button from "~/components/Common/Button";
import { ChallengesApiResponse } from "~/types/types";
import { CHALLENGE_STATUS } from "~/util/constants";
import fetcher from "~/util/fetch";

const AdminChallenges = () => {
  const { data: challengesData } = useSWR<ChallengesApiResponse>(
    `/api/challenges`,
    fetcher
  );

  const challengeData = challengesData?.response?.data?.challenges || [];

  const challengeStatus = async (id: string, status: string | undefined) => {
    await axios.patch(`/api/challenge/status/${id}/${status}`);

    mutate(`/api/challenges`);
  };

  const deleteChallenge = async (id: string) => {
    await axios.delete(`/api/challenge/delete/${id}`);

    mutate(`/api/challenges`);
  };

  const ChallengeStatusBtn = [
    { id: 1, name: "Approve", bg: "white", status: CHALLENGE_STATUS.APPROVED },
    { id: 2, name: "Reject", bg: "white", status: CHALLENGE_STATUS.REJECTED },
  ];

  return (
    <Styles.AdminChallengesWrapper>
      <AdminSidebar />
      <Styles.AdminChallengesContainer>
        <Styles.AdminTitle>Challenges</Styles.AdminTitle>
        {challengeData.map((c) => (
          <Styles.ChallengeContainer key={c._id}>
            <Styles.ChallengeImage>
              <img src={`${c.bgImage}`} alt="Challenge" />
            </Styles.ChallengeImage>
            <Styles.ChallengeContent>
              <Styles.ChallengeTitle>{c.challengeName}</Styles.ChallengeTitle>
            </Styles.ChallengeContent>
            <Styles.ChallengeCTA>
              {c.status === CHALLENGE_STATUS.PENDING &&
                ChallengeStatusBtn.map((btn) => (
                  <Button
                    key={btn.id}
                    bg={btn.bg}
                    onClick={() => {
                      challengeStatus(c._id, btn.status);
                    }}
                  >
                    {btn.name}
                  </Button>
                ))}

              {c.status === CHALLENGE_STATUS.APPROVED && (
                <Button bg="white">Approved</Button>
              )}
              {c.status === CHALLENGE_STATUS.REJECTED && (
                <Button bg="white">Rejected</Button>
              )}

              <Button
                className="delete"
                bg="errorRed"
                onClick={() => {
                  deleteChallenge(c._id);
                }}
              >
                Delete
              </Button>
            </Styles.ChallengeCTA>
          </Styles.ChallengeContainer>
        ))}
      </Styles.AdminChallengesContainer>
    </Styles.AdminChallengesWrapper>
  );
};

export default AdminChallenges;
