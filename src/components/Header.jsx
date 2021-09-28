import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

import '../assets/styles/components/Header.css';

const Header = props => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const handleClick = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div className={`header`}>
            <h1>ReactHooks</h1>
            <button className={`button-mode ${darkMode ? 'light-mode' : 'dark-mode'}`} type="button" onClick={handleClick}>{darkMode ? 'Light mode' : 'Dark mode'}</button>
        </div>
    );
}

export default Header;