import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../Store/User/userSlice"
import { useNavigate } from "react-router-dom"
import { GoPerson } from "react-icons/go"

function ProfileScreen() {
    const user = useSelector((state) => state.user)
    const [pgUploaded, setPgUploaded] = useState([])
    const dispatch = useDispatch()
    const navigation = useNavigate()

    // const logoutFunction = () => {
    //     dispatch(logout())
    //     navigation("/search")
    // }

    return (
        <div className="w-full mt-5">
            <div className="w-full flex flex-col md:flex-row items-center justify-center">
                <div className="flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                        {user.img ? (
                            <img src={user.img} alt="User Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <GoPerson className="w-full h-full text-gray-500" />
                        )}
                    </div>
                    <p className="text-3xl ml-4">{user.username}</p>
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
    )
}

export default ProfileScreen
