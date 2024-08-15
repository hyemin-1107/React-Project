import React from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";

const CustomPagination = (props) => {
  const { handlePageChange, page, limit } = props;
  const totalPage = Math.ceil(100 / limit);

  return (
    <PaginationWrapper>
      <Pagination
        activePage={page}
        itemsCountPerPage={limit} // 페이지 당 보여줄 아이템 수
        totalItemsCount={totalPage} // 전체 페이지 수
        pageRangeDisplayed={Math.min(5, totalPage)} // 한 번에 보여줄 페이지 범위
        onChange={handlePageChange} // 페이지 변경 시 호출될 함수
        prevPageText={"이전"}
        nextPageText={"다음"}
      />
    </PaginationWrapper>
  );
};

export default CustomPagination;

const PaginationWrapper = styled.div`
  .pagination {
    display: flex;
    justify-content: center;

    margin-top: 15px;
  }

  ul.pagination {
    display: flex;

    li:first-child,
    li:last-child {
      display: none;
    }
  }

  ul.pagination li {
    margin: 0 5px;

    width: 36px;
    height: 36px;

    border: 1px solid #666;
    border-radius: 50%;
    cursor: pointer;
  }

  ul.pagination li a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    color: #fff;
    background-color: #66bacf;
    border-radius: 50%;
  }

  ul.pagination li a:hover {
    background-color: #fff;
    border-color: #66bacf;
    color: #66bacf;
  }

  ul.pagination li.active {
    background-color: #fff;
    pointer-events: none;
  }

  ul.pagination li.active a {
    color: #66bacf;
    background-color: #fff;
  }
`;
