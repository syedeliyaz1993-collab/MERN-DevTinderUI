import axios from "axios"
import { BASE_URL } from "./utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "./utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const FeedComp = () => {

  const userFeedData = useSelector(store => store.feed);
  const dispatch = useDispatch();

  const getUserFeed = async () => {
    if(userFeedData) return;
    try {
      const feedAPIRes = await axios.get(BASE_URL + '/users/feed', { withCredentials: true });
      dispatch(addFeed(feedAPIRes.data?.data))
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getUserFeed();
  }, [])


  return (
    <div> 
      {userFeedData && <UserCard user={userFeedData[0]}/>}
    </div>
  )
}

export default FeedComp