import React from 'react';
import Header from "../components/Header/Header"
import Aside from "../components/Aside/Aside"
import {Link, Outlet} from "react-router-dom";
import style from "../styles/Layout.module.scss";
import { useLayout } from '../context/LayoutContext';
const Layout = () => {
    const { isAsideVisible } = useLayout();

    return (
        <div>
            <Header/>
            <main className={style.main}>
                {isAsideVisible && <Aside />}
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;