import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchPostUser } from "../../redux/ducks/userPostSlice";
import { useParams } from "react-router-dom";
import {PermMedia, Cancel} from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { fetchUsers } from "../../redux/ducks/userSlice";
import { useNavigate } from 'react-router-dom';



export default function Profile() {
  const navigate = useNavigate();
  const users = useSelector((state) => state.users.users);
  const userName = useParams().username;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.login.user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  let username = userName; // if username is not defined, then it will be the current user
  let user = null;
  for (let _id in users) {
    if (users[_id].username === username) {
      user = users[_id];
      break;
    }
  }

  useEffect(() => {
    dispatch(fetchUsers());
    // eslint-disable-next-line
  }, []);

  useEffect(() => { 
    setIsAdmin(currentUser.username === username)
  }, [currentUser, username])

  useEffect(() => {
    if (username) {
      dispatch(fetchPostUser(username));
      
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      try {
        await axios.post("https://52.87.212.123:8000/api/upload", data);
        const res = await axios.put(`https://52.87.212.123:8000/api/users/${user._id}`, { userId: currentUser._id, profilePicture: fileName });
        console.log(res.data);
        navigate('/');
      } catch (err) {}
    }
  };
  


  const handleCancelFile = () => {
    setFile(null);
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img crossOrigin="anonymous" className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "post3.jpg"} alt="" />
              <img crossOrigin="anonymous" className="profileUserImg" src={user.profilePicture ? PF + user.profilePicture : PF + "self.png"} alt="" />
            </div>
            <div className="profileInfo">  
                {isAdmin ? (
    // should only render if isAdmin is true
            <>
              {file && (
                <div className="shareImgContainer">
                  <img crossOrigin="anonymous" className="shareImg" src={URL.createObjectURL(file)} alt="" />
                  <Cancel className="shareCancelImg" onClick={handleCancelFile} />
                </div>
              )}
              <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                  <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon" />
                    <span className="shareOptionText">Photo</span>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="file"
                      accept=".png,.jpeg,.jpg"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
                <button className="shareButton" type="submit">
                  Change your profile picture
                </button>
              </form>
            </>
          ) : null}
            {/* this render regardless of isadmin */}
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={user?.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
