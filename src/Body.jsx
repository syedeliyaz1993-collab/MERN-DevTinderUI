import { Outlet } from "react-router-dom";
import NavBarComp from "./Navbar"
import Footer from "./Footer";

const BodyComp = () => {
    return (
        <div>
            <NavBarComp/>
            <Outlet/>
            <Footer/>
        </div>
    )
};

export default BodyComp;