import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "../screens/homeScreen";
import SearchScreen from "../screens/searchScreen";
import NewPGEntryScreen from "../screens/newPGEntryScreen";

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
        }
    ]);

    return <RouterProvider router={router} />
}

export default Router;