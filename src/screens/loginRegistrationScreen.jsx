import '../styles/loginRegisterScreenStyle.css'
import { Stack, Switch, Text, Input, Button, useToast, Image } from '@chakra-ui/react'
import { useState } from 'react'
import LoginComponent from '../components/loginComponent'
import RegistrationComponent from '../components/registrationComponent'

function LoginRegistrationScreen() {
    const [isChecked, setIsChecked] = useState(false)
    const toast = useToast()

    const handleToggle = () => {
        setIsChecked(!isChecked);
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