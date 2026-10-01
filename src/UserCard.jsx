

const UserCard = ({user}) => {
    console.log(user);

    const {firstName, lastName, age, gender, skills, about} = user;
    return (
        <div className="flex justify-center my-4">
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure className="w-96 h-80">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title"></h2>
                    <p>{firstName.toUpperCase() + " " + lastName.toUpperCase()}</p>
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