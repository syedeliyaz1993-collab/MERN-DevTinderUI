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

  if(userFeedData === null) return <h1 className="flex justify-center my-10">No Feed Found</h1>
  return (
    <div> 
      {userFeedData && userFeedData.map((e, i) => <UserCard key={e._id ?? i} user={e} />)}
    </div>
  )
}

export default FeedComp