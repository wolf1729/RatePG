
import { Avatar, Button, Stack, Text, Drawer, DrawerBody, DrawerOverlay, DrawerFooter, DrawerContent, useDisclosure, Divider } from '@chakra-ui/react';
import { GoPerson } from "react-icons/go";
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SideNavigation({ user }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const navigation = useNavigate()

    const logoutFunction = () => {
        Cookies.remove('userId');
        navigation('/');
    };

    const addNewPGFunction = () => {
        if (isVerified === true) {
            navigation('/newPGEntry');
        } else {
            navigation('/loginRegistration');
        }
    };
    
    return (
        <div>
            <Stack display='flex' flexDir='row' flexWrap='wrap' alignItems='center' justifyContent='space-evenly' ref={btnRef} onClick={onOpen}>
                <Avatar size='sm' src={<GoPerson />} />
                <Text fontSize={[15, 25]}>{user}</Text>
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

export default SideNavigation