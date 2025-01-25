import '../styles/specificPGScreenStyle.css'
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { specificPGusingID } from "../../utils/pgAPICalls"
import HeaderComponent from "../components/header"
import { Image, Text, Stack, Kbd, Button, Divider } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { showComment } from '../../utils/commentAPICalls'
import { useSelector } from 'react-redux'

function SpecificPGScreen() {
    const user = useSelector((state) => state.user)
    const { pgID } = useParams()
    const navigate = useNavigate()
    const [pgDetails, setPGDetails] = useState([])
    const [comments, setComments] = useState([])

    useEffect(() => {
        const gettingPGDetails = async() => {
            try {
                const data = await specificPGusingID(pgID)
                setPGDetails(data)
                console.log(data)
            }
            catch(err) {
                console.log(err)
            }
        }

        gettingPGDetails()
    }, [pgID])

    useEffect(() => {
        const getAllComments = async() => {
            try{
                const allComments = await showComment(pgID)
                setComments(allComments)
                console.log(allComments)
            }
            catch(err) {
                console.log(err)
            }
        }

        getAllComments()
    }, [pgID])    

    const calculateTotalRating = (ratingArray) => {
        if (!ratingArray || ratingArray.length === 0) return 0;
        let overallRating = 0;
        for (let i = 0; i < ratingArray.length; i++) {
            overallRating += ratingArray[i];
        }
        return (overallRating / ratingArray.length).toFixed(1);
    };

    const showingFacilities = () => {
        const facilitiesArray = pgDetails.facilities
        if (!facilitiesArray || facilitiesArray.length === 0) return <Text>NO INFORMATION</Text>;
        return facilitiesArray.map((e, index) => 
            <Kbd key={index} width='fit-content'>{e}</Kbd>
        )
    }

    const showingComments = () => {
        if (!comments || comments.length === 0) return <Stack display='flex' justifyContent='center' alignItems='center' margin={30}><Text>NO COMMENTS</Text></Stack>;
        return comments.map((e, index) => 
            <Stack key={index} marginTop={2} marginBottom={2}>
                <Text fontWeight={600} fontSize={20}>{e.username}</Text>
                <Text fontSize={15}>{e.comment}</Text>
            </Stack>
        )
    }

    const addingComment = () => {
        try{
            if(user.uid !== null){
                navigate(`/newComment/${pgID}`)
            }
            else{
                navigate('/loginRegistration')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <HeaderComponent newEntryPage={true}/>
        <div className="specificPGScreenMainOne">
            <Text fontWeight={900} fontSize={40}>{pgDetails.pgName}</Text>
            <Text fontSize={20}>{pgDetails.pgLocation}</Text>
            <Text fontWeight={600} fontSize={20} marginTop={5}>OverallRating : {calculateTotalRating(pgDetails.overallRating)}/5</Text>
            <Stack display='flex' alignItems='center' justifyContent='center' marginTop={10}>
                <Image src={pgDetails.pgImage} borderRadius={20} width={500}/>
            </Stack>
        </div>
        <div className='specificPGScreenMainTwo'>
            <div className='rating'>
                <Text fontWeight={600} marginBottom={2} marginTop={2}>Location Convienence : {calculateTotalRating(pgDetails.locationCondition)}/5.0</Text>
                <Text fontWeight={600} marginBottom={2} marginTop={2}>Room Condition : {calculateTotalRating(pgDetails.roomCondition)}/5.0</Text>
                <Text fontWeight={600} marginBottom={2} marginTop={2}>Bathroom Condition : {calculateTotalRating(pgDetails.bathroomCondition)}/5.0</Text>
                <Stack marginBottom={2} marginTop={2}>
                    <Text fontWeight={600}>Facilities</Text>
                    <Stack display='flex' flexDir='row' alignItems='center' justifyContent='space-evenly' width='100%' flexWrap='wrap' marginBottom={2} marginTop={2}>
                        {showingFacilities()}
                    </Stack>
                </Stack>
                <Text fontWeight={600} marginBottom={2} marginTop={2}>Rent : {pgDetails.Price}</Text>
            </div>
            <div className='comments'>
                <Stack display='flex' flexDir='row' flexWrap='wrap' alignItems='center' justifyContent='space-between' marginBottom={5}>
                    <Text fontWeight={900} fontSize={20}>Comments</Text>
                    <Button colorScheme='teal' onClick={() => addingComment()}>Add Comments and Rating</Button>
                </Stack>
                <Divider />
                <Stack>
                    {showingComments()}
                </Stack>
            </div>
        </div>
        </>
    )
}

export default SpecificPGScreen