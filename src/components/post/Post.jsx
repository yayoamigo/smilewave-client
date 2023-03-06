import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchUsers } from "../../redux/ducks/userSlice";
import {format} from "timeago.js"
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const user = useSelector((state) => state.users.users);
  const userlog = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(() => {
    setIsLiked(post.likes.includes(userlog._id));
  }, [userlog._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("api/posts/" + post._id + "/like", { userId: userlog._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      className="post"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user[post.userId]?.username}`}>
              <motion.img
                className="postProfileImg"
                src={user[post.userId]?.profilePicture ? PF + user[post.userId]?.profilePicture : PF + "self.png"}
                alt=""
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              />
            </Link>
            <motion.span
              className="postUsername"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {user[post.userId]?.username || "user"}
            </motion.span>
            <motion.span
              className="postDate"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {format(post.createdAt)}
            </motion.span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <motion.span
            className="postText"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {post?.desc}
          </motion.span>
          <motion.img
            className="postImg"
            src={PF+post.img}
            alt=""
            initial={{ opacity: 0, y:           post?.desc ? 50 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <motion.img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />
            <motion.img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            />
            <motion.span
              className="postLikeCounter"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {like} people like it
            </motion.span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

