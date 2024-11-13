import "./App.css";
import Navigation from "./components/MainNavigation/Navigation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainTodoHandle from "./components/TodoList/MainTodoHandle";
import CompletedTasks from "./pages/CompletedTasks";
import UpcomingTasks from "./pages/UpcomingTasks";
import OverDue from "./pages/OverDue";

const routers = createBrowserRouter([
     {
          path: "/",
          element: <Navigation />,
          children: [
               {
                    path: "/",
                    element: <MainTodoHandle />,
               },
               {
                    path: "/completed", // Add the path for completed tasks
                    element: <CompletedTasks />, // Render CompletedTasks component
               },
               {
                    path: "/upcoming", // Route for UpcomingTasks
                    element: <UpcomingTasks />, // Render UpcomingTasks component
               },
               {
                    path: "/overdue", // Route for UpcomingTasks
                    element: <OverDue />, // Render UpcomingTasks component
               },
          ],
     },
     
]);

function App() {
     return <RouterProvider router={routers} />;
}

export default App;
