/* eslint-disable no-unused-vars */
import '../styles/newPGEntryScreenStyle.css'
import { useState, useEffect } from "react"
import HeaderComponent from "../components/header"
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function NewCommentScreen() {
    const user = useSelector((state) => state.user)
    const { pgId } = useParams()
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
    const [roomCondition, setRoomCondition] = useState(0)
    const [bathroomCondition, setBathroomCondition] = useState(0)
    const [locationConvenience, setLocationConvenience] = useState(0)
    const [overallRating, setOverallRating] = useState(0)

    useEffect(() => {
        if (user.uid === null){
            navigate('/loginRegistration')
        }
    }, [navigate, user])

    const addNewCommentFunction = async () => {
        if (comment.trim() === '') {
            toast.warn("Please enter a comment!", {
                position: "top-center",
                autoClose: 3000,
            });
            return;
        }
    
        try {
            const updateValuesPromise = fetch(`${import.meta.env.VITE_SERVER}/pgRoutes/commentUpdateValue`, {
                method: 'POST',
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    pgId,
                    bathroomRating: bathroomCondition,
                    roomRating: roomCondition,
                    locationRating: locationConvenience,
                    overallRating,
                    token: user.token
                }),
            });
    
            const newCommentPromise = fetch(`${import.meta.env.VITE_SERVER}/commentRoutes/addNewComment`, {
                method: 'POST',
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    pgId,
                    username: user.username,
                    comment,
                    bathroomRating: bathroomCondition,
                    roomRating: roomCondition,
                    locationRating: locationConvenience,
                    overallRating,
                    token: user.token
                }),
            });
    
            const [updateValuesResponse, newCommentResponse] = await Promise.all([
                updateValuesPromise,
                newCommentPromise
            ]);
    
            const updateValuesData = await updateValuesResponse.json();
            const newCommentData = await newCommentResponse.json();
    
            if (!updateValuesData.status || !newCommentData.status) {
                toast.error("Something went wrong!", { position: "top-center", autoClose: 5000 });
                return;
            }
    
            toast.success("Comment added successfully!", { position: "top-center", autoClose: 3000 });
            navigate(`/pgDetails/${pgId}`);
    
        } catch (err) {
            console.error("Error:", err);
            toast.error("Network error! Please try again later.", { position: "top-center", autoClose: 5000 });
        }
    };
    

    return (
        <>
        <HeaderComponent newEntryPage={true}/>
        <div className="flex flex-col items-center justify-center w-full p-4">
            <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your Comment"
                className="w-3/5 p-2 border rounded mb-4"
            />
            <div className="w-3/5 mb-4">
                <label>Room Condition</label>
                <input
                    type="range"
                    min={0}
                    max={5}
                    step={1}
                    value={roomCondition}
                    onChange={(e) => setRoomCondition(e.target.value)}
                    className="w-full mt-2"
                />
            </div>
            <div className="w-3/5 mb-4">
                <label>Bathroom Condition</label>
                <input
                    type="range"
                    min={0}
                    max={5}
                    step={1}
                    value={bathroomCondition}
                    onChange={(e) => setBathroomCondition(e.target.value)}
                    className="w-full mt-2"
                />
            </div>
            <div className="w-3/5 mb-4">
                <label>Location Convenience</label>
                <input
                    type="range"
                    min={0}
                    max={5}
                    step={1}
                    value={locationConvenience}
                    onChange={(e) => setLocationConvenience(e.target.value)}
                    className="w-full mt-2"
                />
            </div>
            <div className="w-3/5 mb-4">
                <label>Overall Rating</label>
                <input
                    type="range"
                    min={0}
                    max={5}
                    step={1}
                    value={overallRating}
                    onChange={(e) => setOverallRating(e.target.value)}
                    className="w-full mt-2"
                />
            </div>
            <button
                onClick={addNewCommentFunction}
                className="bg-orange-500 text-white py-2 px-4 rounded mt-4 hover:bg-orange-600"
            >
                Submit
            </button>
        </div>
        </>
    );
} 

export default NewCommentScreen;
