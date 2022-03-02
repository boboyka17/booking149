/* eslint-disable-line */
import React, { useEffect, useState } from "react";
import BoxCalendar from "./BoxCalendar";
// import Pagination from "./Pagination";
import ReactPaginate from "react-paginate";

function PaginatedItems({ itemsPerPage, data }) {
  // We start with an empty list of items.

  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [TotalDays, setTotalDays] = useState(data.year[0].month[0].day.length);
  const [currentDays, setCurrentDays] = useState(data.year[0].month[0].day);
  const [currentMonth, setCurrentMonth] = useState(
    data.year[0].month[0].monthTitle
  );
  // const [currentYear, setCurrentYear] = useState(data.year[0].yearTitle);
  const [TotalMonth, setTotalMonth] = useState(data.year[0].month.length);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  // Main ref array handle
  const [itemOffset, setItemOffset] = useState(0);
  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
    setTotalDays(data.year[0].month[newOffset].day.length);
    setCurrentDays(data.year[0].month[newOffset].day);
    setCurrentMonth(data.year[0].month[newOffset].monthTitle);
    // setCurrentYear(data.year[0].yearTitle);
  };

  const items = [...Array(TotalMonth).keys()];

  const numbers = [...Array(TotalDays).keys()];

  function Title({ Month, Year }) {
    return (
      <div class="text-center">
        <div class="">
          <div class="card-body">
            <h1
              class="f1-l-4 text-primary"
              style={{ fontSize: "3em", fontWeight: "bold" }}
            >
              {Month + " " + Year}
            </h1>
            <hr />
          </div>
        </div>
      </div>
    );
  }

  const listItems = numbers.map((number) => {
    let result = number % 2;
    let condi = result == 0 ? true : false;
    return (
      <BoxCalendar
        day={currentDays[number].dayTitle}
        isset="1"
        empty="1"
        active={condi}
      />
    );
  });

  function Items({ currentItems }) {
    const Month = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    return (
      <div>
        <Title Month={Month[currentMonth - 1]} Year="2565" />
        <div className="row">
          {currentItems && currentItems.map((item) => listItems)}
        </div>
      </div>
    );
  }

  return (
    <>
      <Items currentItems={currentItems} />
      <div className="text-center">
        <ReactPaginate
          nextLabel="ถัดไป"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="ก่อนหน้า"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination justify-content-center"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default PaginatedItems;
