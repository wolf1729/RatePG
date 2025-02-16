/* eslint-disable react/prop-types */
import { CiBookmark } from "react-icons/ci";

function PgCardComponent({ pg, calculateOverallRating, navigate }) {
    return (
        <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto shadow-lg p-4 rounded-xl border border-gray-300 mb-5 flex flex-col">
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
                    className="px-3 py-2 bg-black text-white text-sm md:text-lg rounded-md flex-1"
                    onClick={() => navigate(`/pgDetails/${pg?._id}`)}
                >
                    View Details
                </button>
                <button 
                    className="p-2 bg-gray-500 text-white text-sm md:text-lg rounded-md flex items-center justify-center"
                    onClick={() => console.log('bookmarked')}
                >
                    <CiBookmark size={24} />
                </button>
            </div>
        </div>
    );
}

export default PgCardComponent;
