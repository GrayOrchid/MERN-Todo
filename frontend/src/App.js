import './ppp.css'
import Nav from './components/nav/Nav';
import RoomPage from './roomPage/RoomPage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectIsAuth } from './redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import RoutesComponent from './RoutesComponent';


export default function App() {
  let { room } = useSelector((state) => state.room)
  const navigate = useNavigate();
  let isAuth = useSelector(selectIsAuth)


  return (
    <div className='App'>
      <Nav />
      <RoutesComponent />
      {/* {room?.name && (<RoomPage />)} */}

    </div >
  );
}
