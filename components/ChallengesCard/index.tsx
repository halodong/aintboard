import {
  ChallengesCardWrapper,
  PowerUpIcon,
  PowerUpAmount,
  ChallengeName,
} from "./styled";

const ChallengesCard = () => {
  return (
    <ChallengesCardWrapper>
      <PowerUpIcon>
        <img
          src="https://webstockreview.net/images/mario-clipart-powerup-15.png"
          alt=""
        />
      </PowerUpIcon>

      <PowerUpAmount>4</PowerUpAmount>

      <ChallengeName>
        Score 170 VP in a 4-Player match in Brass Lancashire
      </ChallengeName>
    </ChallengesCardWrapper>
  );
};

export default ChallengesCard;
