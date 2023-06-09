import './index.css';
import {BsFillMegaphoneFill, BsFillEyeFill} from "react-icons/bs";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Jogo(){

    const navigate = useNavigate();
    const[palavra, setPalavra] = useState('');
    const[palavras, setPalavras] = useState([]);
    const[contador, setContador] = useState(0);

    useEffect(() => {
        async function BuscaPalavras(){
            await api.get('GetPalavras.php')
            .then((response) => {
                if(response.data.Sucesso){
                    setPalavras(response.data.lista);
                }
                else{
                    toast.warn('Erro ao buscar palavras');
                    navigate('/', true);
                }
            })
            .catch(() => {
                toast.warn('Erro ao buscar palavras');
                navigate('/', true);
            })
        }

        BuscaPalavras();
    }, [setPalavras]);

    function ouvirNovamente(cont){
        var utterance = new window.SpeechSynthesisUtterance();
        let lang = 'pt-BR';
        utterance.text = palavras[cont]?.Palavra;
        if (lang !== "en") utterance.lang = lang + " com.google.android.tts";
        else utterance.lang = lang;
        window.speechSynthesis.speak(utterance);
        document.getElementById('palavra').focus();
    }

    function visualizarPalavra(){
        toast.info(palavras[contador]?.Palavra);
        document.getElementById('palavra').focus();
    }

    async function validaPalavra(){
        if(palavra.toUpperCase() === palavras[contador]?.Palavra?.toUpperCase()){
            toast.success('Correto');
            let temp = contador+1;
            await setContador(temp);
            setPalavra('');

            if(temp === 20){
                toast.success('Finalizado 20 palavras');                
                navigate('/', true);
            }
            else{
                document.getElementById('palavra').focus();
                ouvirNovamente(temp);
            }
        }
        else{
            toast.warn('Palavra incorreta, tente novamente');
        }
    }

    return(
        <div className='container'>
            <div className='jogo'>
                <div className='titulo'>
                    <h2>Soletrando</h2>
                    <br/>
                    <hr/>
                </div>
                <div className='opcoes'>
                    <BsFillMegaphoneFill size={150} onClick={() => ouvirNovamente(contador)}/>
                    <BsFillEyeFill size={150} onClick={visualizarPalavra}/>
                </div>
                <div className='texto'>
                    <input type='text' id='palavra' value={palavra} onChange={(e) => setPalavra(e.target.value)}/>
                    <button onClick={(validaPalavra)}>Próximo</button>
                </div>
            </div>
        </div>
    )
}

export default Jogo;