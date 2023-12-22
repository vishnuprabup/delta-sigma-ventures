import React from "react";

import "./Blog.css";
import Card from "../card/Card";
import NextSvg from "../../svgs/NextSvg";
import PrevSvg from "../../svgs/PrevSvg";

const Blog = ({ postData, page, setPage, totalPage }) => {
  const handlePrevClick = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (page !== totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="blog-container">
      {postData && (
        <div className="blog-inner-container">
          {postData.map((post, i) => (
            <Card key={i} {...post} />
          ))}
        </div>
      )}
      <div className="pagination">
        <div className="button-container">
          <div className="--actions">
            <button
              onClick={handlePrevClick}
              disabled={page === 1}
              className={
                page === 1 ? "nav-action-button-disabled" : "nav-action-button"
              }
            >
              <span
                className={
                  page === 1 ? "ut-icon nav-icon-disabled" : "ut-icon nav-icon"
                }
              >
                <PrevSvg />
              </span>
              Prev
            </button>
            <button
              onClick={handleNextClick}
              disabled={page === totalPage}
              className={
                page === totalPage
                  ? "nav-action-button-disabled"
                  : "nav-action-button"
              }
            >
              Next
              <span
                className={
                  page === totalPage
                    ? "ut-icon nav-icon-disabled"
                    : "ut-icon nav-icon"
                }
              >
                <NextSvg />
              </span>
            </button>
          </div>
          <div className="--details">
            <p>
              Page <span style={{ fontWeight: 600 }}>{page}</span> of{" "}
              {totalPage}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
