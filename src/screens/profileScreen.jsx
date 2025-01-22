import { Avatar, Stack, Text, Button, Divider } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../Store/User/userSlice"
import { useNavigate } from "react-router-dom"

function ProfileScreen() {
    const [pgUploaded, setPgUploaded] = useState([])
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const logoutFunction = () => {
        dispatch(logout())
        navigation("/search")
    }

    return (
        <div className="w-[100vw] mt-5">
            <Stack width='100%' display='flex' flexDirection={['column', 'row']} alignItems={['center', 'flex-start']} justifyContent='center'>
                <Avatar src="" size='xl' />
                <Stack display='flex' flexDirection='column' alignItems='center'>
                    <Text fontSize={40}>Username</Text>
                    <Stack display='flex' flexDirection='column' alignItems='center' justifyContent='space-between'>
                        <Button size='sm'>Change Password</Button>
                        <Button size='sm'>Upload Profile Pic</Button>
                        <Button size='sm' colorScheme="red" onClick={() => logoutFunction()}>LogOut</Button>
                    </Stack>
                </Stack>
            </Stack>
            <Stack width='100%' display='flex' flexDirection='column' alignItems='center' marginTop={20} >
                <Text>PG's Uploaded</Text>
                <Divider width='80%' />
                <Stack>
                    {
                        pgUploaded.length === 0 
                        ? 
                        <Stack marginTop={50}>
                            <Text>You have uploaded 0 PG's</Text>
                        </Stack>
                        :
                        <Stack></Stack>
                    }
                </Stack>
            </Stack>
        </div>
    )
}

export default ProfileScreen