/* eslint-disable react/prop-types */
import { Tabs, Tab } from "@mui/material";
import { useState } from "react";
import DetailsComponent from "./detailsComponent";
import CommentsComponent from "./commentsComponent";

function MobileViewDetails({ pgDetails, calculateTotalRating, showingFacilities, showingComments, addingComment }) {
    const [section, setSection] = useState(0);

    const sectionChange = (event, value) => {
        setSection(value);
    };

    return (
        <div className="w-[90%] mx-auto mt-4">
            <Tabs
                value={section}
                onChange={sectionChange}
                aria-label="basic tabs example"
                centered
            >
                <Tab label="Details" />
                <Tab label="Comments" />
            </Tabs>

            <div className="mt-4">
                {section === 0 && <DetailsComponent pgDetails={pgDetails} calculateTotalRating={calculateTotalRating} showingFacilities={showingFacilities} />}
                {section === 1 && <CommentsComponent showingComments={showingComments} addingComment={addingComment} />}
            </div>
        </div>
    );
}

export default MobileViewDetails;
