import React from 'react';
import '../CSS/Footer.css';
import {GithubOutlined, InstagramOutlined, LinkedinOutlined} from "@ant-design/icons";

function Footer(){
    return (
        <div id="footer">
            <h2>Desenvolvido por:<span>Matheus Lima</span></h2>
            <div className="social">
                <h2>Redes Sociais :</h2>
                <a rel="noreferrer" target="_blank" href="https://github.com/matholaslima/">
                    <GithubOutlined className="teste"/>
                </a>
                <a rel="noreferrer" target="_blank" href="https://www.linkedin.com/in/matheus-lima-1078aa181/">
                    <LinkedinOutlined />
                </a>
                <a rel="noreferrer" target="_blank" href="https://www.instagram.com/matheusl15/">
                    <InstagramOutlined />
                </a>
            </div>

        </div>
    )
}

export default Footer;
