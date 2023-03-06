import "./message.css";
import { format } from "timeago.js";
import { useSelector } from "react-redux";

export default function Message({ message, own, sender }) {
 const users = useSelector((state) => state.users.users);
 const user = users[sender];
 console.log(user)
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={ user?.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}