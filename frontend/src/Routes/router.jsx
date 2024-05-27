import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "../screens/homeScreen";
import SearchScreen from "../screens/searchScreen";
import NewPGEntryScreen from "../screens/newPGEntryScreen";
import SpecificPGScreen from "../screens/specificPGScreen";
import NewCommentScreen from "../screens/addCommentScreen";
import LoginRegistrationScreen from "../screens/loginRegistrationScreen";
import FAQScreen from "../screens/faqScreen";

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
        }
    ]);

    return <RouterProvider router={router} />
}

export default Router;