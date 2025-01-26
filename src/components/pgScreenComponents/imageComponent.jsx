/* eslint-disable react/prop-types */
function ImageComponent({ pgDetails }) {
    return (
        <img src={pgDetails.pgImage} alt="PG" className="rounded-lg w-96"/>
    )
}

export default ImageComponent;