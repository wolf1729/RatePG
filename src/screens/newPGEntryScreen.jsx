import { useState } from "react"
import HeaderComponent from "../components/header"
import { GiHotMeal, GiClothes } from "react-icons/gi";
import { PiHouseLight, PiSecurityCameraFill, PiMapPinSimpleAreaBold, PiTelevisionSimpleFill } from "react-icons/pi";
import { FaWifi } from "react-icons/fa";
import { MdEmojiTransportation } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { TbAirConditioning } from "react-icons/tb";
import { addNewPG } from '../../utils/pgAPICalls';
import { uploadFileInStorage } from '../../utils/firebaseFunctions';
import { useNavigate } from 'react-router-dom';
import notAvailableImage from '../assets/noAvailable.jpg'

function NewPGEntryScreen() {
    const imageToUse = notAvailableImage
    const navigate = useNavigate()
    const [pgName, setPGName] = useState('')
    const [pgLocation, setPGLocation] = useState('')
    const [roomCondition, setRoomCondition] = useState(0)
    const [bathroomCondition, setbathroomCondition] = useState(0)
    const [locationConvenience, setLocationConvenience] = useState(0)
    const [overallRating, setOverallRating] = useState(0)
    const [price, setPrice] = useState()
    const [facilities, setFacilities] = useState([])
    const [imageFile, setImageFile] = useState(null)
    const [possibleLocations, setPossibleLocations] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)

    const api_key = import.meta.env.VITE_OLA_MAPS_API_KEY

    const apiHitting = async (searchText) => {
        try {
            const urlSearchText = encodeURIComponent(searchText.trim())
            const apiURL = `https://api.olamaps.io/places/v1/autocomplete?input=${urlSearchText}&api_key=${api_key}`
            const hittingAPI = await fetch(apiURL)
            const gettingData = await hittingAPI.json()
            setPossibleLocations(gettingData.predictions || [])
            setShowDropdown(true)
        } catch (err) {
            console.log(err)
        }
    }

    const handleLocationChange = async (e) => {
        const value = e.target.value
        setPGLocation(value)
        if (value.length > 2) {
            await apiHitting(value)
        } else {
            setShowDropdown(false)
        }
    }

    const handleLocationSelect = (location) => {
        setPGLocation(location)
        setShowDropdown(false)
    }

    const addNewPGFunction = async () => {
        if (pgName === '' && pgLocation === '') {
            alert("Please fill Name and Location of your PG")
            return
        }

        try {
            const imageToUpload = imageFile === null ? imageToUse : imageFile
            const imageURL = await uploadFileInStorage(imageToUpload, pgName);
            await addNewPG(pgName, pgLocation, roomCondition, bathroomCondition, locationConvenience, overallRating, price, facilities, imageURL)
            alert("PG Added to Database")
            navigate('/search')
        } catch (err) {
            console.log(err)
        }
    }

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    return (
        <>
            <HeaderComponent newEntryPage={true} />
            <div className="container mx-auto p-5">
                <input
                    type="text"
                    value={pgName}
                    onChange={(e) => setPGName(e.target.value)}
                    className="w-4/5 sm:w-3/5 p-2 border border-gray-300 rounded mb-5 mt-5"
                    placeholder="Enter your PG Name"
                />

                <div className="relative w-4/5 sm:w-3/5 mt-5 mb-5">
                    <input
                        type="text"
                        value={pgLocation}
                        onChange={handleLocationChange}
                        className="w-full p-2 border border-gray-300 rounded mb-5"
                        placeholder="Enter your PG Location"
                    />
                    {showDropdown && (
                        <div className="absolute top-16 left-0 w-full max-h-52 overflow-y-auto border border-gray-300 bg-white z-10 rounded">
                            {possibleLocations.map((location, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 border-b border-gray-200 cursor-pointer"
                                    onClick={() => handleLocationSelect(location.description)}
                                >
                                    {location.description}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Room Condition */}
                <div className="w-4/5 sm:w-3/5 mb-5 mt-5">
                    <label className="block mb-2">Room Condition</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={roomCondition}
                        onChange={(e) => setRoomCondition(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Bathroom Condition */}
                <div className="w-4/5 sm:w-3/5 mb-5 mt-5">
                    <label className="block mb-2">Bathroom Condition</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={bathroomCondition}
                        onChange={(e) => setbathroomCondition(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Location Convenience */}
                <div className="w-4/5 sm:w-3/5 mb-5 mt-5">
                    <label className="block mb-2">Location Convenience</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={locationConvenience}
                        onChange={(e) => setLocationConvenience(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Overall Rating */}
                <div className="w-4/5 sm:w-3/5 mb-5 mt-5">
                    <label className="block mb-2">Overall Rating</label>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={overallRating}
                        onChange={(e) => setOverallRating(e.target.value)}
                        className="w-full"
                    />
                </div>

                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-4/5 sm:w-3/5 p-2 border border-gray-300 rounded mb-5 mt-5"
                    placeholder="Enter Rent"
                />

                {/* Facilities */}
                <div className="my-5">
                    <label className="block text-xl font-semibold">Facilities</label>
                    <div className="flex flex-wrap">
                        <label className="flex items-center mr-5 mb-2">
                            <input
                                type="checkbox"
                                value="meals"
                                checked={facilities.includes('meals')}
                                onChange={(e) => setFacilities(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(facility => facility !== e.target.value))}
                                className="mr-2"
                            />
                            <GiHotMeal size={20} />
                            Meals
                        </label>
                        <label className="flex items-center mr-5 mb-2">
                            <input
                                type="checkbox"
                                value="houseKeeping"
                                checked={facilities.includes('houseKeeping')}
                                onChange={(e) => setFacilities(prev => e.target.checked ? [...prev, e.target.value] : prev.filter(facility => facility !== e.target.value))}
                                className="mr-2"
                            />
                            <PiHouseLight size={20} />
                            House Keeping
                        </label>
                        {/* More facilities similar to above */}
                    </div>
                </div>

                {/* Upload Image */}
                <div className="flex flex-col sm:flex-row items-center my-5">
                    <label className="mr-3">Upload Image :</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>

                <button
                    onClick={addNewPGFunction}
                    className="bg-orange-500 text-white py-2 px-6 rounded mt-5"
                >
                    Submit
                </button>
            </div>
        </>
    )
}

export default NewPGEntryScreen
