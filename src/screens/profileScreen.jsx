/* eslint-disable react/no-unescaped-entities */
import { useState } from "react"
import { GoPerson } from "react-icons/go"
import ReturnHeader from "../components/returnHeader"
import SettingsModal from "../components/Modals/settingsModal"
import { useSelector } from "react-redux"

function ProfileScreen() {
    const user = useSelector((state) => state.user)
    const [pgUploaded, setPgUploaded] = useState([])
    const [settingsModal, setSettingsModal] = useState(false)

    console.log(user)

    return (
        <>
        <ReturnHeader settings={true} setSettingsModal={setSettingsModal} settingsModal={settingsModal} />
        <div className="w-full mt-5">
            <div className="w-full flex flex-col md:flex-row items-center justify-center">
                <div className="flex items-center justify-center">
                    <div className="md:w-24 w-12 md:h-24 h-12 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                        {user.img ? (
                            <img src={user.img} alt="User Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <GoPerson className="w-full h-full text-gray-500" />
                        )}
                    </div>
                    <p className="text-3xl ml-4">{user.username}</p>
                </div>
                <div>
                    
                </div>
            </div>

            <div className="w-full flex flex-col items-center mt-20">
                <p className="text-lg">PG's Uploaded</p>
                <hr className="w-4/5 mt-2" />
                <div className="mt-10">
                    {pgUploaded.length === 0 ? (
                        <div className="mt-12">
                            <p>You have uploaded 0 PG's</p>
                        </div>
                    ) : (
                        <div>{/* Display uploaded PGs here */}</div>
                    )}
                </div>
            </div>
        </div>

        {
            settingsModal 
            &&
            <SettingsModal setSettingsModal={setSettingsModal} settingsModal={settingsModal} />
        }
        </>
    )
}

export default ProfileScreen
