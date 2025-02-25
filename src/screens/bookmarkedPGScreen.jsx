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
    const navigate = useNavigate()

    const calculateOverallRating = (overallRatingArray) => {
        let overallRating = 0;
        for (let i = 0; i < overallRatingArray.length; i++) {
            overallRating += overallRatingArray[i];
        }
        return (overallRating / overallRatingArray.length).toFixed(1);
    };

    if (bookmarkedPG === null) {
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <CircularProgress sx={{ color: "black" }} />
            </div>
        );
    }

    return (
        <>
            <ReturnHeader />
            <div className="w-screen mx-6">
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
                    <div>
                        {bookmarkedPG.map((pg, index) => (
                            <PgCardComponent pg={pg} key={index} navigate={navigate} calculateOverallRating={calculateOverallRating} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default BookmarkedPGScreen;
