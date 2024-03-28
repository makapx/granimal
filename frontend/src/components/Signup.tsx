export default function Signup() {
    return (
        <>
            <div className="flex flex-col gap-0.5 bg-gray-100 py-2 px-4 rounded-md w-lg items-center">
                
                <div className="avatar mt-2">
                    <div className="w-24 rounded-full ">
                        <img src="https://i.pinimg.com/564x/49/4c/68/494c68940a28c06c31a87f9116b557eb.jpg" />
                    </div>
                </div>

                <label className="form-control w-full w-lg">
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full w-lg">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input type="password" placeholder="Password" className="input input-bordered w-full w-xs" />
                </label>
                <label className="form-control w-full w-lg">
                    <div className="label">
                        <span className="label-text">Conferma Password</span>
                    </div>
                    <input type="password" placeholder=" Conferma Password" className="input input-bordered w-full max-w-xs" />
                </label>

                <button className="btn btn-secondary text-primary-content mb-0.5 mt-2">Signup</button>
            </div>


        </>
    )
}