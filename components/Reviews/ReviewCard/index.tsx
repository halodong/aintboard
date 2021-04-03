import dayjs from "dayjs";
import {
  ReviewCardContainer,
  BgImgWrapper,
  Username,
  ReviewDate,
  ReviewContent,
  Bottom,
  BottomRight,
  BottomWrapper,
} from "./styled";
import { UserMale, Dice, CommentIcon, HeartLikeIcon } from "assets/img";
import { UserWrapper } from "components/Avatar/styled";
import { ReviewData } from "types/types";
import { REVIEWS_HOMEPAGE_COMPONENT } from "~/util/constants";

export const ReviewCard = ({ data }: Props) => {
  return (
    <ReviewCardContainer>
      <BgImgWrapper>
        <img
          alt="boardgame"
          src="https://cf.geekdo-images.com/0BsjJY9MTlx9DRrlkeE69w__original/img/6AJktf34S4ypVI75ecsfmkDicgA=/0x0/filters:format(jpeg)/pic5482020.jpg"
        />
      </BgImgWrapper>

      <UserWrapper from={REVIEWS_HOMEPAGE_COMPONENT}>
        <UserMale className="icon" />
      </UserWrapper>

      <Username>{data.users._id}</Username>
      <ReviewDate>{dayjs(data.createdAt).format("MMM DD YYYY")}</ReviewDate>
      <ReviewContent>
        <p>{data.reviewText}</p>
      </ReviewContent>

      <BottomWrapper>
        <Bottom>
          <Dice className="dice" />

          <BottomRight>
            <h6>Strategy</h6>

            <div className="socials">
              <CommentIcon /> <span>100</span>
              <HeartLikeIcon /> <span>102</span>
            </div>
          </BottomRight>
        </Bottom>
      </BottomWrapper>
    </ReviewCardContainer>
  );
};

type Props = {
  data: ReviewData;
};
