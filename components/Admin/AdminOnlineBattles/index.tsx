import * as Styles from "./styles";
import AdminSidebar from "~/components/Admin/AdminSidebar";
import Button from "~/components/Common/Button";

import useSWR, { mutate } from "swr";
import { OnlineBattlesApiResponse } from "~/types/types";
import fetcher from "~/util/fetch";
import { OB_STATUS } from "~/util/constants";
import { useRouter } from "next/router";
import axios from "axios";

const AdminOnlineBattles = () => {
  const router = useRouter();
  const { data: onlineBattlesData } = useSWR<OnlineBattlesApiResponse>(
    `/api/online-battles`,
    fetcher
  );

  const onlineBattleData =
    onlineBattlesData?.response?.data?.onlineBattles || [];

  const onlineBattleStatus = async (id: string, status: string | undefined) => {
    await axios.patch(`/api/online-battle/status/${id}/${status}`);

    mutate(`/api/online-battles`);
  };

  const deleteOnlineBattle = async (id: string) => {
    await axios.delete(`/api/online-battle/delete/${id}`);

    mutate(`/api/online-battles`);
  };

  const OBStatusBtn = [
    { id: 1, name: "Approve", bg: "white", status: OB_STATUS.APPROVED },
    { id: 2, name: "Reject", bg: "white", status: OB_STATUS.REJECTED },
  ];

  return (
    <Styles.AdminOnlineBattlesWrapper>
      <AdminSidebar />
      <Styles.AdminOnlineBattlesContainer>
        <Styles.AdminTitle>Online Battles</Styles.AdminTitle>
        {onlineBattleData.map((o) => (
          <Styles.OnlineBattleContainer key={o._id}>
            <Styles.OnlineBattleImage>
              <img src={`${o.bgImage}`} alt="OnlineBattle" />
            </Styles.OnlineBattleImage>
            <Styles.OnlineBattleContent>
              <Styles.OnlineBattleTitle>
                {o.battleName}
              </Styles.OnlineBattleTitle>
            </Styles.OnlineBattleContent>
            <Styles.OnlieBattleCTA>
              <Button
                bg="white"
                onClick={() => router.push(`/online-battle/${o.slug}`)}
              >
                See Details
              </Button>

              {o.status === OB_STATUS.PENDING &&
                OBStatusBtn.map((btn) => (
                  <Button
                    key={btn.id}
                    bg={btn.bg}
                    onClick={() => {
                      onlineBattleStatus(o._id, btn.status);
                    }}
                  >
                    {btn.name}
                  </Button>
                ))}

              {o.status === OB_STATUS.APPROVED && (
                <Button bg="white">Approved</Button>
              )}
              {o.status === OB_STATUS.REJECTED && (
                <Button bg="white">Rejected</Button>
              )}

              <Button
                bg="errorRed"
                onClick={() => {
                  deleteOnlineBattle(o._id);
                }}
              >
                Delete
              </Button>
            </Styles.OnlieBattleCTA>
          </Styles.OnlineBattleContainer>
        ))}
      </Styles.AdminOnlineBattlesContainer>
    </Styles.AdminOnlineBattlesWrapper>
  );
};

export default AdminOnlineBattles;
