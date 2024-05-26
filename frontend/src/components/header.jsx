/* eslint-disable react/prop-types */
import '../styles/homePageHeaderStyle.css'
import { Avatar, Button, Stack, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { MdAir } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { GoPerson } from "react-icons/go";
import { useEffect, useState } from 'react';
import { usernameAPICall } from '../../utils/userAPICalls';

function HeaderComponent({ searchScreen = false, newEntryPage = false, isVerified = false }) {
    const navigation = useNavigate()
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        const gettingUsername = async() => {
            try{
                await setUserId(Cookies.get('userId'))
                const result = await usernameAPICall(userId)
                setUsername(result)
            }
            catch(err) {
                console.log(err)
            }
        }

        gettingUsername()
    })

    const logoutFunction = () => {
        Cookies.remove('userId')
        navigation('/')
    }

    const addNewPGFunction = () => {
        if (isVerified === true) {
            navigation('/newPGEntry')
        }
        else{
            navigation('/loginRegistration')
        }
    }

    const buttonFunction = () => {
        if (searchScreen === true) {
            if (isVerified === true){
                return <Menu>
                            <MenuButton >
                                <Stack display='flex' flexDir='row' flexWrap='wrap' alignItems='center' justifyContent='space-evenly'>
                                    <Avatar size='sm' src={<GoPerson />} />
                                    <Text fontSize={[15, 25]}>{username}</Text>
                                </Stack>
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => addNewPGFunction()}>Add Your PG</MenuItem>
                                <MenuItem onClick={() => logoutFunction()}>LogOut</MenuItem>
                            </MenuList>
                        </Menu>
            }



            return <Stack display='flex' flexDir='row' flexWrap='wrap' alignItems='center' justifyContent='space-evenly'>
                    <Button colorScheme='green' paddingLeft={[0, 8]} paddingRight={[0, 8]} onClick={() => addNewPGFunction()} size={['xs', 'md']}>Add Your PG</Button>
            </Stack>

        }
        else if (newEntryPage === true) {
            return <Button colorScheme='green' paddingLeft={8} paddingRight={8} onClick={() => navigation('/search')} size={['xs', 'md']}>Search Your PG</Button>
        }
        else {
            return <Button colorScheme='orange' paddingLeft={8} paddingRight={8} size={['xs', 'md']}>FAQ</Button>
        }
    }

    return (
        <>
        <div className='homepageHeaderMainContainer'>
            <Stack display='flex' flexDir='row' alignItems='center' marginBottom={[5, 5]} marginTop={[5, 5]} marginRight={[2, 10]} marginLeft={[2, 10]}>
                <MdAir size={25}/>
                <Text fontSize={[15, 25]} fontWeight={800}>RatePG</Text>
            </Stack>
            <Stack marginBottom={[5, 5]} marginTop={[5, 5]} marginRight={[2, 10]} marginLeft={[2, 10]}>
                {buttonFunction()}
            </Stack>
        </div>
        </>
    )
}

export default HeaderComponent