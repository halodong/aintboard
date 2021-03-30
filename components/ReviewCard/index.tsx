import {
  ReviewCardContainer,
  BgImgWrapper,
  Username,
  ReviewDate,
  ReviewContent,
  Bottom,
  BottomRight,
} from "./styled";
import { UserMale, Dice } from "~/assets/img";
import CommentIcon from "~/assets/img/comment.svg";
import HeartLikeIcon from "~/assets/img/heart-like.svg";
import { UserWrapper } from "~/components/Avatar/styled";

import { ReviewData } from "~/types/types";

export const ReviewCard = ({ data }: Props) => {
  return (
    <ReviewCardContainer>
      <BgImgWrapper>
        <img
          alt="boardgame"
          src="https://cf.geekdo-images.com/0BsjJY9MTlx9DRrlkeE69w__original/img/6AJktf34S4ypVI75ecsfmkDicgA=/0x0/filters:format(jpeg)/pic5482020.jpg"
        />
      </BgImgWrapper>

      <UserWrapper>
        <UserMale className="icon" />
      </UserWrapper>

      <Username></Username>
      <ReviewDate>Mar 3, 2021</ReviewDate>
      <ReviewContent>
        <p>
          “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.... sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </ReviewContent>

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
    </ReviewCardContainer>
  );
};

type Props = {
  data: ReviewData;
};
