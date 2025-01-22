import '../styles/homePageOneStyle.css'
import houseImage from '../assets/houseimage.jpg'
import { Button } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'

function HomePageOne() {
    const navigation = useNavigate()
    return (
        <>
        <div className="homepageOneMainContainer">
            <div className="homepageOneTextContainer">
                <p className='boldOne'>Rate Your PG</p>
                <p className='boldOne'>Homes</p>
                <p className='lightOne'>Discover the Best PG Accomodations Near You</p>
                <Button colorScheme="orange" color='black' paddingLeft={20} paddingRight={20} paddingTop={8} paddingBottom={8} margin={8} onClick={() => navigation('/search')}>Find Your Perfect PG</Button>
            </div>
            <div className="homepageOneImageContainer">
                <img src={houseImage} alt="" />
            </div>
        </div>
        </>
    )
}

export default HomePageOne