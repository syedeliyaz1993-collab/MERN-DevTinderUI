import { Outlet, useNavigate } from "react-router-dom";
import NavBarComp from "./Navbar"
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";

const BodyComp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store => store.user);

    const fetchUser = async () => {
        //  if (!userData)  return;
        try {
            const res = await axios.get(BASE_URL + '/profile/view', { withCredentials: true });

            dispatch(addUser(res.data?.data ?? res.data))
        } catch (err) {
            console.log(err)
            if (err.status === 401) {
                navigate('/login')
            }
        }

    };

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
        //fetchUser();

    }, [])

    return (
        <div>
            <NavBarComp />
            <Outlet />
            <Footer />
        </div>
    )
};

export default BodyComp;