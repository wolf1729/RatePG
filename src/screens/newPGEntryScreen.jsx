/* eslint-disable no-unused-vars */
import '../styles/newPGEntryScreenStyle.css'
import { useState } from "react"
import HeaderComponent from "../components/header"
import { Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Text, CheckboxGroup, Checkbox, Stack, Button, useToast, Image } from "@chakra-ui/react"
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
    const toast = useToast()
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
    const [showDropdown, setShowDropdown] = useState(false) // Manage dropdown visibility

    const api_key = import.meta.env.VITE_OLA_MAPS_API_KEY

    const apiHitting = async(searchText) => {
        try {
            const urlSearchText = encodeURIComponent(searchText.trim())
            const apiURL = `https://api.olamaps.io/places/v1/autocomplete?input=${urlSearchText}&api_key=${api_key}`
            const hittingAPI = await fetch(apiURL)
            const gettingData = await hittingAPI.json()
            console.log(gettingData.predictions)
            setPossibleLocations(gettingData.predictions || []) // Set predictions
            setShowDropdown(true) // Show dropdown when suggestions are available
        } catch (err) {
            console.log(err)
        }
    }

    const handleLocationChange = async (e) => {
        const value = e.target.value
        setPGLocation(value)
        if (value.length > 2) {
            await apiHitting(value) // Fetch suggestions if input is longer than 2 chars
        } else {
            setShowDropdown(false) // Hide dropdown if input is too short
        }
    }

    const handleLocationSelect = (location) => {
        setPGLocation(location) // Set selected location to input
        setShowDropdown(false) // Hide the dropdown
    }

    const addNewPGFunction = async() => {
        if (pgName === '' && pgLocation === ''){
            toast({
                title: 'Error',
                description: "Please fill Name and Location of your PG",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
            return
        }

        try {
            const imageToUpload = imageFile === null ? imageToUse : imageFile
            const imageURL = await uploadFileInStorage(imageToUpload, pgName);
            const result = await addNewPG(pgName, pgLocation, roomCondition, bathroomCondition, locationConvenience, overallRating, price, facilities, imageURL)
            toast({
                title: 'Success',
                description: "PG Added to Database",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            navigate('/search')
        }
        catch(err) {
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
        <div className="newPGEntryFormContainer">
            <Input value={pgName} onChange={(e) => setPGName(e.target.value)} width={['80%', '60%']} placeholder="Enter your PG Name" marginBottom={5} marginTop={5} />
            
            {/* Location Input with Suggestions */}
            <Stack display='flex' flexDir='row' alignContent='center' justifyContent='space-evenly' marginTop={5} width={['80%', '60%']} position='relative'>
                <Input
                    value={pgLocation}
                    onChange={handleLocationChange}
                    width='100%'
                    placeholder="Enter your PG Location"
                    marginBottom={5}
                />
                {/* Dropdown for location suggestions */}
                {showDropdown && (
                    <Box
                        width="90%"
                        border="1px solid #ccc"
                        borderRadius="md"
                        maxHeight="200px"
                        overflowY="auto"
                        backgroundColor="white"
                        position="absolute"
                        top='80%'
                        zIndex="10"
                    >
                        {possibleLocations.map((location, index) => (
                            <Box
                                key={index}
                                padding="10px"
                                borderBottom="1px solid #ccc"
                                cursor="pointer"
                                onClick={() => handleLocationSelect(location.description)}
                            >
                                {location.description}
                            </Box>
                        ))}
                    </Box>
                )}
            </Stack>

            {/* Other PG entry fields remain unchanged */}
            <Box width={['80%', '60%']} marginBottom={5} marginTop={5}>
                <Text>Room Condition</Text>
                <Slider min={0} max={5} step={1} defaultValue={0} onChange={(val) => setRoomCondition(val)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Box width={['80%', '60%']} marginBottom={5} marginTop={5}>
                <Text>Bathroom Condition</Text>
                <Slider min={0} max={5} step={1} defaultValue={0} onChange={(val) => setbathroomCondition(val)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Box width={['80%', '60%']} marginBottom={5} marginTop={5}>
                <Text>Location Convience</Text>
                <Slider min={0} max={5} step={1} defaultValue={0} onChange={(val) => setbathroomCondition(val)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Box width={['80%', '60%']} marginBottom={5} marginTop={5}>
                <Text>Overall Condition</Text>
                <Slider min={0} max={5} step={1} defaultValue={0} onChange={(val) => setbathroomCondition(val)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Input width={['80%', '60%']} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Enter Rent" marginBottom={5} marginTop={5}/>
            <div className='facilities'>
                <Text marginBottom={3} marginTop={5} fontSize={20} fontWeight={600}>Facilities</Text>
                <CheckboxGroup colorScheme='green' defaultValue={[]} value={facilities} onChange={(e) => setFacilities(e)}>
                    <Stack spacing={[1, 5]} direction={['column', 'row']} display='flex' flexDir='row' flexWrap='wrap' alignContent='center' justifyContent='center'>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start' justifyContent=''><Checkbox value='meals'><Text marginRight={2}>Meals</Text></Checkbox><GiHotMeal size={20}/></Box>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start'><Checkbox value='houseKeeping'><Text marginRight={2}>House Keeping</Text></Checkbox><PiHouseLight size={20}/></Box>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start'><Checkbox value='laundry'><Text marginRight={2}>Laundry Service</Text></Checkbox><GiClothes size={20}/></Box>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start'><Checkbox value='wifi'><Text marginRight={2}>Wi-fi</Text></Checkbox><FaWifi size={20}/></Box>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start'><Checkbox value='Security'><Text marginRight={2}>Security</Text></Checkbox><PiSecurityCameraFill size={20}/></Box>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start'><Checkbox value='commonArea'><Text marginRight={2}>Common Area</Text></Checkbox><PiMapPinSimpleAreaBold size={20}/></Box>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start'><Checkbox value='transportation'><Text marginRight={2}>Transportation</Text></Checkbox><MdEmojiTransportation size={20}/></Box>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start'><Checkbox value='gym'><Text marginRight={2}>Gym</Text></Checkbox><CgGym size={20}/></Box>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start'><Checkbox value='tv'><Text marginRight={2}>TV</Text></Checkbox><PiTelevisionSimpleFill size={20}/></Box>
                        <Box borderColor='#C8C8C8' borderWidth={1} borderRadius={10} padding={1} display='flex' flexDir='row' alignItems='self-start'><Checkbox value='airConditioning'><Text marginRight={2}>Air Conditioning</Text></Checkbox><TbAirConditioning size={20}/></Box>
                    </Stack>
                </CheckboxGroup>
            </div>
            <Stack display='flex' flexDir={['column', 'row']} marginTop={2} marginBottom={5}>
                <Text fontWeight={600} fontSize={20}>Upload Image : </Text>
                <input type='file' accept="image/*" onChange={handleImageFileChange} />
            </Stack>
            <Button colorScheme='orange' onClick={() => addNewPGFunction()}>Submit</Button>
        </div>
        </>
    )
}

export default NewPGEntryScreen
