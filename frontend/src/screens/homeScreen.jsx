import { Stack } from "@chakra-ui/react"
import HeaderComponent from "../components/header"
import HomePageOne from "../components/homePageOne"

function HomeScreen() {
    return (
        <>
        <Stack height='100vh' width='100vw'>
            <HeaderComponent />
            <Stack display='flex' alignItems='center' justifyContent='center' height='80%' marginTop={5}>
                <HomePageOne />
            </Stack>
        </Stack>
        </>
    )
}

export default HomeScreen