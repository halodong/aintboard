import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import { BgImgWrapper, Username, ReviewDate, ReviewContent } from "./styled";
import Avatar from "components/Avatar";
import { ReviewData } from "types/types";
import { createHTMLExcerpt } from "~/util/createHTML";
import { REVIEWS_HOMEPAGE_COMPONENT } from "~/util/constants";

const UpperPart = ({ data }: Props) => {
  return (
    <Link href={`/review/${data?.slug}`}>
      <a style={{ cursor: "pointer" }}>
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
        <ReviewDate>{dayjs(data?.createdAt).format("MMM DD, YYYY")}</ReviewDate>
        <ReviewContent>
          <div
            className="preview"
            dangerouslySetInnerHTML={createHTMLExcerpt(data.content)}
          ></div>
        </ReviewContent>
      </a>
    </Link>
  );
};

type Props = {
  data: ReviewData;
};

export default UpperPart;
