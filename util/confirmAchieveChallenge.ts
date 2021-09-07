import axios from "axios";
import { mutate } from "swr";
import { ChallengesData } from "types/types";

const confirmAchieveChallenge = async ({
  data,
  userLoggedInId,
  setIsModalOpen,
}: Props) => {
  const response = await axios.post("/api/user/challenge", {
    userId: userLoggedInId,
    challengeId: data?._id,
    powerups: data?.powerUpAmount,
  });

  if (response.data?.success) {
    // revalidate user challenges data to show achieved status in card
    mutate(`/api/userChallenges/filter/userId/${userLoggedInId}?first=1`);
    // revalidate userdata to fetch updated powerups
    mutate(`/api/user/filter/_id/${userLoggedInId}`);
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  }
};

type Props = {
  data?: ChallengesData;
  userLoggedInId: string;
  setIsModalOpen?: (modalOpen: boolean) => void;
};

export default confirmAchieveChallenge;
