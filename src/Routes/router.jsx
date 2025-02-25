import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "../screens/homeScreen";
import SearchScreen from "../screens/searchScreen";
import NewPGEntryScreen from "../screens/newPGEntryScreen";
import SpecificPGScreen from "../screens/specificPGScreen";
import LoginRegistrationScreen from "../screens/loginRegistrationScreen";
import FAQScreen from "../screens/faqScreen";
import ProfileScreen from "../screens/profileScreen";
import UserAddedPG from "../screens/userAddedPGScreen";
import BookmarkedPGScreen from "../screens/bookmarkedPGScreen";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomeScreen />
        },
        {
            path: '/search',
            element: <SearchScreen />
        },
        {
            path: '/newPGEntry',
            element: <NewPGEntryScreen />
        },
        {
            path: '/pgDetails/:pgID',
            element: <SpecificPGScreen />
        },
        {
            path: '/loginRegistration',
            element: <LoginRegistrationScreen />
        },
        {
            path: '/FAQ',
            element: <FAQScreen />
        },
        {
            path: '/profile',
            element: <ProfileScreen />
        },
        {
            path: '/pgAdded',
            element: <UserAddedPG />
        },
        {
            path: '/bookmarks',
            element: <BookmarkedPGScreen />
        }
    ]);

    return <RouterProvider router={router} />
}

export default Router;