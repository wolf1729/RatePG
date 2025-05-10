import login from '../assets/login.jpg';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginWithGoogle } from "../../Store/User/userSlice";
import { useState } from "react";
import { Alert } from '@mui/material';
import GoogleButton from "react-google-button";

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const loginFunction = async () => {
        const resultAction = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(resultAction)) {
            // alert(`Welcome, ${resultAction.payload.data.username}!`);
            <Alert severity="success">
                Welcome, {resultAction.payload.data.username}!
            </Alert>
            navigate("/search");
        } else if (loginUser.rejected.match(resultAction)) {
            alert(resultAction.payload || "Login failed");
        }
    };

    const loginGoogle = async () => {
        const resultAction = await dispatch(loginWithGoogle());

        if (loginWithGoogle.fulfilled.match(resultAction)) {
            // alert(`Welcome, ${resultAction.payload.data.username}!`);
            <Alert severity="success">
                Welcome, {resultAction.payload.data.username}!
            </Alert>
            navigate("/search");
        } else if (loginWithGoogle.rejected.match(resultAction)) {
            alert(resultAction.payload || "Login failed");
        }
    };

    // Disable the login button while loading
    const isLoading = user.status === 'loading';

    return (
        <div className="flex flex-col items-center justify-center w-[100%] h-[100%]">
            <img src={login} alt="Login" className="w-4/5 md:w-1/5 mb-6" />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-4/5 md:w-1/3 p-2 border rounded mb-4"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-4/5 md:w-1/3 p-2 border rounded mb-4"
            />
            <button
                onClick={loginFunction}
                disabled={isLoading}
                className={`w-4/5 md:w-1/3 p-2 rounded mb-4 ${
                    isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-teal-500 hover:bg-teal-600 text-white"
                }`}
            >
                {isLoading ? "Loading..." : "Login"}
            </button>
            <div style={{ marginTop: 25 }}>
                <GoogleButton onClick={loginGoogle} />
            </div>
        </div>
    );
}

export default LoginComponent;
