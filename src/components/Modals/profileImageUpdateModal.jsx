/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";
import { IoIosCloud } from "react-icons/io";
import { uploadProfileImage } from "../../../utils/firebaseFunctions";
import { useSelector } from "react-redux";

function ProfileImageUpdateModal({ open, onClose }) {
    const user = useSelector((state) => state.user);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpdate = async () => {
        if (selectedFile) {
            try {
                console.log(user.token, user.uid);
                const imgeURL = await uploadProfileImage(selectedFile, user.uid);
                console.log("this is image url", imgeURL);
                const response = await fetch(`${import.meta.env.VITE_SERVER}/userRoutes/updateProfileImage`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.token}`
                    },
                    body: JSON.stringify({
                        uid: user.uid,
                        imageLink: imgeURL
                    })
                });
                const data = await response.json();
                console.log(data);
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("No file selected");
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-2xl w-11/12 sm:w-96 max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <Typography variant="h6" className="font-bold">Update Profile Image</Typography>
                    <IconButton onClick={onClose}>
                        <MdClose className="text-gray-500 text-2xl" />
                    </IconButton>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <label className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500">
                        <IoIosCloud className="text-blue-500 text-4xl" />
                        <Typography variant="body2" className="text-gray-500 text-center">Click to upload or drag an image here</Typography>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleFileChange} 
                        />
                    </label>
                    {selectedFile && (
                        <Typography variant="body2" className="text-gray-700 text-center">Selected: {selectedFile.name}</Typography>
                    )}
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className="w-full py-2" 
                        onClick={handleUpdate} 
                        disabled={!selectedFile}
                    >
                        Update
                    </Button>
                </div>
            </Box>
        </Modal>
    );
}

export default ProfileImageUpdateModal;