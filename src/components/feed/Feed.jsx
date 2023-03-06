import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { fetchPost } from "../../redux/ducks/postSlice";
import { fetchPostUser } from "../../redux/ducks/userPostSlice";
import { setPostUser } from "../../redux/ducks/userPostSlice";
import {fetchAdmin} from "../../redux/ducks/adminSlice";

export default function Feed({username}) {
  const user = useSelector((state) => state.login.user);
  const post = useSelector((state) => state.post.post);
  const postUser = useSelector((state) => state.postUser.postUser);
  const postLoading =  useSelector((state) => state.post.isLoading);
  const dispatch = useDispatch();
  

  useEffect(() => {
    //if username is not null (meaning the user had clicked on a user from the timeline), then fetch post of that user
    if (username) {
      //save postUser to local storage so that user can reload the page and still see the post
      const localData = localStorage.getItem('postUser');
      if (localData) {
        //if local storage has data, then set postUser to local storage data
        const posts = JSON.parse(localData);
        dispatch(setPostUser(posts));
      } else {
        //if local storage has no data, then fetch postUser
        dispatch(fetchPostUser(username));
      }
    } else {
      dispatch(fetchPost(user._id))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('postUser', JSON.stringify(postUser));
  }, [postUser]);

  useEffect(() => {
    dispatch(fetchAdmin(user._id));
  }, [user]);

  return (
    <div className="feed">
      <div className="feedWrapper">
      {(!username ) && <Share />}
        {postLoading ? (
          <div className="loading">Loading...</div>
        ) : username ? (
          postUser.map((p) => <Post key={p._id} post={p} />)
        ) : (
          post.map((p) => <Post key={p._id} post={p} />)
        )}
      </div>
    </div>
  );
}
