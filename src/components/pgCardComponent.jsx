/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { IoMdBookmark } from "react-icons/io";

function PgCardComponent({ pg, calculateOverallRating, navigate }) {
    const user = useSelector((state) => state.user);
    const [alertMessage, setAlertMessage] = useState(null);
    const [bookmarked, setBookmarked] = useState(false);

    // useEffect(() => {
    //     const bookmarkedPG = JSON.parse(localStorage.getItem("bookmarkedPgData")) || { bookmarkedPG: [] };
    //     setBookmarked(bookmarkedPG.bookmarkedPG.includes(pg._id));
    // }, [pg._id]);

    const bookMarkPG = async () => {
        try {
            let url = bookmarked
                ? `${import.meta.env.VITE_SERVER}/pgRoutes/removeBookmark`
                : `${import.meta.env.VITE_SERVER}/pgRoutes/bookmark`;

            const response = await fetch(url, {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify({ 
                    pgId: pg._id, 
                    token: user.token, 
                    uid: user.uid 
                })
            });

            const data = await response.json();

            if (response.ok) {
                setAlertMessage({
                    type: "success",
                    text: bookmarked ? "PG removed from Bookmark!" : "PG Bookmarked!"
                });

                let bookmarkedPG = JSON.parse(localStorage.getItem("bookmarkedPgData")) || { bookmarkedPG: [] };

                if (bookmarked) {
                    bookmarkedPG.bookmarkedPG = bookmarkedPG.bookmarkedPG.filter(id => id !== pg._id);
                } else {
                    bookmarkedPG.bookmarkedPG.push(pg._id);
                }

                localStorage.setItem("bookmarkedPgData", JSON.stringify(bookmarkedPG));

                // Toggle bookmark state
                setBookmarked(!bookmarked);
            } else {
                setAlertMessage({ type: "warning", text: data.message || "Something went wrong" });
            }
        } catch (err) {
            console.error(err);
            setAlertMessage({ type: "error", text: "An error occurred" });
        }
    };

    // Auto-dismiss alert after 3 seconds
    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => setAlertMessage(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    return (
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto shadow-lg p-4 rounded-xl border border-gray-300 mb-5 flex flex-col">
            {alertMessage && <Alert severity={alertMessage.type}>{alertMessage.text}</Alert>}

            <div className="flex flex-col items-center justify-evenly">
                <div className="flex flex-col mt-2 w-full">
                    <h3 className="text-lg md:text-2xl mb-2 leading-tight font-bold">{pg?.pgName}</h3>
                    <p className="text-sm text-gray-500">{pg?.pgLocation}</p>
                </div>
                <div className="flex justify-center my-4 w-full">
                    <img 
                        src={pg?.pgImage} 
                        alt="PG image" 
                        className="w-full h-28 sm:h-36 md:h-40 lg:h-48 object-cover rounded-lg" 
                    />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mt-2 w-full gap-2">
                    <p className="text-black text-sm md:text-base">Rating: {calculateOverallRating(pg?.overallRating)}/5.0</p>
                    <p className="text-base md:text-lg text-black font-bold">{pg?.Price}/month</p>
                </div>
            </div>
            <div className="w-full flex flex-row items-center justify-between gap-2 mt-4">
                <button 
                    className="px-3 py-2 bg-black text-white text-sm md:text-lg hover:bg-gray-500 rounded-md flex-1"
                    onClick={() => navigate(`/pgDetails/${pg?._id}`)}
                >
                    View Details
                </button>
                <button 
                    className="p-2 text-white text-sm md:text-lg rounded-md flex items-center justify-center bg-gray-500"
                    onClick={bookMarkPG}
                >
                    {bookmarked ? <IoMdBookmark /> : <CiBookmark />}
                </button>
            </div>
        </div>
    );
}

export default PgCardComponent;
