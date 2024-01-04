import { AnimatePresence } from "framer-motion";
import RoomPage from "./roomPage/RoomPage";
import TaskPage from "./taskPage/TaskPage";
import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GetRoomPage from "./pages/GetRoomPage";
import CreateRoomPage from "./pages/CreateRoomPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leave } from "./redux/reducers/roomSlicer";
import { clearErrorInfo, selectIsAuth } from "./redux/reducers/authReducer";

export default function RoutesComponent() {
    let location = useLocation()
    let dispatch = useDispatch()
    let isAuth = useSelector(selectIsAuth)

    useEffect(() => {
        if (location.pathname === '/') {
            dispatch(leave())
        }
        if (!isAuth) {
            dispatch(clearErrorInfo())
        }
    }, [location])

    return (
        <AnimatePresence>
            <Routes >
                <Route path="/" element={<HomePage />} />
                <Route path="/task/:_id" element={<TaskPage />} />
                <Route path="/room/:name" element={<RoomPage />} />
                <Route path="/register-page" element={<RegisterPage />} />
                <Route path="/login-page" element={<LoginPage />} />
                <Route path="/create-room" element={<CreateRoomPage />} />
                <Route path="/get-room" element={<GetRoomPage />} />
            </Routes>
        </AnimatePresence>
    )
}
