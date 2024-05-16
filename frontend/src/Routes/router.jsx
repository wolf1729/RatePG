import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeScreen from "../screens/homeScreen";
import SearchScreen from "../screens/searchScreen";

const Router = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomeScreen />
        },
        {
            path: '/search',
            element: <SearchScreen />
        }
    ]);

    return <RouterProvider router={router} />
}

export default Router;