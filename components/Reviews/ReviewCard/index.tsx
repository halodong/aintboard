import dayjs from "dayjs";
import Image from "next/image";
import { capitalize } from "lodash";
import { useRouter } from "next/router";

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
import Avatar from "components/Avatar";
import OverallRating from "components/Common/OverallRating";
import CommentIcon from "assets/img/Comment";
import HeartLikeIcon from "assets/img/HeartLike";

import { ReviewData } from "types/types";
import { createHTMLExcerpt } from "~/util/createHTML";
import { REVIEWS_HOMEPAGE_COMPONENT, REVIEW_TYPE } from "~/util/constants";

export const ReviewCard = ({ data }: Props) => {
  const router = useRouter();
  return (
    <ReviewCardContainer onClick={() => router.push(`review/${data?.slug}`)}>
      <BgImgWrapper>
        {data.images?.length > 0 ? (
          <Image alt="boardgame" src={data.images[0]} layout="fill" />
        ) : (
          <Image
            alt="boardgame"
            src="/img/landscape_default.png"
            layout="fill"
          />
        )}
      </BgImgWrapper>

      <Avatar
        iconType={data?.userData?.[0]?.avatar || ""}
        from={REVIEWS_HOMEPAGE_COMPONENT}
      />

      <Username>{data?.userData?.[0]?.username}</Username>
      <ReviewDate>{dayjs(data?.createdAt).format("MMM DD YYYY")}</ReviewDate>
      <ReviewContent>
        <div
          className="preview"
          dangerouslySetInnerHTML={createHTMLExcerpt(data.content)}
        ></div>
      </ReviewContent>

      <BottomWrapper>
        <Bottom compType={data?.reviewType}>
          {data?.reviewType === REVIEW_TYPE.REVIEW && (
            <OverallRating rating={data.overallRating} paddingBottom="0" />
          )}

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
};
