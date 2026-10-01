import { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from './utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';

const EditProfile = ({ user }) => {


    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [skills, setSkills] = useState(user.skills);
    const [about, setAbout] = useState(user.about);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl ?? '')
     const[toast, setToast] = useState(false);
    //once we save that needs to shpe in profile so store the data in store
    const dispatch = useDispatch();

    const handleEditHandler = async () => {
        const saveProfile = await axios.patch(BASE_URL + '/profile/edit', { firstName, lastName, age, gender, skills, about,photoUrl },
            { withCredentials: true });

        dispatch(addUser(saveProfile.data.data));
        setToast(true);

        setTimeout(() => {
            setToast(false)
        }, 3000);
    }

    return (
        <div className=" flex justify-center">
            <div className="card bg-base-300 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title flex justify-center">Edit Profile</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input type="text" className="input" placeholder="Enter FirstName here" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </fieldset>

                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input type="text" className="input" placeholder="Enter LastName here" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Age</legend>
                            <input type="text" className="input" placeholder="Enter Age here" value={age} onChange={(e) => setAge(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Gender</legend>
                            <input type="text" className="input" placeholder="Enter Gender here" value={gender} onChange={(e) => setGender(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">PhotoUrl</legend>
                            <input type="text" className="input" placeholder="Enter PhotoUrl here" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Skills</legend>
                            <input type="text" className="input" placeholder="Enter Skills here" value={skills} onChange={(e) => setSkills(e.target.value)} />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">About</legend>
                            <input type="text" className="input" placeholder="Enter about here" value={about} onChange={(e) => setAbout(e.target.value)} />
                        </fieldset>
                    </div>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleEditHandler}>Save Profile</button>
                    </div>
                </div>
            </div>
            <UserCard user={{ firstName, lastName, age, gender, skills, about, photoUrl }} />
            {toast && <div className="toast toast-top toast-start">
               
                <div className="alert alert-success flex justify-center">
                    <span>Profile updated successfully.</span>
                </div>
            </div>}
        </div>
    )
}

export default EditProfile