import RoutesApp from "./routes";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose="3000"/>
      <RoutesApp/>
      <Footer/>
    </div>
  );
}

export default App;
