import './index.css';
import { Link } from 'react-router-dom';

function Home(){
    return(
        <div className='container'>
            <div className='apresentacao'>
                <h2>Soletrando</h2>
                <br/>
                <h3>
                Jogue o soletrando para praticar o portguês e veja quantas palavras você consegue escrever sem errar!
                </h3>
            </div>
            <div className='botoes'>
                <Link className='botao' to={`/formulario`}>Começar o Jogo</Link>
            </div>
        </div>
    )
}

export default Home;