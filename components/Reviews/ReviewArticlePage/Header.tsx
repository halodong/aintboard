import React from "react";
import * as Styles from "./styled";

import Avatar from "~/components/Avatar";
import dayjs from "dayjs";

const Header = ({ review }: Props) => {
  return (
    <Styles.ArticleContainer>
      <Styles.ArticleName>{review.title}</Styles.ArticleName>
      <Styles.ArticleAuthor>{review.userData[0].username}</Styles.ArticleAuthor>
      <Styles.ArticleDate>
        {dayjs(review.createdAt).format("MMM DD YYYY")}
      </Styles.ArticleDate>
      <Avatar iconType={review.userData[0].avatar} />
    </Styles.ArticleContainer>
  );
};

type Props = {
  review: any;
};

export default Header;
