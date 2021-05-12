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

const AdminReviews = () => {
  const router = useRouter();

  const { data: filteredApiData } = useSWR<ReviewApiResponse>(
    `/api/review/filter/reviewStatus/PENDING`,
    fetcher
  );

  const reviewData = filteredApiData?.response?.data?.reviews || [];

  const reviewStatus = async (id: string, status: string | undefined) => {
    await axios.patch(`/api/review/status/${id}/${status}`);

    mutate(`/api/review/filter/reviewStatus/PENDING`);
  };

  const deleteReview = async (id: string) => {
    await axios.delete(`/api/review/delete/${id}`);

    mutate(`/api/review/filter/reviewStatus/PENDING`);
  };

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
              <Button
                bg="white"
                onClick={() => reviewStatus(r._id, REVIEW_STATUS.APPROVED)}
              >
                Approve
              </Button>
              <Button
                bg="white"
                onClick={() => reviewStatus(r._id, REVIEW_STATUS.REJECTED)}
              >
                Reject
              </Button>
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
