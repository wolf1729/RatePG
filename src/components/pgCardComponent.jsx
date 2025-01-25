/* eslint-disable react/prop-types */
function PgCardComponent({ pg, calculateOverallRating, navigate }) {
    return (
        <div className="w-[150px] md:w-[300px] h-[300px] md:h-[450px] shadow-lg p-4 rounded-xl flex flex-col">
            <div className="h-[80%]">
                <div className="flex justify-center mb-4">
                    <img 
                        src={pg?.pgImage} 
                        alt="PG image" 
                        className="w-full h-20 md:h-40 object-cover rounded-lg" 
                    />
                </div>
                <div className="flex flex-col mt-2">
                    <h3 className="text-md md:text-[30px] mb-2 leading-tight font-bold">{pg?.name}</h3>
                    <p className="text-xs md:text-sm text-gray-500">{pg?.pgLocation}</p>
                    <p className="text-blue-600 text-xs md:text-sm">Rating: {calculateOverallRating(pg?.overallRating)}/5.0</p>
                </div>
            </div>
            <button 
                className="px-4 py-2 bg-blue-500 text-white text-sm md:text-xl rounded-md w-full mt-[20px] h-[40px] md:h-[50px]"
                onClick={() => navigate(`/pgDetails/${pg?._id}`)}>
                Show Details
            </button>
        </div>
    );
}

export default PgCardComponent;
