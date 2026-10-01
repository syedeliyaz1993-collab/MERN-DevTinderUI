import axios from "axios"
import { BASE_URL } from "./utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addRequests, removeRequest } from "./utils/requestSlice"


const Requests = () => {
    const requestsData = useSelector(store => store.requests)
    const dispatch = useDispatch();


    const fetchReviewRequests = async (status, _id) => {
        try {
            const res = await axios.post(BASE_URL + "/request/review/" + status + '/' + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        } catch (err) {
            console.log(err)
        }
    }

    const fetchRequests = async () => {

        try {
            const res = await axios.get(BASE_URL + '/user/request/received', { withCredentials: true });
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        fetchRequests();
    }, [])


    if (!requestsData) return null;
    if (requestsData.length === 0) return <h1 className="flex justify-center my-10">No Requests Found</h1>

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">Requests</h1>
            <div className="flex flex-wrap justify-center gap-4">
                {requestsData.map((e) => {
                    const { firstName, lastName, age, gender, about, photoUrl } = e.fromUserId;
                    return (
                        <div key={e._id} className="my-10">
                            <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
                            <h2>{firstName} {lastName}</h2>
                            {age && gender && <p>{age}, {gender}</p>}
                            <p>{about}</p>
                            <button
                                className="btn btn-active btn-primary mx-4"
                                onClick={() => fetchReviewRequests("accepted", e._id)}>
                                Accept
                            </button>
                            <button
                                className="btn btn-active btn-secondary"
                                onClick={() => fetchReviewRequests("rejected", e._id)}>
                                Reject
                            </button>
                        </div>
                    );
                })}
            </div>
        </div >


    )
}

export default Requests