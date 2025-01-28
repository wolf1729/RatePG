/* eslint-disable react/prop-types */
import { Button, Divider, Modal } from "@mui/material"
import { IoClose } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../../Store/User/userSlice"

function SettingsModal({settingsModal, setSettingsModal}) {
    const dispatch = useDispatch()
    const navigation = useNavigate()

    const handleClose = () => {
        setSettingsModal(false)
    }

    const logoutFunction = () => {
        dispatch(logout())
        navigation("/search")
    }

    return (
        <Modal
            open={settingsModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-96 w-60 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center">
                <div className="flex w-[100%] items-end cursor-pointer" onClick={() => handleClose()}>
                    <IoClose />
                </div>
                <div className="flex flex-col items-center justify-center mt-5 mb-5">
                    <p className="m-2 cursor-pointer">Update Profile Image</p>
                    <Divider orientation="vertical" sx={{ width: 1, color: '#000000' }} />
                    <p className="m-2 cursor-pointer">Update Username</p>
                </div>
                <Button color="error" variant="contained" onClick={() => logoutFunction()}>Logout</Button>
            </div>
        </Modal>
    )
}

export default SettingsModal