/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { GoPerson } from "react-icons/go";
import ReturnHeader from "../components/returnHeader";
import { useSelector } from "react-redux";
import { Button, Divider, useMediaQuery } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import PgCardComponent from "../components/pgCardComponent";

function ProfileScreen() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isMobile = useMediaQuery("(max-width:600px)");
    const [pgUploaded, setPgUploaded] = useState([]);

    const calculateOverallRating = (overallRatingArray) => {
        let overallRating = 0;
        for (let i = 0; i < overallRatingArray.length; i++) {
            overallRating += overallRatingArray[i];
        }
        return (overallRating / overallRatingArray.length).toFixed(1);
    };

    useEffect(() => {
        const fetchingUploadedPGs = async() => {
            try {
                console.log('fetching the uploaded pg')
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchingUploadedPGs()

    }, [])

    const updateProfileImage = () => {

    }

    const changePassword = () => {

    }

    const deleteAccount = () => {

    }

    return (
        <div className="w-full min-h-screen bg-gray-100 p-4">
            <ReturnHeader settings={true} />

            <div className="max-w-6xl mx-auto">
                <p className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 pl-4">Your Profile</p>

                <div className="flex flex-col md:flex-row gap-6 items-start w-full">
                    {/* Profile details and settings */}
                    <div className="md:w-[30%] w-full bg-white shadow-md rounded-lg p-5 border border-gray-300">
                        <p className="text-lg font-semibold mb-4">Personal Information</p>
                        <div className="flex flex-col items-center text-center">
                            {user.img ? (
                                <img src={user.img} alt="Profile" className="rounded-full w-20 h-20 object-cover border" />
                            ) : (
                                <GoPerson size={50} className="text-gray-500" />
                            )}
                            <p className="text-xl font-medium mt-2">{user.username}</p>
                            <p className="text-gray-600 text-sm">{user.email}</p>
                            <Button 
                                variant="contained"
                                size="medium"
                                sx={{ backgroundColor: "black", color: "white", mt: 2 }}
                            >
                                Edit Profile
                            </Button>
                        </div>

                        <Divider sx={{ my: 3 }} />

                        <p className="text-lg font-semibold mb-4">Account Settings</p>
                        <div className="flex flex-col gap-3">
                            <Button 
                                variant="outlined" 
                                sx={{ borderColor: "black", color: "black" }}
                                fullWidth
                                onClick={() => changePassword()}
                            >
                                Change Password
                            </Button>
                            <Button 
                                variant="outlined" 
                                sx={{ borderColor: "black", color: "black" }}
                                fullWidth
                                onClick={() => updateProfileImage()}
                            >
                                Update Profile Image
                            </Button>
                            <Button 
                                variant="contained"
                                sx={{ backgroundColor: "red", color: "white" }}
                                fullWidth
                                onClick={() => deleteAccount()}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>

                    {/* Uploaded PGs Section */}
                    <div className="md:w-[65%] w-full bg-white shadow-md rounded-lg p-5 border border-gray-300">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-lg font-semibold">Your Uploaded PGs</p>
                            <Button
                                startIcon={!isMobile && <IoMdAdd color="white" />}
                                size="medium"
                                variant="contained"
                                sx={{ backgroundColor: "black", color: "white" }}
                            >
                                {isMobile ? <IoMdAdd color="white" /> : "Add New PG"}
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pgUploaded.length > 0 ? (
                                pgUploaded.map((pg, index) => (
                                    <PgCardComponent key={index} index={index} pg={pg} calculateOverallRating={calculateOverallRating} navigate={navigate} />
                                ))
                            ) : (
                                <p className="text-gray-500 text-center w-full">No PGs uploaded yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileScreen;
