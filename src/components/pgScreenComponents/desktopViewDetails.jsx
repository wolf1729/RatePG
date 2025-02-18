/* eslint-disable react/prop-types */
function DesktopViewDetails({
    calculateTotalRating,
    pgDetails,
    showingFacilities,
    addingComment,
    showingComments,
  }) {
    return (
      <div className="p-4 mt-10 mb-5 space-y-8 flex flex-wrap md:flex-nowrap justify-evenly items-start space-x-4">
        {/* PG Details Section */}
        <div className="w-[30%] shadow-lg p-4 rounded-xl border border-gray-300">
          <p className="font-semibold text-lg">
            Location Convenience: {calculateTotalRating(pgDetails?.locationCondition)}/5.0
          </p>
          <p className="font-semibold text-lg">
            Room Condition: {calculateTotalRating(pgDetails?.roomCondition)}/5.0
          </p>
          <p className="font-semibold text-lg">
            Bathroom Condition: {calculateTotalRating(pgDetails?.bathroomCondition)}/5.0
          </p>
  
          {/* Facilities */}
          <div className="space-y-2 mt-4">
            <p className="font-semibold">Facilities</p>
            <div className="flex flex-wrap justify-evenly gap-2">
              {showingFacilities()}
            </div>
          </div>
  
          <p className="font-semibold text-lg mt-4">Rent: ₹{pgDetails?.Price}</p>
        </div>
  
        {/* Comments Section */}
        <div className="w-[65%] shadow-lg p-4 rounded-xl border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-extrabold text-xl">Comments</h2>
            <button
              onClick={() => addingComment()}
              className="bg-black hover:bg-gray-500 transition text-white py-2 px-4 rounded-md"
            >
              Add Comment and Rating
            </button>
          </div>
          <hr />
          <div className="mt-4">
            {showingComments()}
          </div>
        </div>
      </div>
    );
  }
  
  export default DesktopViewDetails;
  