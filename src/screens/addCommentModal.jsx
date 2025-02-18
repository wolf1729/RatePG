/* eslint-disable react/prop-types */
import '../styles/newPGEntryScreenStyle.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Modal } from '@mui/material';
import { IoIosClose } from 'react-icons/io';

function NewCommentScreen({ openModal, handleClose, pgId }) {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [comment, setComment] = useState('');
    const [roomCondition, setRoomCondition] = useState(0);
    const [bathroomCondition, setBathroomCondition] = useState(0);
    const [locationConvenience, setLocationConvenience] = useState(0);
    const [overallRating, setOverallRating] = useState(0);

    useEffect(() => {
        if (user.uid === null) {
            navigate('/loginRegistration');
        }
    }, [navigate, user]);

    const addNewCommentFunction = async () => {
        if (comment.trim() === '') {
            toast.warn("Please enter a comment!", { position: "top-center", autoClose: 3000 });
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
            handleClose()
            setTimeout(5000)
            window.location.reload()

        } catch (err) {
            console.error("Error:", err);
            toast.error("Network error! Please try again later.", { position: "top-center", autoClose: 5000 });
        }
    };

    return (
        <Modal open={openModal} onClose={handleClose}>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 md:w-1/2 lg:w-1/3">
                    {/* Close Button */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Add a Comment</h2>
                        <button onClick={handleClose} className="text-gray-600 hover:text-black">
                            <IoIosClose />
                        </button>
                    </div>

                    {/* Comment Input */}
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your Comment"
                        className="w-full p-3 border rounded-md mt-4"
                    />

                    {/* Rating Sliders */}
                    {[
                        { label: "Room Condition", value: roomCondition, setter: setRoomCondition },
                        { label: "Bathroom Condition", value: bathroomCondition, setter: setBathroomCondition },
                        { label: "Location Convenience", value: locationConvenience, setter: setLocationConvenience },
                        { label: "Overall Rating", value: overallRating, setter: setOverallRating },
                    ].map(({ label, value, setter }) => (
                        <div key={label} className="w-full mt-4">
                            <label className="block text-gray-700">{label}: {value}</label>
                            <input
                                type="range"
                                min={0}
                                max={5}
                                step={1}
                                value={value}
                                onChange={(e) => setter(Number(e.target.value))}
                                className="w-full mt-2"
                            />
                        </div>
                    ))}

                    {/* Submit Button */}
                    <button
                        onClick={addNewCommentFunction}
                        className="w-full bg-black text-white py-2 px-4 rounded mt-6 hover:bg-orange-600"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default NewCommentScreen;
