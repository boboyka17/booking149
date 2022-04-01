/* eslint-disable-line */
import React, { useEffect, useState } from "react";
import BoxCalendar from "./BoxCalendar";
// import Pagination from "./Pagination";
import ReactPaginate from "react-paginate";

function Items({ currentItems, total }) {
  const monthTh = [
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
    <>
      {currentItems &&
        currentItems.map((item) => {
          function days(month, year) {
            const result = item.days.map((child) => {
              const date = year + "/" + month + "/" + child.days;
              return (
                <BoxCalendar day={child.days} thisDate={date} id={child.id} />
              );
            });
            return result;
          }

          return (
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-center text-primary">
                  <strong>
                    {monthTh[item.month]} {parseInt(item.year) + 543}
                  </strong>
                </h1>
              </div>
              {days(item.month + 1, item.year)}
            </div>
          );
        })}
    </>
  );
}

function PaginatedItems({ itemsPerPage, data }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    // console.log("aaaa", currentItems);
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* <Items /> */}
      <Items currentItems={currentItems} total={data} month="June" />
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
