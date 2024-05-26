/* eslint-disable react/prop-types */
import '../styles/homePageHeaderStyle.css'
import { Button, Stack, Text } from '@chakra-ui/react'
import { MdAir } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

function HeaderComponent({ searchScreen = false, newEntryPage = false, isVerified = false }) {
    const navigation = useNavigate()

    const buttonFunction = () => {
        if (searchScreen === true) {
            return <Stack display='flex' flexDir='row' flexWrap='wrap' alignItems='center' justifyContent='space-evenly'>
                    <Button colorScheme='green' paddingLeft={[0, 8]} paddingRight={[0, 8]} onClick={() => navigation('/newPGEntry')} size={['xs', 'md']}>Add Your PG</Button>
                    <Button onClick={() => navigation('/loginRegistration')} size={['xs', 'md']}>LogIn</Button>
                    {isVerified ? <Button colorScheme='red' size={['xs', 'md']}>LogOut</Button> : null }
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