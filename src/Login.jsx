import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./utils/constants";

const LoginComp = () => {
    const [isSignup, setIsSignup] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    //useDispatch for storing data in redux
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLoginHandler = async () => {
        try {
            const apiRes = await axios.post(BASE_URL + "/login", {
                emailId,
                password,
            }, { withCredentials: true });
            dispatch(addUser(apiRes.data?.data ?? apiRes.data));
            navigate('/feed');
        } catch (err) {
            setError(err.response?.data?.message ?? err.message);
        }
    };

    const handleSignupHandler = async () => {
        try {
            await axios.post(BASE_URL + "/signUp", {
                firstName,
                lastName,
                emailId,
                password,
            });
            setIsSignup(false);
            setPassword("");
            setError("");
            setMessage("Account created successfully. Please log in.");
        } catch (err) {
            setError(err.response?.data?.message ?? err.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");
        setIsSubmitting(true);
        try {
            if (isSignup) {
                await handleSignupHandler();
            } else {
                await handleLoginHandler();
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className=" flex justify-center">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">{isSignup ? "Sign Up" : "Login"}</h2>
                    <form onSubmit={handleSubmit}>
                        {isSignup && <>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name</legend>
                                <input type="text" className="input" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </fieldset>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name</legend>
                                <input type="text" className="input" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </fieldset>
                        </>}
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email Id</legend>
                            <input type="email" className="input" placeholder="Enter email address" value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </fieldset>
                        {error && <p className="text-red-500" role="alert">{error}</p>}
                        {message && <p className="text-success" role="status">{message}</p>}
                        <div className="card-actions justify-center mt-4">
                            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Please wait..." : isSignup ? "Create account" : "Login"}
                            </button>
                        </div>
                    </form>
                    <p className="text-center">
                        {isSignup ? "Already have an account? " : "New here? "}
                        <button
                            type="button"
                            className="link link-primary"
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError("");
                                setMessage("");
                            }}
                        >
                            {isSignup ? "Log in" : "Sign up"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default LoginComp;