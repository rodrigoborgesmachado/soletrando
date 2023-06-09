import './index.css';
import { useState } from 'react';
import configData from "./../../config.json";
import { useNavigate } from 'react-router-dom';

function Formulario(){
    const[nome, setNome] = useState(sessionStorage.getItem(configData.NOME_PARAM) || '');
    const navigate = useNavigate();

    function salvarDados(){
        sessionStorage.setItem(configData.NOME_PARAM, nome);
        navigate('/jogo', {replace: true});
    }

    return(
        <div className='container'>
            <div className='formulario'>
                <h3>
                    Como você gostaria de ser chamado?
                </h3>
                <input type="text" id="name" value={nome} onChange={(e) => {setNome(e.target.value)}}/>
            </div>
            <div className='botoes'>
                <button className='botao' onClick={() => {salvarDados()}}>Continuar</button>
            </div>
        </div>
    )
}

export default Formulario;