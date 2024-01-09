import './ppp.css'
import RoutesComponent from './RoutesComponent';
import Header from './components/nav/Header';
import { keepServerActive } from './CheckHealth';


export default function App() {
  setInterval(keepServerActive, 3 * 60 * 1000);

  return (
    <div className='App'>
      <Header />
      <RoutesComponent />
    </div >
  );
}
