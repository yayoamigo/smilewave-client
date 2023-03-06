import "./Topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchAdmin } from "../../redux/ducks/adminSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Topbar() {
  const currentUser = useSelector((state) => state.login.user);
  const user = useSelector((state) => state.admin.admin)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const dispatch = useDispatch()

    
  useEffect(() => {
  
    async function fetchAdminData() {
      await dispatch(fetchAdmin(currentUser._id));
    }
    fetchAdminData();
    
  }, [dispatch]);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
        <span className="logo">SMILEWAVE</span>
        </Link>
      
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
        <Link to="/messenger" style={{textDecoration:"none"}}>
        <span className="topbarLink">Messenger</span>
        </Link>
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="topbarLink">Timeline</span>
        </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
          </div>
          <div className="topbarIconItem">
            <Link to="/messenger" style={{textDecoration:"none"}}>
            <Chat />
            <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
          </div>
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "self.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}