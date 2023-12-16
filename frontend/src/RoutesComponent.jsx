import { AnimatePresence } from "framer-motion";
import LoginPage from "./components/forms/authPages/LoginPage";
import UserRegisterPage from "./components/forms/authPages/UserRegisterPage"
import RoomPage from "./roomPage/RoomPage";
import TaskPage from "./taskPage/TaskPage";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./homepage/HomePage";
import CreateRoom from "./components/forms/roomForms/CreateRoom";
import GetRoom from "./components/forms/roomForms/GetRoom";


export default function RoutesComponent() {
    let location = useLocation()
    return (
        <AnimatePresence>
            <Routes >
                <Route path="/" element={<HomePage />} />
                <Route path="/task/:_id" element={<TaskPage />} />
                <Route path="/room/:name" element={<RoomPage />} />
                <Route path="/register-page" element={<UserRegisterPage />} />
                <Route path="/login-page" element={<LoginPage />} />
                <Route path="/create-room" element={<CreateRoom />} />
                <Route path="/get-room" element={<GetRoom />} />
            </Routes>
        </AnimatePresence>

    )
}

// location = { location } key = { location.pathname }