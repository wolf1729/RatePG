const baseURL = 'http://localhost:3000/userRoutes'

//User Registration API calls
const userRegistration = async(username, email, password) => {
    try{
        const result = await fetch(`${baseURL}/userRegistration`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const sendingResult = await result.json()
        return sendingResult
    }
    catch(err) {
        console.log(err)
    }
}

//User Login API calls
// eslint-disable-next-line no-unused-vars
const userLogin = async(email, password) => {
    try{
        const result = await fetch(`${baseURL}/userLogin`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const sendingResult = await result.json()
        return sendingResult
    }
    catch(err) {
        console.log(err)
    }
}

//API call to get username of the user
const usernameAPICall = async(userId) => {
    try{
        const result = await fetch(`${baseURL}/username`, {
            method: 'POST',
            body: JSON.stringify({
                userId: userId
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const sendingResult = await result.json()
        return sendingResult.username
    }
    catch(err) {
        console.log(err)
    }
}

export { userRegistration, userLogin, usernameAPICall }