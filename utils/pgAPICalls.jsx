const baseURL = `${import.meta.env.VITE_SERVER}/pgRoutes`
// const baseURL = "https://ratepg-backend.onrender.com/pgRoutes"

//API call to add new PG details
const addNewPG = async(pgName, pgLocation, roomCondition, bathroomCondition, locationConvenience, overallRating, price, facilites, pgImage) => {
    try{
        const details = await fetch(`${baseURL}/addNewPG`, {
            method: 'POST',
            body: JSON.stringify({
                pgName: pgName, 
                pgLocation: pgLocation, 
                roomCondition: roomCondition, 
                bathroomCondition: bathroomCondition, 
                locationConvenience: locationConvenience,
                overallRating: overallRating, 
                price: price, 
                facilities: facilites,
                pgImage: pgImage
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await details.json()
        return data.status
    }
    catch(err) {
        console.log(err)
    }
}

//API call to get details of Specific PG
const specificPGusingID = async(pgID) => {
    try {
        const pgDetails = await fetch(`${baseURL}/PGSearchUsingID`, {
            method: 'POST',
            body: JSON.stringify({
                pgID: pgID
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await pgDetails.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}

//API call to update values based on new comments
const updateValuesComment = async(pgId ,bathroomRating, roomRating, locationRating, overallRating) => {
    try {
        const pgDetails = await fetch(`${baseURL}/commentUpdateValue`, {
            method: 'POST',
            body: JSON.stringify({
                pgId: pgId,
                bathroomRating: bathroomRating,
                roomRating: roomRating,
                locationRating: locationRating,
                overallRating: overallRating
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await pgDetails.json()
        return data.status
    }
    catch(err) {
        console.log(err)
    }
}

//API call to get the specific pg using name
const findPGName = async(pgName) => {
    try {
        const pgDetails = await fetch(`${baseURL}/searchName`, {
            method: 'POST',
            body: JSON.stringify({
                pgName: pgName
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await pgDetails.json()
        return data.status
    }
    catch(err) {
        console.log(err)
    }
}

export { addNewPG, specificPGusingID, updateValuesComment, findPGName }