import React from "react";
import styled from "styled-components";

const Pagination = (props) => {
  const { onChangePage, page, totalPages } = props;

  const handlePrevClick = () => {
    onChangePage(page - 1);
  };

  const handleNextClick = () => {
    onChangePage(page + 1);
  };

  return (
    <ButtonContent>
      <NextPrevButton onClick={handlePrevClick} disabled={page === 1}>
        이전
      </NextPrevButton>
      {ButtonArray.map((el) => (
        <PageButton
          key={el.id}
          onClick={() => onChangePage(el.id)}
          isSelected={page === el.id}
        >
          {el.id}
        </PageButton>
      ))}
      <NextPrevButton onClick={handleNextClick} disabled={page === totalPages}>
        다음
      </NextPrevButton>
    </ButtonContent>
  );
};

export default Pagination;

const ButtonContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;

  background: ${(props) => (props.isSelected ? "white" : "#66bacf")};
  color: ${(props) => (props.isSelected ? "#66bacf" : "white")};

  font-weight: bold;

  border: 1px solid #666;
  border-radius: 50%;
  box-shadow:
    inset 0px -2px 8px rgba(0, 0, 0, 0.1),
    2px 3px 10px rgba(0, 0, 0, 0.1);

  cursor: ${(props) => (props.isSelected ? "revert" : "pointer")};
  transition: 0.2s;

  &:hover {
    transform: ${(props) =>
      props.isSelected ? "translateY(0)" : "translateY(-2px)"};

    background: #fff;
    color: #66bacf;
  }
`;

const NextPrevButton = styled.button`
  width: 40px;
  height: 40px;

  background: #fff;
  color: #66bacf;

  font-weight: bold;

  border: 1px solid #666;
  border-radius: 50%;
  box-shadow:
    inset 0px -2px 8px rgba(0, 0, 0, 0.1),
    2px 3px 10px rgba(0, 0, 0, 0.1);

  transition: 0.2s;

  &:hover {
    transform: ${(props) =>
      props.isSelected ? "translateY(0)" : "translateY(-2px)"};

    background: #66bacf;
    color: #fff;
  }
`;

const ButtonArray = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];
