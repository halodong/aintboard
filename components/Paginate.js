import { isEmpty } from "lodash";
import propTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

//Styles
import {
  PageNumberContainer,
  PageNumber,
  ArrowContainer,
  NumberWrap,
} from "./../styles/paginate";

const Paginate = (props) => {
  const [totalPages, setTotalPages] = useState(null);
  const [dataStartingIndex, setDataStartingIndex] = useState(null);
  const [currentClickedNumber, setCurrentClickedNumberState] = useState(1);
  const [pageData, setPageData] = useState(null);
  const prevData = useRef();

  const determineNumberOfPages = () => {
    const { data, itemsPerPage } = props;
    let paginatedDataObject = {};

    let index = 0;
    let dataLength = data.length;
    let chunkArray = [];

    for (index = 0; index < dataLength; index += itemsPerPage) {
      let newChunk = data.slice(index, index + itemsPerPage);
      chunkArray.push(newChunk);
    }

    chunkArray.forEach((chunk, i) => {
      paginatedDataObject[i + 1] = chunk;
    });

    setTotalPages(chunkArray.length);
    setDataStartingIndex(itemsPerPage);
    setPageData(paginatedDataObject);
  };

  const setCurrentClickedNumber = (e) => {
    const { target } = e;
    setCurrentClickedNumberState(parseInt(target.innerText));
  };

  const moveToLastPage = () => {
    setCurrentClickedNumberState(totalPages);
  };

  const moveToFirstPage = () => {
    setCurrentClickedNumberState(1);
  };

  const moveOnePageForward = () => {
    if (dataStartingIndex) {
      setDataStartingIndex(null);
      setCurrentClickedNumber(2);
    } else {
      setCurrentClickedNumberState(
        currentClickedNumber + 1 > totalPages
          ? totalPages
          : currentClickedNumber + 1
      );
    }
  };

  const moveOnePageBackward = () => {
    setCurrentClickedNumberState(
      currentClickedNumber - 1 < 1 ? 1 : currentClickedNumber - 1
    );
  };

  useEffect(() => {
    if (props.data !== prevData.current) {
      prevData.current = props.data;
      determineNumberOfPages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.data]);

  useEffect(() => {
    if (!isEmpty(pageData)) {
      props.setData(pageData[currentClickedNumber]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentClickedNumber]);

  const pageNumberRender = () => {
    let pages = [];
    for (let i = 1; i < totalPages + 1; i++) {
      pages.push(
        <PageNumber
          onClick={(e) => {
            setCurrentClickedNumber(e);
          }}
          isClicked={currentClickedNumber === i ? true : false}
          key={i}
        >
          {i}
        </PageNumber>
      );
    }
    return pages;
  };

  return (
    <div>
      <PageNumberContainer>
        <ArrowContainer>
          {currentClickedNumber > 1 ? (
            <div>
              <span onClick={moveToFirstPage}>&lt;</span>
              <span onClick={moveOnePageBackward}>&lt;</span>
            </div>
          ) : (
            <div />
          )}
        </ArrowContainer>
        <NumberWrap>{pageNumberRender()}</NumberWrap>
        <ArrowContainer>
          {currentClickedNumber !== totalPages ? (
            <div>
              <span onClick={moveOnePageForward}>&lt;</span>
              <span onClick={moveToLastPage}>&gt;</span>
            </div>
          ) : (
            <div></div>
          )}
        </ArrowContainer>
      </PageNumberContainer>
    </div>
  );
};

export default Paginate;

Paginate.propTypes = {
  data: propTypes.array.isRequired,
  setData: propTypes.func.isRequired,
  itemsPerPage: propTypes.number.isRequired,
};
