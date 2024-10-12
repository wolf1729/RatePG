/* eslint-disable react/prop-types */
import '../styles/homePageHeaderStyle.css'
import { Avatar, Button, Stack, Text, Drawer, DrawerBody, DrawerOverlay, DrawerCloseButton, DrawerHeader, DrawerFooter, DrawerContent, useDisclosure, Divider } from '@chakra-ui/react'
import { MdAir } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { GoPerson } from "react-icons/go";
import { useEffect, useRef, useState } from 'react';
import { usernameAPICall } from '../../utils/userAPICalls';

function HeaderComponent({ searchScreen = false, newEntryPage = false, isVerified = false }) {
    const navigation = useNavigate()
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

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
                return (
                    <div>
                        <Stack display='flex' flexDir='row' flexWrap='wrap' alignItems='center' justifyContent='space-evenly' ref={btnRef} onClick={onOpen}>
                            <Avatar size='sm' src={<GoPerson />} />
                            <Text fontSize={[15, 25]}>{username}</Text>
                        </Stack>
                        <Drawer
                            isOpen={isOpen}
                            placement='right'
                            onClose={onClose}
                            finalFocusRef={btnRef}
                        >
                            <DrawerOverlay />
                            <DrawerContent>

                                <DrawerBody marginTop={5}>
                                    <Text textAlign='center' onClick={addNewPGFunction}>Add Your PG</Text>
                                    <Divider marginTop={2} marginBottom={2}/>
                                    <Text textAlign='center' onClick={() => navigation('/pgAdded')}>Added PG's</Text>
                                    <Divider marginTop={2} marginBottom={2}/>
                                    <Text textAlign='center' onClick={() => navigation('/profile')}>Profile</Text>
                                </DrawerBody>

                                <DrawerFooter>
                                    <Button colorScheme='red' width='100%' onClick={logoutFunction}>LogOut</Button>
                                </DrawerFooter>

                            </DrawerContent>
                        </Drawer>
                    </div>
                )
            }



            return <Stack display='flex' flexDir='row' flexWrap='wrap' alignItems='center' justifyContent='space-evenly'>
                    <Button colorScheme='green' paddingLeft={[0, 8]} paddingRight={[0, 8]} onClick={() => addNewPGFunction()} size={['xs', 'md']}>Add Your PG</Button>
            </Stack>

        }
        else if (newEntryPage === true) {
            return <Button colorScheme='green' paddingLeft={8} paddingRight={8} onClick={() => navigation('/search')} size={['xs', 'md']}>Search Your PG</Button>
        }
        else {
            return <Button colorScheme='orange' paddingLeft={8} paddingRight={8} size={['xs', 'md']} onClick={() => navigation('/FAQ')}>FAQ</Button>
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