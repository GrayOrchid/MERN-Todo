import './App.css'
import RoutesComponent from './RoutesComponent';
import Header from './components/nav/Header';
import { keepServerActive } from './CheckHealth';


export default function App() {
  setInterval(keepServerActive, 10 * 30 * 1000);

  return (
    <div className='App'>
      <Header />
      <RoutesComponent />
    </div >
  );
}
