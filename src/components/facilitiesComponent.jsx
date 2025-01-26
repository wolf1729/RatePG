/* eslint-disable react/prop-types */
import { FormControlLabel, Checkbox } from "@mui/material";
import EachFacilityComponent from "./eachFacilityComponent";

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
                <EachFacilityComponent icon={icon} facilityName={facilityName} />
            }
            className="border border-black rounded-md m-2"
        />
    )
}

export default FacilitiesComponent;