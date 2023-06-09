import './index.css';
import {Link} from 'react-router-dom';

function Header(){
    return(
        <header className='reader'>
            <Link className='logo' to='/'>Soletrando</Link>
        </header>
    )
}

export default Header;