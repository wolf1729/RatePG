import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import ImageComponent from "./imageComponent";

function ImageLocationComponent({ pgDetails }) {
    const [imageLocationSection, setImageLocationSection] = useState(0);

    const sectionChange = (event, value) => {
        setImageLocationSection(value);
    };

    return (
        <div className="w-[90%] mx-auto mt-4">
            <Tabs
                value={imageLocationSection}
                onChange={sectionChange}
                aria-label="basic tabs example"
                centered
            >
                <Tab label="Images" />
                <Tab label="Location" />
            </Tabs>

            <div className="mt-4">
                {imageLocationSection === 0 && <ImageComponent pgDetails={pgDetails} />}
                {imageLocationSection === 1 && <p>location</p>}
            </div>
        </div>
    )
}

export default ImageLocationComponent;