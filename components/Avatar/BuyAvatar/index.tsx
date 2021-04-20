import useSWR, { mutate } from "swr";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Avatar from "components/Avatar";

import fetcher from "~/util/fetch";
import { GIRL_ICON, BOY_ICON, ALPACA_ICON, KNIGHT_ICON } from "util/constants";
import {
  BuyAvatarsWrapper,
  CommonAvatars,
  SpecialAvatars,
  SpecialAvatarWrapper,
  GameFont,
  UnlockText,
} from "./styled";
import useCurrentUser from "~/hooks/useCurrentUser";
import {
  SpecialAvatarsData,
  UserApiResponse,
  UserAvatarsApiResponse,
  UserAvatarsData,
} from "~/types/types";
import { setPopup } from "redux/slices/modalSlice";

const commonAvatars = [GIRL_ICON, BOY_ICON, ALPACA_ICON, KNIGHT_ICON];

const BuyAvatar = ({ specialAvatars }: Props) => {
  const dispatch = useDispatch();
  const user = useCurrentUser();
  const userData = user?.userData ? JSON.parse(user?.userData) : {};

  const { data: userApiData } = useSWR<UserApiResponse>(
    userData?._id ? `/api/user/filter/_id/${userData?._id}` : null,
    fetcher
  );
  const userObj = userApiData?.response?.data?.users?.[0];

  const { data: userAvatarsApiData } = useSWR<UserAvatarsApiResponse>(
    userData?._id ? `/api/user/avatars?userId=${userData?._id}` : null,
    fetcher
  );

  const unlockAvatar = async (avatar: SpecialAvatarsData) => {
    if (userObj?.role === undefined) {
      return dispatch(
        setPopup({
          open: true,
          header: "Need Access",
          content: "You need to login to be able to buy an avatar",
        })
      );
    }

    const userPowerUps = userObj?.powerups || 0;
    const neededPowerUps = avatar.powerUpAmount - userPowerUps;

    if (userPowerUps < avatar.powerUpAmount) {
      return dispatch(
        setPopup({
          open: true,
          header: "Not enough PowerUps",
          content: `Achieve challenges to get more PowerUps. You need ${neededPowerUps} more to get this.`,
        })
      );
    }

    //mutate locally - just like how like buttons work in FB
    mutate(
      `/api/user/avatars?userId=${userObj?._id}`,
      () => {
        return {
          success: true,
          response: {
            message: userAvatarsApiData?.response?.message,
            data: {
              userAvatars: [
                ...(userAvatarsApiData?.response?.data?.userAvatars || []),
                {
                  userId: userObj?._id,
                  icon: avatar?.icon,
                },
              ],
            },
          },
        };
      },
      false
    );

    const response = await axios.post("/api/buy/avatar", {
      userId: userObj?._id,
      icon: avatar?.icon,
      powerups: avatar?.powerUpAmount,
    });

    if (!response.data.userAvatar.success) {
      toast.error(response.data.userAvatar.message);
      return;
    }

    //revalidate apis
    mutate(`/api/user/avatars?userId=${userObj?._id}`);
  };

  const applyAvatar = (avatar: SpecialAvatarsData) => {};

  return (
    <BuyAvatarsWrapper>
      <CommonAvatars>
        <h4>Common Avatars</h4>
        <div className="avatars">
          {commonAvatars.map((avatar, i) => (
            <Avatar
              key={`${avatar}-${i}`}
              iconType={avatar}
              isChosen={userObj?.avatar === avatar}
            />
          ))}
        </div>
      </CommonAvatars>
      <SpecialAvatars>
        <h4>Special Avatars</h4>
        <div className="avatars">
          {specialAvatars.map((avatar, i) => {
            const userAvatarsObj =
              userAvatarsApiData?.response?.data?.userAvatars;
            const hasPurchased: UserAvatarsData[] =
              userAvatarsObj?.filter((userAvatar) => {
                return userAvatar?.icon === avatar?.icon;
              }) || [];

            return (
              <SpecialAvatarWrapper key={`${avatar}-${i}`}>
                <Avatar
                  iconType={avatar.icon}
                  isChosen={userObj?.avatar === avatar.icon}
                />
                {hasPurchased.length > 0 ? (
                  <UnlockText onClick={() => applyAvatar(avatar)}>
                    <span>Use this avatar</span>
                  </UnlockText>
                ) : (
                  <UnlockText onClick={() => unlockAvatar(avatar)}>
                    <span>Unlock for {avatar?.powerUpAmount}</span>
                    <GameFont>UP</GameFont>
                  </UnlockText>
                )}
              </SpecialAvatarWrapper>
            );
          })}
        </div>
      </SpecialAvatars>
    </BuyAvatarsWrapper>
  );
};

type Props = {
  specialAvatars: SpecialAvatarsData[];
};

export default BuyAvatar;
