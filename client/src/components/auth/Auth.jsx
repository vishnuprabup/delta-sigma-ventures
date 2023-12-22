import React, { useState } from "react";

import "./Auth.css";
import { loginHandler, signupHandler } from "../../api/authApi";
import { isEmailValid } from "../../utils/authUtils";

const Auth = ({ setIsModalOpen }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isError, setIsError] = useState({
    state: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      [name]: value,
    }));
  };

  const handleAuthSwitch = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
    setAuthData((prevAuthData) => ({
      ...prevAuthData,
      password: "",
      confirmPassword: "",
    }));
    setIsError({ state: false, message: "" });
  };

  const handleAuthAction = async () => {
    try {
      if (isLogin) {
        if (authData.email && authData.password) {
          setIsError({ state: false, message: "" });
          const { confirmPassword, ...others } = authData;
          const loginDetails = await loginHandler(others);
          localStorage.clear();
          let userData = {
            email: loginDetails.data.email,
            username: loginDetails.data.username,
          };
          localStorage.setItem("userInfo", JSON.stringify(userData));
          setIsModalOpen(false);
        } else {
          setIsError({ state: true, message: "Invalid-credentials" });
        }
      } else {
        if (authData.email && authData.password && authData.confirmPassword) {
          if (authData.password === authData.confirmPassword) {
            if (isEmailValid(authData.email)) {
              const { confirmPassword, ...others } = authData;
              const signupData = await signupHandler(others);
              localStorage.clear();
              let userData = {
                email: signupData.data.email,
                username: signupData.data.username,
              };
              localStorage.setItem("userInfo", JSON.stringify(userData));
              setIsModalOpen(false);
            } else {
              setIsError({
                state: true,
                message: "Invalid-Email",
              });
            }
          } else {
            setIsError({
              state: true,
              message: "Password and Confirm password does not match",
            });
          }
        } else {
          setIsError({ state: true, message: "Invalid-credentials" });
        }
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setIsError({ state: true, message: error.message });
      } else {
        setIsError({ state: true, message: error.response.data.message });
      }
    }
  };

  return (
    <div className="auth-component">
      <div className="auth-inner-component">
        <div className="auth-inner-card">
          <div className="auth-header">
            <h2 className="dsv-input-header">
              Enter your {isLogin ? "login" : "signup"} details here
            </h2>
          </div>
          <div className="auth-input">
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              onChange={handleInputChange}
              value={authData.email}
              className="dsv-input-box"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={authData.password}
              className="dsv-input-box"
            />
            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                onChange={handleInputChange}
                value={authData.confirmPassword}
                className="dsv-input-box"
              />
            )}
          </div>
          {isError.state && (
            <div className="auth-error">
              <p>* {isError.message} *</p>
            </div>
          )}
          <div className="auth-actions">
            <button className="dsv-button" onClick={handleAuthAction}>
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
          <div className="auth-switch">
            <p>
              {isLogin
                ? "Don't have an account ?"
                : "Have an account already ?"}
            </p>
            <span onClick={handleAuthSwitch}>
              {isLogin ? "Sign up" : "Log in"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
