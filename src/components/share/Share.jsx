import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { fetchAdmin } from "../../redux/ducks/adminSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

export default function Share() {
  const currentUser = useSelector((state) => state.login.user);
  const user = useSelector((state) => state.admin.admin);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchAdminData() {
      await dispatch(fetchAdmin(currentUser._id));
    }
    fetchAdminData();
  }, [dispatch]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imgVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5 } },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("api/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("api/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  const handleCancelFile = () => {
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <motion.div
      className="share"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="shareWrapper" variants={imgVariants}>
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture ? PF + user.profilePicture : PF + "self.png"}
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={handleCancelFile} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleFileChange}
              />
                </label>
                <div className="shareOption">
                  <Label htmlColor="blue" className="shareIcon" />
                  <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                  <Room htmlColor="green" className="shareIcon" />
                  <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                  <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                  <span className="shareOptionText">Feelings</span>
                </div>
              </div>
              <motion.button
                className="shareButton"
                type="submit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Share
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      );
    }
