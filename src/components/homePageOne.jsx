import '../styles/homePageOneStyle.css'
import houseImage from '../assets/houseimage.jpg'
import { useNavigate } from 'react-router-dom'

function HomePageOne() {
    const navigation = useNavigate()
    return (
        <>
        <div className="flex flex-col md:flex-row items-center justify-between p-8">
            <div className="text-center md:text-left">
                <p className="text-3xl font-bold">Rate Your PG</p>
                <p className="text-3xl font-bold">Homes</p>
                <p className="text-lg text-gray-500 mt-2">Discover the Best PG Accomodations Near You</p>
                <button
                    className="bg-orange-500 text-white py-3 px-10 mt-6 hover:bg-orange-600 transition duration-300"
                    onClick={() => navigation('/search')}
                >
                    Find Your Perfect PG
                </button>
            </div>
            <div className="mt-6 md:mt-0">
                <img src={houseImage} alt="House" className="w-full h-auto rounded-lg" />
            </div>
        </div>
        </>
    )
}

export default HomePageOne
