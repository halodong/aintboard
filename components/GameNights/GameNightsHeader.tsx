import * as Styles from "./styled";

const GameNightsHeader = () => {
  return (
    <>
      <Styles.HomepageSubHeading>
        Join online boardgamers on Tabletop Gateway PH, <br /> join their
        Discord server below!
      </Styles.HomepageSubHeading>
      <br />
      <br />
      <Styles.GameNightLink href="https://discord.gg/cAWX6PPs" target="_blank">
        Tabletop Gateway PH Discord
      </Styles.GameNightLink>
    </>
  );
};

export default GameNightsHeader;
