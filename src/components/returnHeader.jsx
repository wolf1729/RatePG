/* eslint-disable react/prop-types */
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function ReturnHeader() {
    const navigate = useNavigate();

    return (
        <div
            className={"flex w-[100%] items-center justify-start"}
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
        </div>
    );
}

export default ReturnHeader;
