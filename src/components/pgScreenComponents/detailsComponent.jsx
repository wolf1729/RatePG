/* eslint-disable react/prop-types */
function DetailsComponent({ pgDetails, calculateTotalRating, showingFacilities }) {
    return (
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
            <p className="font-semibold text-lg">Owner Name : </p>
            <p className="font-semibold text-lg">Owner Phone number : </p>
        </div>
    )
}

export default DetailsComponent;