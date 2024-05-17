/* eslint-disable react/prop-types */
import '../styles/homePageHeaderStyle.css'
import { Button } from '@chakra-ui/react'
import { MdAir } from "react-icons/md";
import { useNavigate } from 'react-router-dom'

function HeaderComponent({ searchScreen = false, newEntryPage = false }) {
    const navigation = useNavigate()

    const buttonFunction = () => {
        if (searchScreen === true) {
            return <Button colorScheme='green' paddingLeft={8} paddingRight={8} onClick={() => navigation('/newPGEntry')}>Add Your PG</Button>
        }
        else if (newEntryPage === true) {
            return <Button colorScheme='green' paddingLeft={8} paddingRight={8} onClick={() => navigation('/search')}>Search Your PG</Button>
        }
        else {
            return <Button colorScheme='orange' paddingLeft={8} paddingRight={8}>FAQ</Button>
        }
    }

    return (
        <>
        <div className='homepageHeaderMainContainer'>
            <div className='homepageHeaderTitleContainer'>
                <MdAir size={25}/>
                <p>RatePG</p>
            </div>
            <div className='homepageHeaderButtonContainer'>
                {buttonFunction()}
            </div>
        </div>
        </>
    )
}

export default HeaderComponent