import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";


const ProfileComp = () => {
    const user = useSelector(store => store.user);
    return (
        <div className="flex justify-center p-5 mx-10 my-10">
            {user && <EditProfile user={user} />}
        </div>
    )
};

export default ProfileComp;