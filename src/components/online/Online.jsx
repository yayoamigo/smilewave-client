import "./online.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Online({ user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // Define the animations and transitions for the components using Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imgVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5 } },
  };

  const usernameVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.3, duration: 0.5 } },
  };

  // Apply the animations to the components using the `motion` component from Framer Motion
  return (
    <motion.li
      className="rightbarFriend"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="rightbarProfileImgContainer">
        <Link to={`/profile/${user.username}`}>
          <motion.img
            className="rightbarProfileImg"
            src={user.profilePicture ? PF + user.profilePicture : PF + "self.png"}
            alt=""
            variants={imgVariants}
          />
        </Link>
        <span className="rightbarOnline"></span>
      </div>
      <motion.span className="rightbarUsername" variants={usernameVariants}>
        {user.username}
      </motion.span>
    </motion.li>
  );
}
