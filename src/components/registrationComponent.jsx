import { useNavigate } from "react-router-dom";
import { useState } from "react";
import registration from '../assets/registration.jpg';
import { registerUser, registerWithGoogle } from "../../Store/User/userSlice";
import { useDispatch } from "react-redux";
import { Alert } from "@mui/material";
import GoogleButton from "react-google-button";

function RegistrationComponent() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const registrationFunction = async () => {
        const resultAction = await dispatch(registerUser({ username, email, password }));
        if (registerUser.fulfilled.match(resultAction)) {
            // alert(`Welcome, ${resultAction.payload.data.username}!`);
            <Alert severity="success">
                `Welcome, {resultAction.payload.data.username}!
            </Alert>
            navigate("/search");
        } else if (registerUser.rejected.match(resultAction)) {
            alert(resultAction.payload || "Registration failed");
        }
    };

    const googleRegister = async () => {
        const resultAction = await dispatch(registerWithGoogle());
        if (registerWithGoogle.fulfilled.match(resultAction)) {
            // alert(`Welcome, ${resultAction.payload.data.username}!`);
            <Alert severity="success">
                Welcome, {resultAction.payload.data.username}!
            </Alert>
            navigate("/search");
        } else if (registerWithGoogle.rejected.match(resultAction)) {
            alert(resultAction.payload || "Registration failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-[100%] ">
            <img src={registration} alt="Registration" className="w-4/5 md:w-1/5 mb-6" />
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-4/5 md:w-1/3 p-2 border rounded mb-4"
            />
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
                onClick={registrationFunction}
                className="w-4/5 md:w-1/3 p-2 rounded mb-4 bg-teal-500 hover:bg-teal-600 text-white"
            >
                Register
            </button>
            <div style={{ marginTop: 25 }}>
                <GoogleButton onClick={googleRegister} />
            </div>
        </div>
    );
}

export default RegistrationComponent;
