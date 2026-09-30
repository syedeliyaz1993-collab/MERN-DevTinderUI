import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const LoginComp = () => {

    const [emailId, setEmailId] = useState("syed@gmail.com");
    const [password, setPassword] = useState("Syed@123");
    const [error, setError] = useState("");
    //useDispatch for storing data in redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginHandler = async () => {
        try {
            const apiRes = await axios.post( BASE_URL + "/login", {
                emailId, password
            }, {withCredentials : true});
            console.log('APIRES', apiRes);
            dispatch(addUser(apiRes.data?.data ?? apiRes.data));
            return navigate('/feed')
        } catch (err) {
            console.log(err)
            setError(err.response?.data?.message)
        }
        
    }

    return (
        <div className=" flex justify-center">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email Id</legend>
                            <input type="text" className="input" placeholder="Enter email-Id here" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="text" className="input" placeholder="Enter password here" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleLoginHandler}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginComp;