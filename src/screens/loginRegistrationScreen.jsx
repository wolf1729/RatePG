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
        <div className=' w-[100vw] h-[100vh]'>
            <div className="flex items-center justify-center space-x-4 my-3 h-[10%] w-[100%]">
                <span className="font-semibold">Login</span>
                <Switch checked={isChecked} onChange={handleToggle} />
                <span className="font-semibold">Registration</span>
            </div>
            <div className="flex items-center justify-center w-[100%] h-[89%]">
                {isChecked ? <RegistrationComponent /> : <LoginComponent />}
            </div>
        </div>
    )
}

export default LoginRegistrationScreen
