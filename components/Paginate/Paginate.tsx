import { isEmpty } from "lodash";
import { useState, useEffect, useRef } from "react";

import {
  ArrowContainer,
  NumberWrap,
  PageNumber,
  PageNumberContainer,
} from "./styles";

import { BggBoardgameData } from "~/types/types";

const Paginate = (props: Props) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [dataStartingIndex, setDataStartingIndex] = useState<number | null>(
    null
  );
  const [currentClickedNumber, setCurrentClickedNumberState] = useState(1);
  const [pageData, setPageData] = useState<BggBoardgameData[][] | null>(null);
  const prevData = useRef<BggBoardgameData[]>();

  const determineNumberOfPages = () => {
    const { data, itemsPerPage } = props;
    let paginatedDataObject = [] as BggBoardgameData[][];

    let index = 0;
    let dataLength = data.length;
    let chunkArray = [] as BggBoardgameData[][];

    for (index = 0; index < dataLength; index += itemsPerPage) {
      let newChunk: BggBoardgameData[] = data.slice(
        index,
        index + itemsPerPage
      );
      chunkArray.push(newChunk);
    }

    chunkArray.forEach((chunk, i) => {
      paginatedDataObject[i + 1] = chunk;
    });

    setTotalPages(chunkArray.length);
    setDataStartingIndex(itemsPerPage);
    setPageData(paginatedDataObject);
  };

  const setCurrentClickedNumber = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    const { target } = e;
    let input = target as HTMLInputElement;
    setCurrentClickedNumberState(parseInt(input.innerText));
  };

  const moveToLastPage = () => {
    setCurrentClickedNumberState(totalPages || 0);
  };

  const moveToFirstPage = () => {
    setCurrentClickedNumberState(1);
  };

  const moveOnePageForward = () => {
    if (dataStartingIndex) {
      setDataStartingIndex(null);
      setCurrentClickedNumberState(2);
    } else {
      let pages = totalPages || 0;
      setCurrentClickedNumberState(
        currentClickedNumber + 1 > pages ? pages : currentClickedNumber + 1
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
    if (!isEmpty(pageData) && pageData !== null) {
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
              <span
                onClick={moveToFirstPage}
                onKeyPress={moveToFirstPage}
                role="button"
                tabIndex={0}
              >
                &lt;
              </span>
              <span
                onClick={moveOnePageBackward}
                onKeyPress={moveOnePageBackward}
                role="button"
                tabIndex={0}
              >
                &lt;
              </span>
            </div>
          ) : (
            <div />
          )}
        </ArrowContainer>
        <NumberWrap>{pageNumberRender()}</NumberWrap>
        <ArrowContainer>
          {currentClickedNumber !== totalPages ? (
            <div>
              <span
                onClick={moveOnePageForward}
                onKeyPress={moveOnePageForward}
                role="button"
                tabIndex={0}
              >
                &gt;
              </span>
              <span
                onClick={moveToLastPage}
                onKeyPress={moveToLastPage}
                role="button"
                tabIndex={0}
              >
                &gt;
              </span>
            </div>
          ) : (
            <div></div>
          )}
        </ArrowContainer>
      </PageNumberContainer>
    </div>
  );
};

type Props = {
  data: BggBoardgameData[];
  setData: (data: BggBoardgameData[]) => void;
  itemsPerPage: number;
};

export default Paginate;
