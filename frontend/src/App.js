import './ppp.css'
import Nav from './components/nav/Nav';
import RoomPage from './roomPage/RoomPage';
import { useSelector } from 'react-redux';




export default function App() {
  let { room } = useSelector((state) => state.room)

  return (
    <div className='App'>
      <Nav />
      {room?.name && (<RoomPage />)}
    </div>
  );
}
