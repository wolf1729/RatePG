/* eslint-disable react/prop-types */
import { useState, useRef, useMemo, useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import ImageComponent from "./imageComponent";
import { OlaMaps } from "../../../OlaMapsWebSDKNew"

function ImageLocationComponent({ pgDetails }) {
    const [imageLocationSection, setImageLocationSection] = useState(0);
    const mapRef = useRef(null)  
    const olaMaps = useMemo(() => new OlaMaps({
        apiKey: import.meta.env.VITE_OLA_MAPS_API_KEY,
    }), []);

    useEffect(() => {
        if (mapRef.current) {
            const myMap = olaMaps.init({
                style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
                container: mapRef.current,
                center: [77.61648476788898, 12.931423492103944],
                zoom: 15,
            });

            olaMaps.addMarker({
                offset: [0, 6],
                anchor: 'bottom',
                color: 'red',
            }).setLngLat([77.6196390456908, 12.93321052215299]).addTo(myMap)

            return () => myMap.remove();
        }
    }, [olaMaps]);
    

    const sectionChange = (event, value) => {
        setImageLocationSection(value);
    };

    return (
        <div className="w-[90%] mt-2">
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
                {imageLocationSection === 1 && <div ref={mapRef} id="map" className="map-container w-[100%] h-[300px]"></div>}
            </div>
        </div>
    )
}

export default ImageLocationComponent;