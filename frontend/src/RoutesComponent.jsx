import { AnimatePresence } from "framer-motion";
import UserRegisterPage from "./components/forms/authPages/UserRegisterForm"
import RoomPage from "./roomPage/RoomPage";
import TaskPage from "./taskPage/TaskPage";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GetRoomPage from "./pages/GetRoomPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import RegiterPage from "./pages/RegiterPage";


export default function RoutesComponent() {
    let location = useLocation()
    return (
        <AnimatePresence>
            <Routes >
                <Route path="/" element={<HomePage />} />
                <Route path="/task/:_id" element={<TaskPage />} />
                <Route path="/room/:name" element={<RoomPage />} />
                <Route path="/register-page" element={<RegiterPage />} />
                <Route path="/login-page" element={<LoginPage />} />
                <Route path="/create-room" element={<CreateRoomPage />} />
                <Route path="/get-room" element={<GetRoomPage />} />
            </Routes>
        </AnimatePresence>

    )
}

