import '../styles/loginRegisterScreenStyle.css'
import login from '../assets/login.jpg'
import registration from '../assets/registration.jpg'
import { Stack, Switch, Text, Input, Button, useToast, Image } from '@chakra-ui/react'
import { useState } from 'react'
import { userLogin, userRegistration } from '../../utils/userAPICalls'
import { useNavigate } from 'react-router-dom'

function LoginRegistrationScreen() {
    const [isChecked, setIsChecked] = useState(false)
    const toast = useToast()

    const handleToggle = () => {
        setIsChecked(!isChecked);
    }

    //Code for login Component
    const LoginComponent = () => {
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const navigate = useNavigate()

        const loginFunction = async() => {
            try {
                if (email === '' || password === '') {
                    toast({
                        title: "Warning",
                        description: "Please fill all details",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                    return
                }

                const result = await userLogin(email, password)

                if (result.status === 'noUser') {
                    toast({
                        title: 'Warning',
                        description: "Invalid Email or Password",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                    return 
                }
                else if (result.status === false) {
                    toast({
                        title: 'Error',
                        description: "Something went wrong",
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    })
                    return
                }
                toast({
                    description: "Login Successfull",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                navigate('/search')
            }
            catch(err) {
                console.log(err)
                toast({
                    description: "Something went wrong",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        return (
            <>
            <div className='loginRegistrationComponent'>
                <Stack display='flex' flexDir='column' justifyContent='center' alignItems='center' height='100%' width='100%'>
                    <Image src={login} width={['80%','20%']}/>
                    <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' width={['80%','30%']}/>
                    <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' width={['80%','30%']}/>
                    <Button colorScheme='teal' onClick={() => loginFunction()}>Login</Button>
                </Stack>
            </div>
            </>
        )
    }

    //Code for Registration component
    const RegistrationComponent = () => {
        const [username, setUsername] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')
        const navigate = useNavigate()

        const registrationFunction = async() => {
            try{
                if(username === '' || email === '' || password === ''){
                    toast({
                        title: 'Error',
                        description: "Please fill all fields",
                        status: 'warning',
                        duration: 3000,
                        isClosable: true,
                    })
                    return 
                }

                const result = await userRegistration(username, email, password)

                if(result.status === 'exist'){
                    toast({
                        title: 'Warning',
                        description: "User already exist",
                        status: 'warning',
                        duration: 3000,
                        isClosable: true,
                    })
                    return 
                }
                
                toast({
                    description: "Registration Successful",
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
                navigate('/search')
            }
            catch(err) {
                console.log(err)
                toast({
                    description: "Something went wrong",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
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
                </Stack>
            </div>
            </>
        )
    }

    return (
        <>
        <Stack className="authHeader" display='flex' flexDir='row' alignItems='center' justifyContent='center' margin={5}>
            <Text fontWeight={600}>Login</Text>
            <Switch isChecked={isChecked} onChange={handleToggle} size='lg' colorScheme='orange'/>
            <Text fontWeight={600}>Registration</Text>
        </Stack>
        <div className='loginRegistrationComponent'>
            { isChecked ? <RegistrationComponent /> : <LoginComponent /> }
        </div>
        </>
    )
}

export default LoginRegistrationScreen