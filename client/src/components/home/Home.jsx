import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import Auth from "../auth/Auth";
import Form from "../form/Form";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import Blog from "../blog/Blog";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [postData, setPostData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isExpand, setIsExpand] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userInfo")));
  }, [isModalOpen]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_DOMAIN}post/getPost?page=${page}`)
      .then((response) => {
        setPostData(response.data.posts);
        setTotalPage(response.data.totalPages);
      });
  }, [page, isModalOpen]);

  return (
    <div className="home-component" onClick={() => setIsExpand(false)}>
      <div className="home-inner-component">
        <div className="home-navbar-component">
          <Navbar
            setIsModalOpen={setIsModalOpen}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            setIsExpand={setIsExpand}
            isExpand={isExpand}
          />
        </div>
        <Blog
          postData={postData}
          totalPage={totalPage}
          page={page}
          setPage={setPage}
        />
        {isModalOpen && (
          <Modal
            setIsModalOpen={setIsModalOpen}
            Content={
              userInfo ? (
                <Form setIsModalOpen={setIsModalOpen} />
              ) : (
                <Auth setIsModalOpen={setIsModalOpen} />
              )
            }
          />
        )}
      </div>
    </div>
  );
};

export default Home;
