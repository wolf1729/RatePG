/* eslint-disable no-unused-vars */
import '../styles/newPGEntryScreenStyle.css'
import { useState } from "react"
import HeaderComponent from "../components/header"
import { Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Text, CheckboxGroup, Checkbox, Stack, Button, useToast } from "@chakra-ui/react"
import { GiHotMeal, GiClothes } from "react-icons/gi";
import { PiHouseLight, PiSecurityCameraFill, PiMapPinSimpleAreaBold, PiTelevisionSimpleFill } from "react-icons/pi";
import { FaWifi } from "react-icons/fa";
import { MdEmojiTransportation } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { TbAirConditioning } from "react-icons/tb";

function NewPGEntryScreen() {
    const toast = useToast()
    const [pgName, setPGName] = useState('')
    const [pgLocation, setPGLocation] = useState('')
    const [roomCondition, setRoomCondition] = useState()
    const [bathroomCondition, setbathroomCondition] = useState()
    const [locationConvenience, setLocationConvenience] = useState()
    const [price, setPrice] = useState()
    const [facilities, setFacilities] = useState([])

    const checkingIfWorking = () => {
        if (pgName === '' && pgLocation === ''){
            toast({
                title: 'Error',
                description: "Please fill Name and Location of your PG",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
        else {
            console.log(pgName)
            console.log(pgLocation)
            console.log(roomCondition)
            console.log(bathroomCondition)
            console.log(locationConvenience)
            console.log(price)
            console.log(facilities)    
        }
    }

    return (
        <>
        <HeaderComponent newEntryPage={true}/>
        <div className="newPGEntryFormContainer">
            <Input value={pgName} onChange={(e) => setPGName(e.target.value)} width='60%' placeholder="Enter your PG Name" marginBottom={5} marginTop={5}/>
            <Input value={pgLocation} onChange={(e) => setPGLocation(e.target.value)} width='60%' placeholder="Enter your PG Location" marginBottom={5} marginTop={5}/>
            <Box width='60%' marginBottom={5} marginTop={5}>
                <Text>Room Condition</Text>
                <Slider min={0} max={5} step={1} defaultValue={0} onChange={(e) => setRoomCondition(e)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Box width='60%' marginBottom={5} marginTop={5}>
                <Text>Bathroom Condition</Text>
                <Slider min={0} max={5} step={1} defaultValue={0} onChange={(e) => setbathroomCondition(e)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Box width='60%' marginBottom={5} marginTop={5}>
                <Text>Location Convenience</Text>
                <Slider min={0} max={5} step={1} defaultValue={0} onChange={(e) => setLocationConvenience(e)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} width='60%' placeholder="Enter Rent" marginBottom={5} marginTop={5}/>
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
            <Button colorScheme='orange' onClick={() => checkingIfWorking()}>Submit</Button>
        </div>
        </>
    )
}

export default NewPGEntryScreen