import {  useRef } from "react";
import "./login.css";
import { login } from "../../redux/ducks/authSlice";
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";

import { motion } from 'framer-motion';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const isFetching = useSelector((state) => state.login.isFetching)

  const loginLeftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const loginRightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  const loginBoxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03 },
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login(
      { email: email.current.value, password: password.current.value },
    ))
  };
 return (
  <div className="login">
    <div className="loginWrapper">
      <motion.div
        className="loginLeft"
        variants={loginLeftVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3
          className="loginLogo"
          whileHover={{ scale: 1.1 }}
        >
          smilewave
        </motion.h3>
        <motion.span
          className="loginDesc"
          whileHover={{ scale: 1.05 }}
        >
          start sharing positivity.
        </motion.span>
      </motion.div>
      <motion.div
        className="loginRight"
        variants={loginRightVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.form
          className="loginBox"
          onSubmit={handleClick}
          variants={loginBoxVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.input
            placeholder="Email"
            type="email"
            required
            className="loginInput"
            ref={email}
          />
          <motion.input
            placeholder="Password"
            type="password"
            required
            minLength="4"
            className="loginInput"
            ref={password}
          />
          <motion.button
            className="loginButton"
            type="submit"
            disabled={isFetching}
            variants={buttonVariants}
            whileHover="hover"
            initial="initial"
          >
            {isFetching ? <CircularProgress /> : "Log In"}
          </motion.button>
          <span className="loginForgot">Forgot Password?</span>
          <Link to="/register" style={{ alignSelf: "center" }}>
            <motion.button
              className="loginRegisterButton"
              whileHover={{ scale: 1.1 }}
            >
              {isFetching ? <CircularProgress /> : "Create a New Account"}
            </motion.button>
          </Link>
        </motion.form>
      </motion.div>
    </div>
  </div>
);
}