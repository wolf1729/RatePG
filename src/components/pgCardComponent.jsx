/* eslint-disable react/prop-types */
function PgCardComponent({ pg, calculateOverallRating, navigate }) {
    return (
        <div 
            className="w-[150px] md:w-[350px] h-[250px] md:h-[500px] shadow-lg p-4 rounded-md relative">
            <div className="flex justify-center mb-4">
                <img 
                    src={pg.pgImage} 
                    alt='PG image' 
                    className="w-full h-40 object-cover rounded-lg" 
                />
            </div>
            <div className="mt-2">
                <h3 className="text-xl">{pg.name}</h3>
                <p className="text-sm text-gray-500">{pg.pgLocation}</p>
                <p className="text-blue-600 text-sm">Rating: {calculateOverallRating(pg.overallRating)}/5.0</p>
            </div>
            <div className="absolute bottom-4 left-4">
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    onClick={() => navigate(`/pgDetails/${pg._id}`)}>
                    Show Details
                </button>
            </div>
        </div>
    )
}

export default PgCardComponent;