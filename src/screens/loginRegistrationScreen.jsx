import '../styles/loginRegisterScreenStyle.css'
import { useState } from 'react'
import LoginComponent from '../components/loginComponent'
import RegistrationComponent from '../components/registrationComponent'
import { Switch } from '@mui/material'

function LoginRegistrationScreen() {
    const [isChecked, setIsChecked] = useState(false)

    const handleToggle = () => {
        setIsChecked(!isChecked)
    }

    return (
        <>
            <div className="flex items-center justify-center space-x-4 my-5">
                <span className="font-semibold">Login</span>
                <Switch checked={isChecked} onChange={handleToggle} />
                <span className="font-semibold">Registration</span>
            </div>
            <div className="loginRegistrationComponent">
                {isChecked ? <RegistrationComponent /> : <LoginComponent />}
            </div>
        </>
    )
}

export default LoginRegistrationScreen
