

const UserCard = ({user}) => {
    console.log(user);

    const {firstName, lastName, age, gender, skills, about, photoUrl} = user;
    
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
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary ">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard