import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";
import { removeUser } from "./utils/userSlice";

const NavBarComp = () => {


    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const res = await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
            dispatch(removeUser())
            return navigate('/login')
        } catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="navbar shadow-sm bg-neutral text-white">
            <div className="flex-1">
                <Link to='/feed' className="btn btn-ghost text-xl text-white">DEV-TINDER APP</Link>
            </div>
            {user && <div className="flex gap-2">
                <div>{user.firstName} {user.lastName}</div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 bg-neutral p-2 text-white shadow">
                        <li>
                            <Link to='/profile' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><Link to='/connections'>Connections</Link></li>
                        <li><Link to='/requests'>Requests</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>}
        </div>
    )
};

export default NavBarComp;