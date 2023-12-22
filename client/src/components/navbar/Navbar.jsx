import React from "react";

import ExpandSvg from "../../svgs/ExpandSvg";
import "./Navbar.css";
import AddSvg from "../../svgs/AddSvg";
import Logo from "../../assets/pencil-logo.png";

const Navbar = ({
  userInfo,
  setIsModalOpen,
  setUserInfo,
  isExpand,
  setIsExpand,
}) => {
  const handleLogout = (e) => {
    e.stopPropagation();
    localStorage.removeItem("userInfo");
    setUserInfo(null);
  };

  const handleExpandOptions = (e) => {
    e.stopPropagation();
    setIsExpand((prevExpand) => !prevExpand);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-inner-container">
        <div className="navbar-brand">
          <img src={Logo} alt="logo" className="brand-logo" />
        </div>
        <div className="navbar-actions">
          <button className="dsv-button" onClick={() => setIsModalOpen(true)}>
            <span className="dsv-icon">
              <AddSvg />
            </span>
            Create
          </button>
          {!userInfo ? (
            <button
              className="dsv-button login-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Login
            </button>
          ) : (
            <div className="navbar-profile-container">
              <div className="navbar-profile" onClick={handleExpandOptions}>
                <h2>{userInfo.username}</h2>
                <span className="dsv-icon profile-icon">
                  <ExpandSvg />
                </span>
              </div>
              {isExpand && (
                <div className="expand-options">
                  <div onClick={handleLogout}>Logout</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
