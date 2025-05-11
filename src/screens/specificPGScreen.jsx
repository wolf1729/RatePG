import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { showComment } from '../../utils/commentAPICalls'
import { useSelector } from 'react-redux'
import useResponsive from '../hooks/mobileHook'
import MobileViewDetails from '../components/pgScreenComponents/mobileViewDetails'
import DesktopViewDetails from '../components/pgScreenComponents/desktopViewDetails'
import ImageLocationComponent from '../components/pgScreenComponents/imageLocationComponent'
import ReturnHeader from '../components/returnHeader'
import { CircularProgress } from '@mui/material'
import NewCommentScreen from './addCommentModal'

function SpecificPGScreen() {
    const isMobile = useResponsive();
    const user = useSelector((state) => state.user)
    const { pgID } = useParams()
    const navigate = useNavigate()
    const [pgDetails, setPGDetails] = useState([])
    const [comments, setComments] = useState([]) 
    const [commentModal, setCommentModal] = useState(false)

    useEffect(() => {
        const gettingPGDetails = async() => {
            try {
                const pgDetails = await fetch(`${import.meta.env.VITE_SERVER}/pgRoutes/PGSearchUsingID`, {
                    method: 'POST',
                    body: JSON.stringify({
                        pgID: pgID
                    }),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                const data = await pgDetails.json()
                setPGDetails(data)
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

    const openCommentModal = () => {
        setCommentModal(true)
    }

    const closeCommentModal = () => {
        setCommentModal(false)
    }

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
        if (!facilitiesArray || facilitiesArray.length === 0) return <p>NO INFORMATION</p>;
        return facilitiesArray.map((e, index) => 
            <span key={index} className="border px-2 py-1 rounded-lg m-1">{e}</span>
        )
    }

    const showingComments = () => {
        if (!comments || comments.length === 0) return <div className="flex justify-center items-center mt-8"><p>NO COMMENTS</p></div>;
        return comments.map((e, index) => 
            <div key={index} className="my-4">
                <p className="font-semibold text-xl">{e.username}</p>
                <p className="text-lg">{e.comment}</p>
            </div>
        )
    }

    const addingComment = () => {
        try{
            if(user.uid !== null){
                openCommentModal()
            }
            else{
                navigate('/loginRegistration')
            }
        }
        catch(err){
            console.log(err)
        }
    }

    if (pgDetails.length === 0) {
        return (
            <div className='w-screen h-screen flex items-center justify-center'><CircularProgress sx={{ color: 'black' }} /></div>
        )
    }

    return (
        <>
        <ReturnHeader />
        <div className="p-4 bg-white">
            <h1 className="font-extrabold text-4xl">{pgDetails.pgName}</h1>
            <p className="text-xl">{pgDetails.pgLocation}</p>
            <p className="font-semibold text-xl mt-5">OverallRating: {calculateTotalRating(pgDetails.overallRating)}/5</p>
            <div className="flex items-center justify-center mt-10 w-[100%]">
                <ImageLocationComponent pgDetails={pgDetails} />
            </div>
        </div>
        {
            isMobile
            ?
            <MobileViewDetails 
                pgDetails={pgDetails}
                calculateTotalRating={calculateTotalRating}
                showingFacilities={showingFacilities}
                showingComments={showingComments}
                addingComment={addingComment}
            />
            :
            <DesktopViewDetails 
                calculateTotalRating={calculateTotalRating} 
                pgDetails={pgDetails}
                showingFacilities={showingFacilities}
                addingComment={addingComment}
                showingComments={showingComments}
            />
        }

        {
            commentModal && <NewCommentScreen openModal={openCommentModal} handleClose={closeCommentModal} pgId={pgID} />
        }
        </>
    )
}

export default SpecificPGScreen
