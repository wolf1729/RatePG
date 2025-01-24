import { useToast, Image, Input, Stack, Button } from "@chakra-ui/react";
import login from '../assets/login.jpg';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginWithGoogle } from "../../Store/User/userSlice";
import { useState } from "react";
import GoogleButton from "react-google-button";

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); 

    const loginFunction = async () => {
        const resultAction = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(resultAction)) {
            toast({
                description: `Welcome, ${resultAction.payload.data.username}!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate("/search");
        } else if (loginUser.rejected.match(resultAction)) {
            // Display the error message returned by the server
            toast({
                description: resultAction.payload || "Login failed",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const loginGoogle = async() => {
        const resultAction = await dispatch(loginWithGoogle());

        if (loginWithGoogle.fulfilled.match(resultAction)) {
            toast({
                description: `Welcome, ${resultAction.payload.data.username}!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate("/search");
        } else if (loginWithGoogle.rejected.match(resultAction)) {
            // Display the error message returned by the server
            toast({
                description: resultAction.payload || "Login failed",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    // Disable the login button while loading
    const isLoading = user.status === 'loading';

    return (
        <div className='loginRegistrationComponent'>
            <Stack display='flex' flexDir='column' justifyContent='center' alignItems='center' height='100%' width='100%'>
                <Image src={login} width={['80%', '20%']} />
                <Input 
                    type='email' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Email' 
                    width={['80%', '30%']} 
                />
                <Input 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Password' 
                    width={['80%', '30%']} 
                />
                <Button 
                    colorScheme='teal' 
                    onClick={loginFunction} 
                    isLoading={isLoading} // Show loading spinner on button
                    isDisabled={isLoading} // Disable button while loading
                >
                    Login
                </Button>
                <GoogleButton onClick={() => loginGoogle()} style={{ marginTop: 25 }} />
            </Stack>
        </div>
    );
}

export default LoginComponent;
