import dayjs from "dayjs";
import Image from "next/image";
import { capitalize } from "lodash";

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
import { UserWrapper } from "components/Avatar/styled";
import OverallRating from "components/Common/OverallRating";
import Landscape from "~/assets/img/landscape_default.svg";
import { UserMale, Dice, CommentIcon, HeartLikeIcon } from "assets/img";

import { ReviewData } from "types/types";
import { createHTMLExcerpt } from "~/util/createHTML";
import { REVIEWS_HOMEPAGE_COMPONENT } from "~/util/constants";

export const ReviewCard = ({ data, bgImg }: Props) => {
  return (
    <ReviewCardContainer>
      <BgImgWrapper>
        {data.images.length > 0 ? (
          <Image alt="boardgame" src={data.images[0]} layout="fill" />
        ) : (
          <Landscape />
        )}
      </BgImgWrapper>

      <UserWrapper from={REVIEWS_HOMEPAGE_COMPONENT}>
        <UserMale className="icon" />
      </UserWrapper>

      <Username>{data.userData._id}</Username>
      <ReviewDate>{dayjs(data.createdAt).format("MMM DD YYYY")}</ReviewDate>
      <ReviewContent>
        <div
          className="preview"
          dangerouslySetInnerHTML={createHTMLExcerpt(data.reviewContent)}
        ></div>
      </ReviewContent>

      <BottomWrapper>
        <Bottom>
          <OverallRating rating={data.overallRating} paddingBottom="0" />

          <BottomRight>
            <h6>{capitalize(data.reviewType)}</h6>

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
  bgImg?: string;
};
