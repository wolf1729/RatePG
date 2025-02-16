/* eslint-disable react/prop-types */
function PgCardComponent({ pg, calculateOverallRating, navigate }) {
    return (
        <div className="w-[150px] md:w-[300px] h-[300px] md:h-[450px] shadow-lg p-4 rounded-xl border border-gray-300 mb-5 flex flex-col">
            <div className="h-[80%] flex flex-col items-center justify-evenly">
                <div className="flex flex-col mt-2 w-[100%]">
                    <h3 className="text-md md:text-[30px] mb-2 leading-tight font-bold">{pg?.pgName}</h3>
                    <p className="text-xs md:text-sm text-gray-500">{pg?.pgLocation}</p>
                </div>
                <div className="flex justify-center mb-4 w-[90%]">
                    <img 
                        src={pg?.pgImage} 
                        alt="PG image" 
                        className="w-full h-20 md:h-40 object-cover rounded-lg" 
                    />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between mt-2 w-[100%]">
                    <p className="text-black text-xs md:text-sm">Rating: {calculateOverallRating(pg?.overallRating)}/5.0</p>
                    <p className="text-sm md:text-md text-black font-bold">{pg?.Price}/month</p>
                </div>
            </div>
            <button 
                className="px-4 py-2 bg-black text-white text-sm md:text-xl rounded-md w-full mt-[20px] h-[40px] md:h-[50px]"
                onClick={() => navigate(`/pgDetails/${pg?._id}`)}>
                View Details
            </button>
        </div>
    );
}

export default PgCardComponent;
