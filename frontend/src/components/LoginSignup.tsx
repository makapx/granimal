import Login from "./Login";
import Signup from "./Signup";

export default function LoginSignup() {
    return (
        <>
            <div className="min-h-screen w-full flex flex-col gap-4 items-center justify-center">
                <Login></Login>
                <Signup></Signup>
            </div>
        </>
    );
}