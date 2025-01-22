import '../styles/homePageHeaderStyle.css';
import { Stack, Button, Text } from '@chakra-ui/react';
import { MdAir } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SideNavigation from './sideNavigation';

function HeaderComponent({ searchScreen = false, newEntryPage = false, isVerified = false }) {
    const navigation = useNavigate();
    const [user, setUser] = useState("")

    // Access Redux state
    const userInfo = useSelector((state) => state.user);
    const { username, status } = userInfo;

    // Remove async API call since we will now use data from the store
    useEffect(() => {
        if (status === 'succeeded') {
            // User is authenticated, no need for API call here
            setUser(username);
        }
    }, [status, username ]);

    const addNewPGFunction = () => {
        if (isVerified === true) {
            navigation('/newPGEntry');
        } else {
            navigation('/loginRegistration');
        }
    };

    const buttonFunction = () => {
        if (searchScreen === true) {
            if (isVerified === true) {
                return (
                    <SideNavigation user={username} />
                );
            }

            return (
                <Stack display='flex' flexDir='row' flexWrap='wrap' alignItems='center' justifyContent='space-evenly'>
                    <Button colorScheme='green' paddingLeft={[0, 8]} paddingRight={[0, 8]} onClick={addNewPGFunction} size={['xs', 'md']}>Add Your PG</Button>
                </Stack>
            )

        } else if (newEntryPage === true) {
            return <Button colorScheme='green' paddingLeft={8} paddingRight={8} onClick={() => navigation('/search')} size={['xs', 'md']}>Search Your PG</Button>;
        } else {
            return <Button colorScheme='orange' paddingLeft={8} paddingRight={8} size={['xs', 'md']} onClick={() => navigation('/FAQ')}>FAQ</Button>;
        }
    };

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
    ); 
}

export default HeaderComponent;
