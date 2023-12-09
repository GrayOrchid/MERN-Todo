import App from "./App";
import LoginForm from "./components/forms/authForm/LoginForm";
import UserRegisterForm from "./components/forms/authForm/UserRegisterForm";
import RoomPage from "./roomPage/RoomPage";
import TaskPage from "./taskPage/TaskPage";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "task/:_id",
        element: <TaskPage />
    },
    {
        path: "room/:name",
        element: <RoomPage />
    },
    {
        path: "register-page",
        element: <UserRegisterForm />
    },
    {
        path: "login-page",
        element: <LoginForm />
    }

])
export default router