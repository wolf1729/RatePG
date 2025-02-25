/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReturnHeader from "../components/returnHeader";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import PgCardComponent from "../components/pgCardComponent";

function BookmarkedPGScreen() {
    const [bookmarkedPG, setBookmarkedPG] = useState([]);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const bookmarkedPG = localStorage.getItem("bookmarkedPgData");
        setBookmarkedPG(JSON.parse(bookmarkedPG));
    }, []);

    const calculateOverallRating = (overallRatingArray) => {
        let overallRating = 0;
        for (let i = 0; i < overallRatingArray.length; i++) {
            overallRating += overallRatingArray[i];
        }
        return (overallRating / overallRatingArray.length).toFixed(1);
    };

    if (bookmarkedPG === null) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <CircularProgress sx={{ color: "black" }} />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen overflow-hidden">
            <ReturnHeader />
            <div className="w-full px-6">
                <p className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl mb-4">
                    Your Bookmarked PGs
                </p>
                {bookmarkedPG.length === 0 ? (
                    <p>
                        You haven't bookmarked any PGs yet. Explore our{" "}
                        <Link to="/search" className="text-primary underline">
                            listings
                        </Link>{" "}
                        to find your perfect accommodation!
                    </p>
                ) : (
                    <div className="flex flex-wrap items-center justify-evenly gap-6 mt-10 w-full">
                        {bookmarkedPG.map((pg, index) => (
                            <PgCardComponent pg={pg} key={index} navigate={navigate} calculateOverallRating={calculateOverallRating} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookmarkedPGScreen;
