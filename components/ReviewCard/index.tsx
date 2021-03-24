import {
  ReviewCardContainer,
  BgImgWrapper,
  UserWrapper,
  Username,
  ReviewDate,
  ReviewContent,
} from "./styled";
import { UserMale, Dice } from "~/assets/img";

export const ReviewCard = () => {
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

      <Username>Username1</Username>
      <ReviewDate>Mar 3, 2021</ReviewDate>
      <ReviewContent>
        <p>
          “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.... sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </p>
      </ReviewContent>

      <Dice className="dice" />
    </ReviewCardContainer>
  );
};
