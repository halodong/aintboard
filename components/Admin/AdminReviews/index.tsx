import React from "react";
import * as Styles from "./styles";
import AdminSidebar from "~/components/Admin/AdminSidebar";
import Button from "~/components/Common/Button";

import useSWR, { mutate } from "swr";
import fetcher from "util/fetch";
import { ReviewApiResponse } from "types/types";
import { REVIEW_STATUS } from "~/util/constants";
import axios from "axios";
import { useRouter } from "next/router";
import { BattleName } from "~/components/OnlineBattleCard/styled";

const AdminReviews = () => {
  const router = useRouter();

  const { data: reviewsData } = useSWR<ReviewApiResponse>(
    `/api/reviews`,
    fetcher
  );

  const reviewData = reviewsData?.response?.data?.reviews || [];

  const reviewStatus = async (id: string, status: string | undefined) => {
    await axios.patch(`/api/review/status/${id}/${status}`);

    mutate(`/api/reviews`);
  };

  const deleteReview = async (id: string) => {
    await axios.delete(`/api/review/delete/${id}`);

    mutate(`/api/reviews`);
  };

  const reviewStatusBtn = [
    { id: 1, name: "Approve", bg: "white", status: REVIEW_STATUS.APPROVED },
    { id: 2, name: "Reject", bg: "white", status: REVIEW_STATUS.REJECTED },
  ];

  return (
    <Styles.AdminReviewsWrapper>
      <AdminSidebar />
      <Styles.AdminReviewsContainer>
        <Styles.AdminTitle>Reviews</Styles.AdminTitle>
        {reviewData.map((r) => (
          <Styles.ReviewContainer key={r._id}>
            <Styles.ReviewImage>
              <img src={`${r.images}`} alt="Review" />
            </Styles.ReviewImage>
            <Styles.ReviewContent>
              <Styles.ReviewTitle>{r.title}</Styles.ReviewTitle>
            </Styles.ReviewContent>
            <Styles.ReviewCTA>
              <Button
                bg="white"
                onClick={() => router.push(`/review/${r.slug}`)}
              >
                See Details
              </Button>

              {r.reviewStatus === REVIEW_STATUS.PENDING ? (
                reviewStatusBtn.map((btn) => (
                  <Button
                    key={btn.id}
                    bg={btn.bg}
                    onClick={() => {
                      reviewStatus(r._id, btn.status);
                    }}
                  >
                    {btn.name}
                  </Button>
                ))
              ) : r.reviewStatus === REVIEW_STATUS.APPROVED ? (
                <Button bg="white">Approved</Button>
              ) : (
                <Button bg="white">Rejected</Button>
              )}

              <Button bg="errorRed" onClick={() => deleteReview(r._id)}>
                Delete
              </Button>
            </Styles.ReviewCTA>
          </Styles.ReviewContainer>
        ))}
      </Styles.AdminReviewsContainer>
    </Styles.AdminReviewsWrapper>
  );
};

export default AdminReviews;
