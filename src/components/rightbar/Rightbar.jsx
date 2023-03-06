import "./rightbar.css";
import Online from "../online/Online";
import { fetchFriends } from "../../redux/ducks/friendsSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Add, Remove } from "@mui/icons-material";
import { fetchAdmin } from "../../redux/ducks/adminSlice";
import { motion } from 'framer-motion';




export default function Rightbar({ user }) {
  const friends = useSelector((state) => state.friends.friendsByUserId);
  const currentUser = useSelector((state) => state.login.user);
  const admin = useSelector((state) => state.admin.admin);
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [followed, setFollowed] = useState(false);
  const filteredUsers = Object.values(users).filter(
    (u) => !friends[currentUser._id]?.find((f) => f._id === u._id)
  );

  
  useEffect(() => {
    if (user) {
      dispatch(fetchFriends(user._id));
    }
    
    async function fetchAdminData() {
      await dispatch(fetchAdmin(currentUser._id));
    }
    fetchAdminData();
    
    setFollowed(admin?.followings?.includes(user?._id));
  }, [dispatch, user]);
  
 
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://52.87.212.123:8000/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        
      } else {
        await axios.put(`http://52.87.212.123:8000/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    
    return (
      <>
        <div className="birthdayContainer">
          <img crossorigin="anonymous" className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Eros smanis</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img crossorigin="anonymous" className="rightbarAd" src={`${PF}kfc.jpg`} alt="" />
        <h4 className="rightbarTitle">meet new people</h4>
        <ul className="rightbarFriendList">
          {filteredUsers?.map((u) => (
            <Online key={u._id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  
  
  const ProfileRightbar = () => {
     // Define variants for the list items and container
  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };
  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
    const followButtonVariants = {
      initial: { scale: 1 },
      hover: { scale: 1.1 },
    };
  
    return (
      <div className="profileDiv">
        {user.username !== currentUser.username && (
          <motion.button
            className="rightbarFollowButton"
            onClick={handleClick}
            variants={followButtonVariants}
            initial="initial"
            whileHover="hover"
          >
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </motion.button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user?.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user?.relationship || "single"}</span>
          </div>
        </div>
        {friends[user._id] && (
        <motion.div
          className="rightbarFollowings"
          variants={listContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <h4 className="rightbarTitle">User friends</h4>
          {friends[user._id].map((friend) => (
            <Link
              to={`/profile/${friend.username}`}
              key={friend._id}
              style={{ textDecoration: 'none' }}
            >
              <motion.div
                className="rightbarFollowing"
                variants={listItemVariants}
              >
                <motion.img
                crossorigin="anonymous"
                  src={friend.profilePicture ? PF + friend.profilePicture : PF + 'self.png'}
                  alt=""
                  className="rightbarFollowingImg"
                />
                <motion.span className="rightbarFollowingName">
                  {friend.username}
                </motion.span>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
      </div>
    );
  };
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}