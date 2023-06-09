import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from './Components/Header';
import Home from "./Pages/Home";
import Erro from "./Pages/Erro";
import Formulario from './Pages/Formulario';
import Jogo from './Pages/Jogo';

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/formulario' element={<Formulario/>}/>
                <Route path='/jogo' element={<Jogo/>}/>
                <Route path='*' element={<Erro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp;