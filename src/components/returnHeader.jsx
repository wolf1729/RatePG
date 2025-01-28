import PropTypes from "prop-types";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function ReturnHeader({ settings = false }) {
    const navigate = useNavigate();

    return (
        <div
            className={`flex w-[100%] items-center ${
                settings ? "justify-between" : "justify-start"
            }`}
        >
            {/* Back Icon */}
            <div
                onClick={() => navigate("/search")}
                className="hover:cursor-pointer hover:text-gray-700 focus:text-gray-700 m-5"
                aria-label="Go back"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && navigate("/search")}
            >
                <FaArrowLeft size={25} />
            </div>

            {/* Settings Icon */}
            {settings && (
                <div
                    className="hover:cursor-pointer hover:text-gray-700 focus:text-gray-700 m-5"
                    aria-label="Settings"
                    role="button"
                    tabIndex={0}
                    onClick={() => console.log("Settings clicked")} // Add desired action here
                    onKeyDown={(e) => e.key === "Enter" && console.log("Settings clicked")}
                >
                    <IoMdSettings size={30} />
                </div>
            )}
        </div>
    );
}

ReturnHeader.propTypes = {
    settings: PropTypes.bool,
};

export default ReturnHeader;
