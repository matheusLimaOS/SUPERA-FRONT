import React from 'react';
import '../CSS/NavBar.css';
import {ClockCircleOutlined} from "@ant-design/icons";

function NavBar(){
    return (
        <div id="navBar">
            <a href="/">
                <ClockCircleOutlined />
                <p>Agendamento COVID-19</p>
            </a>
        </div>
    )
}

export default NavBar;
