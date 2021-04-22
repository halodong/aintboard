import { useState } from "react";

import CreateReviewForm from "./../CreateReviewForm";

import { NewReviewTemplateWrapper, Title } from "./../styled";

const NewReviewTemplate = () => {
  return (
    <NewReviewTemplateWrapper>
      <Title>Create a Review</Title>
      <Title>Create a Strategy</Title>
      <CreateReviewForm />
    </NewReviewTemplateWrapper>
  );
};

export default NewReviewTemplate;
