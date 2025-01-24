import { useNavigate } from "react-router-dom"
import { Stack, Image, Input, Button, useToast } from "@chakra-ui/react"
import { useState } from "react"
import registration from '../assets/registration.jpg'
import { registerUser, registerWithGoogle } from "../../Store/User/userSlice"
import { useDispatch } from "react-redux"
import GoogleButton from "react-google-button"

function RegistrationComponent() {
    const toast = useToast()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const registrationFunction = async() => {
        const resultAction = await dispatch(registerUser({ username, email, password }));
        console.log(resultAction)
        if (registerUser.fulfilled.match(resultAction)) {
            toast({
                description: `Welcome, ${resultAction.payload.data.username}!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate("/search");
        } else if (registerUser.rejected.match(resultAction)) {
            // Display the error message returned by the server
            toast({
                description: resultAction.payload || "Registration failed",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const googleRegister = async() => {
        const resultAction = await dispatch(registerWithGoogle());
        console.log(resultAction)
        if (registerWithGoogle.fulfilled.match(resultAction)) {
            toast({
                description: `Welcome, ${resultAction.payload.data.username}!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            navigate("/search");
        } else if (registerWithGoogle.rejected.match(resultAction)) {
            // Display the error message returned by the server
            toast({
                description: resultAction.payload || "Registration failed",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    return (
        <>
        <div className='loginRegistrationComponent'>
            <Stack display='flex' flexDir='column' justifyContent='center' alignItems='center' width='100%' height='100%'>
                <Image src={registration} width={['80%','20%']} />
                <Input type='text' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username' width={['80%','30%']} />
                <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' width={['80%','30%']}/>
                <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' width={['80%','30%']}/>
                <Button colorScheme='teal' onClick={() => registrationFunction()}>Register</Button>
                <GoogleButton style={{ marginTop: 25 }} onClick={() => googleRegister()} />
            </Stack>
        </div>
        </>
    )
}

export default RegistrationComponent