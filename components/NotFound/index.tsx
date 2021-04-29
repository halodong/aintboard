import * as DefaultStyles from "components/Common/defaultStyled";
import * as Styles from "./styled";

const NotFound = () => {
  return (
    <DefaultStyles.DefaultHeightWrapper>
      <Styles.NotFoundWrapper>
        <Styles.NotFoundH1>Game Over</Styles.NotFoundH1>
        <Styles.NotFoundH2>Nah, this page doesn't exist</Styles.NotFoundH2>
        <Styles.NotFoundH2>404 error</Styles.NotFoundH2>
      </Styles.NotFoundWrapper>
    </DefaultStyles.DefaultHeightWrapper>
  );
};

export default NotFound;
