import { useNavigate } from "react-router-dom"
import { userRegistration } from "../../utils/userAPICalls"
import { Stack, Image, Input, Button } from "@chakra-ui/react"
import { useState } from "react"
import registration from '../assets/registration.jpg'

function RegistrationComponent() {
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
            Cookies.set('userId', result.userId)
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

export default RegistrationComponent