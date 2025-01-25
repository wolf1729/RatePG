import { Avatar, Stack, Text, Button, Divider } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../Store/User/userSlice"
import { useNavigate } from "react-router-dom"
import { GoPerson } from "react-icons/go"

function ProfileScreen() {
    const user = useSelector((state) => state.user)
    const [pgUploaded, setPgUploaded] = useState([])
    const dispatch = useDispatch()
    const navigation = useNavigate()

    // const logoutFunction = () => {
    //     dispatch(logout())
    //     navigation("/search")
    // }

    return (
        <div className="w-[100vw] mt-5">
            <Stack width='100%' display='flex' flexDirection={['column', 'row']} alignItems={['center', 'flex-start']} justifyContent='center'>
                <Stack display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                    <Avatar src={ user.img || <GoPerson />} size='xl' />
                    <Text fontSize={40}>{user.username}</Text>
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