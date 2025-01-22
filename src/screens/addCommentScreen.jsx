/* eslint-disable no-unused-vars */
import '../styles/newPGEntryScreenStyle.css'
import { useState, useEffect } from "react"
import HeaderComponent from "../components/header"
import { Input, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Box, Text, Button, useToast } from "@chakra-ui/react"
import { useNavigate, useParams } from 'react-router-dom';
import { addNewComment } from '../../utils/commentAPICalls';
import { updateValuesComment } from '../../utils/pgAPICalls';
import Cookies from 'js-cookie';

function NewCommentScreen() {
    const { pgId } = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [roomCondition, setRoomCondition] = useState([])
    const [bathroomCondition, setbathroomCondition] = useState([])
    const [locationConvenience, setLocationConvenience] = useState([])
    const [overallRating, setOverallRating] = useState([])
    const [userId, setUserId] = useState('')

    // useEffect(() => {
    //     const gettingUsername = async() => {
    //         try{
    //             await setUserId(Cookies.get('userId'))
    //             const result = await usernameAPICall(userId)
    //             setName(result)
    //         }
    //         catch(err) {
    //             console.log(err)
    //         }
    //     }

    //     gettingUsername()
    // })

    const addNewPGFunction = async() => {
        if (name === '' && comment === ''){
            toast({
                title: 'Error',
                description: "Please fill Name and Comment",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
        try {
            const updateValues = await updateValuesComment(pgId, bathroomCondition, roomCondition, locationConvenience, overallRating)
            const newComment = await addNewComment(pgId, name, comment, bathroomCondition, roomCondition, locationConvenience, overallRating)

            if (updateValues.status === false || newComment.status === false) {
                toast({
                    title: 'Error',
                    description: "Something went wrong",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })    
            }

            toast({
                title: 'Success',
                description: "PG Added to Database",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })

            navigate(`/pgDetails/${pgId}`)
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <>
        <HeaderComponent newEntryPage={true}/>
        <div className="newPGEntryFormContainer">
            <Input value={comment} onChange={(e) => setComment(e.target.value)} width='60%' placeholder="Enter your Comment" marginBottom={5} marginTop={5}/>
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
            <Box width='60%' marginBottom={5} marginTop={5}>
                <Text>Overall Rating</Text>
                <Slider min={0} max={5} step={1} defaultValue={0} onChange={(e) => setOverallRating(e)}>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Button colorScheme='orange' onClick={() => addNewPGFunction()}>Submit</Button>
        </div>
        </>
    )
} 

export default NewCommentScreen