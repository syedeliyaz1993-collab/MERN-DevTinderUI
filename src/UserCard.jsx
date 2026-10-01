import { BASE_URL } from "./utils/constants";
import { removeFeed } from "./utils/feedSlice";
import { useDispatch } from "react-redux";
import axios from "axios";


const UserCard = ({ user }) => {
    const dispatch = useDispatch();

    const { _id, firstName, lastName, age, gender, skills, about, photoUrl } = user;

    const fetchSendRequests = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + '/' + _id, {}, { withCredentials: true });
            dispatch(removeFeed(_id));
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <div className="flex justify-center my-4">
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure className="w-96 h-80">
                    <img
                        src={photoUrl}
                        alt="userPhoto" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title"></h2>
                    <p>{firstName + " " + lastName}</p>
                    <p>{age}</p>
                    <p>{gender}</p>
                    <p>{skills}</p>
                    <p>{about}</p>
                    <div className="card-actions justify-center flex">
                        <button className="btn btn-primary" onClick={() => fetchSendRequests('ignored', _id)}>Ignore</button>
                         <button className="btn btn-primary" onClick={() => fetchSendRequests('interested', _id)}>Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard