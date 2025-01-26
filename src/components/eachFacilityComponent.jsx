/* eslint-disable react/prop-types */
function EachFacilityComponent({ icon, facilityName }) {
    return (
        <div className="flex flex-row items-center mr-2">
            <p className="mr-2">{facilityName}</p>
            {icon}
        </div>
    )
}

export default EachFacilityComponent;