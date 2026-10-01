import axios from "axios"
import { BASE_URL } from "./utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addConnection } from "./utils/connectionSlice"
import { useEffect } from "react"


const Connections = () => {
    const connectionsData = useSelector(store => store.connections)
    const dispatch = useDispatch();

    const fetchConnections = async () => {

        try {
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });
            dispatch(addConnection(res.data.data));
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        fetchConnections();
    }, [])


    if (!connectionsData) return;
    if (connectionsData.length === 0) return <h1>No Connections Found</h1>

    return (
        <div className="flex justify-center">
            <h1 className="text-4xl font-bold">Connections</h1>
            <div>{connectionsData.map((e) => {

                const { _id, firstName, lastName, age, gender, skills, about, photoUrl } = e;
                return (

                    <div key={_id} className="my-10"> <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />

                        <h2> {firstName + " " + lastName}</h2>
                        {age && gender && <p>{age + ", " + gender}</p>}
                        <p>{about}</p>

                    </div>
                )
            })

            }</div>
        </div>


    )
}

export default Connections