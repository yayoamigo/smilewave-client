import { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router";
import { register } from "../../redux/ducks/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

 export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
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
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await dispatch(register(user));
        navigate("/login");
      } catch (error) {
        console.log("Registration failed: ", error);
      }
    }
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
            Connect with friends and the world around you on smilewave.
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
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <motion.input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
            <motion.input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="4"
            />
            <motion.input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <motion.button
              className="loginButton"
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              initial="initial"
            >
              {isFetching ? <CircularProgress /> : "Sign up"}
            </motion.button>
            <Link to="/login" style={{ alignSelf: "center" }}>
              <motion.button
                className="loginRegisterButtonx"
                whileHover={{ scale: 1.1 }}
              >
                Already have an account?
              </motion.button>
            </Link>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};