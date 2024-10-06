const baseURL = "http://localhost:3000/commentRoutes"
// const baseURL = "https://ratepg-backend.onrender.com/commentRoutes"

//API call to add new comment
const addNewComment = async(pgId, username, comment, bathroomRating, roomRating, locationRating, overallRating) => {
    try{
        const details = await fetch(`${baseURL}/addNewComment`, {
            method: 'POST',
            body: JSON.stringify({
                pgId: pgId,
                username: username,
                comment: comment,
                bathroomRating: bathroomRating,
                roomRating: roomRating,
                locationRating: locationRating,
                overallRating: overallRating
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

const showComment = async(pgId) => {
    try{
        const details = await fetch(`${baseURL}/pgComments`, {
            method: 'POST',
            body: JSON.stringify({
                pgId: pgId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = await details.json()
        return data
    }
    catch(err) {
        console.log(err)
    }
}

export { addNewComment, showComment }