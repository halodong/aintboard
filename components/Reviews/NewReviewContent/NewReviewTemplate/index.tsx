import { useSelector, useDispatch } from "react-redux";

import ReviewForm from "components/Reviews/ReviewForm";
import StrategyForm from "components/Reviews/StrategyForm";

import { REVIEW_TYPE } from "util/constants";
import { ReviewFormState } from "types/reduxTypes";
import { setReviewType } from "redux/slices/reviewFormSlice";
import { NewReviewTemplateWrapper, Title } from "./../styled";

const NewReviewTemplate = () => {
  const dispatch = useDispatch();
  const reviewType = useSelector(
    (state: ReviewFormState) => state.reviewForm.reviewType
  );

  return (
    <NewReviewTemplateWrapper>
      <Title
        isChosen={reviewType === REVIEW_TYPE.REVIEW}
        onClick={() => dispatch(setReviewType(REVIEW_TYPE.REVIEW))}
      >
        Create a Review
      </Title>
      <Title
        isChosen={reviewType === REVIEW_TYPE.STRATEGY}
        onClick={() => dispatch(setReviewType(REVIEW_TYPE.STRATEGY))}
      >
        Create a Strategy
      </Title>

      {reviewType === REVIEW_TYPE.REVIEW ? <ReviewForm /> : <StrategyForm />}
    </NewReviewTemplateWrapper>
  );
};

export default NewReviewTemplate;
