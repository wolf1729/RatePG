/* eslint-disable react/prop-types */
import { FormControlLabel, Checkbox } from "@mui/material";

function FacilitiesComponent({ icon, handleFacilityChange, facilities, facilityName, facilityValue }) {
    return (
        <FormControlLabel
            control={
                <Checkbox
                checked={facilities.includes({facilityValue})}
                onChange={handleFacilityChange}
                value="meals"
                />
            }
            label={
                <div className="flex flex-row items-center border border-black rounded-md p-1">
                    <p className="mr-2">{facilityName}</p>
                    {icon}
                </div>
            }
        />
    )
}

export default FacilitiesComponent;