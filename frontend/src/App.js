import './ppp.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectIsAuth } from './redux/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import RoutesComponent from './RoutesComponent';
import Header from './components/nav/Header';


export default function App() {

  return (
    <div className='App'>
      <Header />
      <RoutesComponent />
<<<<<<< Updated upstream

      {/* {room?.name && (<RoomPage />)} */}

=======
>>>>>>> Stashed changes
    </div >
  );
}
