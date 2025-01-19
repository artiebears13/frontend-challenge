import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    return (
        <header className={styles.header}>
            <button
                onClick={() => handleNavigate('/')}
                className={`${styles.navButton} ${location.pathname === '/' ? styles.active : ''}`}
            >
                Все котики
            </button>
            <button
                onClick={() => handleNavigate('/favorites')}
                className={`${styles.navButton} ${location.pathname === '/favorites' ? styles.active : ''}`}
            >
                Любимые котики
            </button>
        </header>
    );
};

export default Header;
