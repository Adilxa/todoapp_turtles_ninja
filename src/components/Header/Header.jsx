import React from 'react';
import style from "../../styles/Header.module.css";
import burg from "../../image/Header/burg.svg"
import iconSrc from "../../image/Header/iconSrc.svg"
import bell from "../../image/Header/bell.svg"
import moon from "../../image/Header/moon.svg"
import man from "../../image/Header/man.svg"
import { useLayout } from '../../context/LayoutContext';

const Header = () => {

    const [value, setValue] = React.useState("");
    const { toggleAside } = useLayout();

    return (
        <header className={style.header}>
            <div onClick={toggleAside} className={'burger'}>
                <img src={burg} alt="" />
            </div>

            <div className={style.inputWrapper}>
                <input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={style.styledInput}
                    placeholder="write you project name"
                />
                <img src={iconSrc} alt="search" className={style.searchIcon} />
            </div>
            
            <nav className={style.NavBar}>
                <div><img src={bell} alt="" /></div>
                <div><img src={moon} alt="" /></div>
                <div><img src={man} alt="" /></div>
            </nav>
        </header>
    );
};

export default Header;