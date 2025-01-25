import HeaderComponent from "../components/header"
import HomePageOne from "../components/homePageOne"

function HomeScreen() {
    return (
        <>
            <div className="h-screen w-screen">
                <HeaderComponent />
                <div className="flex items-center justify-center h-4/5 mt-5">
                    <HomePageOne />
                </div>
            </div>
        </>
    )
}

export default HomeScreen
