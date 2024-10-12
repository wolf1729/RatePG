import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "../screens/homeScreen";
import SearchScreen from "../screens/searchScreen";
import NewPGEntryScreen from "../screens/newPGEntryScreen";
import SpecificPGScreen from "../screens/specificPGScreen";
import NewCommentScreen from "../screens/addCommentScreen";
import LoginRegistrationScreen from "../screens/loginRegistrationScreen";
import FAQScreen from "../screens/faqScreen";
import ProfileScreen from "../screens/profileScreen";
import UserAddedPG from "../screens/userAddedPGScreen";

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
            path: '/newComment/:pgId',
            element: <NewCommentScreen />
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
        }
    ]);

    return <RouterProvider router={router} />
}

export default Router;