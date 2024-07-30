import React, { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

import "./Pagination.scss";

function Pagination({ setActivePage, totalPages, id }) {
  const [page, setPage] = useState(1);

  const backAll = () => {
    setPage(1);
    setActivePage(1);
  };

  const backOne = () => {
    if (page !== 1) {
      setActivePage(page - 1);
      setPage(page - 1);
    }
  };

  const nextOne = () => {
    if (page !== totalPages) {
      setActivePage(page + 1);
      setPage(page + 1);
    }
  };

  const nextAll = () => {
    setActivePage(totalPages);
    setPage(totalPages);
  };

  return (
    <div className="app-pagination">
      <a className="fall-prev icon" href={`#${id}`} onClick={() => backAll()}>
        <AiOutlineDoubleLeft />
      </a>
      <a className="prev-one icon" href={`#${id}`} onClick={() => backOne()}>
        <IoIosArrowBack />
      </a>
      <div className="number">{page}</div>
      <a className="next-one icon" href={`#${id}`} onClick={() => nextOne()}>
        <IoIosArrowForward />
      </a>
      <a className="fall-next icon" href={`#${id}`} onClick={() => nextAll()}>
        <AiOutlineDoubleRight />
      </a>
    </div>
  );
}

export default Pagination;
