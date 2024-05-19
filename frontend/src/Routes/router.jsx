import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "../screens/homeScreen";
import SearchScreen from "../screens/searchScreen";
import NewPGEntryScreen from "../screens/newPGEntryScreen";
import SpecificPGScreen from "../screens/specificPGScreen";
import NewCommentScreen from "../screens/addCommentScreen";

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
        }
    ]);

    return <RouterProvider router={router} />
}

export default Router;