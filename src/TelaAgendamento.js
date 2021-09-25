import React, {useEffect, useState} from 'react';
import './CSS/TelaHorarios.css';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import api from "./Axios";
import {Button,message, Popconfirm} from "antd";
import {useHistory, useLocation} from "react-router-dom";

function TelaAgendamento(props){
    const history = useHistory();
    const location = useLocation();
    let [Data,setData] = useState([{
        rowid: 0,
        USER_NAME:'',
        PLACE_NAME:'',
        DATE:'',
        TIME:''
    }]);

    if(location.state === undefined){
        history.push('/');
    }
    function onFinish(){
        api.put('/schedules/cancel/' + location.state.USER_ID).then(res => {
            message.success(res.data.message,1,history.push('/'));
        }).catch(err => {
            message.error(err.response.data.message,1,history.push('/'));
        })
    }

    useEffect(() => {
        api.get("/schedules/"+location.state.USER_ID).then(res =>{
            console.log(res.data);
            setData(res.data);
        })
    },[location.state.USER_ID]);

    return (
        <div>
            <NavBar/>
            <div id="conteudo">
                <div id="cardHorarios">
                    <div>
                        <h1 className="titleHorarios">Agendamento:</h1>
                        <p>Usuário:</p>
                        <h2>{Data.USER_NAME}</h2>
                        <p>Local:</p>
                        <h2>{Data.PLACE_NAME}</h2>
                        <p>DIA E HORA:</p>
                        <h2>{Data.DATE + ' ' + Data.TIME}</h2>
                    </div>
                    <Popconfirm
                        className="button"
                        title={`Deseja realmente cancelar este agendamento?`}
                        okText="SIM"
                        cancelText="NÃO"
                        onConfirm={() => {
                            onFinish();
                        }}
                    >
                        <Button onCLick={onFinish}>
                            CANCELAR AGENDAMENTO
                        </Button>
                    </Popconfirm>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default TelaAgendamento;
