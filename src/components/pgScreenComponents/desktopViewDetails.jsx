/* eslint-disable react/prop-types */
function DesktopViewDetails({ calculateTotalRating, pgDetails, showingFacilities, addingComment, showingComments}) {
    return (
        <div className="p-4 mt-10 space-y-8">
            <div className="space-y-4">
                <p className="font-semibold text-lg">Location Convenience: {calculateTotalRating(pgDetails.locationCondition)}/5.0</p>
                <p className="font-semibold text-lg">Room Condition: {calculateTotalRating(pgDetails.roomCondition)}/5.0</p>
                <p className="font-semibold text-lg">Bathroom Condition: {calculateTotalRating(pgDetails.bathroomCondition)}/5.0</p>
                <div className="space-y-2">
                    <p className="font-semibold">Facilities</p>
                    <div className="flex flex-wrap justify-evenly">
                        {showingFacilities()}
                    </div>
                </div>
                <p className="font-semibold text-lg">Rent: {pgDetails.Price}</p>
            </div>
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-extrabold text-xl">Comments</h2>
                    <button onClick={() => addingComment()} className="bg-teal-500 text-white py-2 px-4 rounded-md">Add Comment and Rating</button>
                </div>
                <hr />
                <div>
                    {showingComments()}
                </div>
            </div>
        </div>
    )
}

export default DesktopViewDetails