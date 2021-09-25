import React, {useEffect, useState} from 'react';
import './CSS/TelaHorarios.css';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import api from "./Axios";
import {Button, DatePicker, Form, Input, message, Popconfirm, Select, Space, Table} from "antd";
import {useHistory, useLocation} from "react-router-dom";
import moment from "moment";

const { Option } = Select;
function TelaHorarios(props){
    const history = useHistory();
    const location = useLocation();
    let [Flag,setFlag] = useState(true);
    let [Flag2,setFlag2] = useState(true);
    let [Places,setPlaces] = useState([{
        rowid:0,
        NAME:"",
        CITY:"",
        INTERVAL:1
    }]);
    let [Place,setPlace] = useState({
        rowid:0,
        NAME:"",
        CITY:"",
        INTERVAL:1
    });
    let [Data,setData] = useState([{
        rowid: 0,
        PLACE_ID:0,
        USER_ID:0,
        DATE:'',
        TIME:''
    }]);
    const columns = [{
        title: 'Local',
        key: 'place',
        render: (text,record)=>(
            <Space>
                <p>{Place.NAME}</p>
            </Space>
        )
    },{
        title: 'Data',
        key: 'DATE',
        render: (text,record)=>(
            <Space>
                <p>{record.DATE + ' ' + record.TIME}</p>
            </Space>
        )
    },{
        title: 'Ação',
        key: 'action',
        render: (text, record) => (
            <Space>
                <Popconfirm
                    title={`Deseja realmente agendar nesse dia e horário?`}
                    okText="SIM"
                    cancelText="NÃO"
                    onConfirm={() => {
                        onFinish(record.rowid);
                    }}
                >
                    <Button>
                        AGENDAR
                    </Button>
                </Popconfirm>

            </Space>
        )
    }
    ]

    console.log(location.state.user.rowid);
    if(location.state === undefined){
        history.push('/');
    }
    function onchange(values){
        setFlag(false);
        let place = values.split('-');
        let place1 = {
            rowid:place[0],
            NAME:place[1],
            CITY:place[2],
            INTERVAL:parseInt(place[3])
        }
        setPlace(place1);
    }
    function onSelection(values){
        let DATE = moment(values).format('DD-MM-YYYY');
        let ScheduleDate = {
            DATE:DATE,
            PLACE_ID: Place.rowid
        }

        api.put('/schedules/',ScheduleDate).then(res=>{
            setFlag2(false);
            setData(res.data);
        }).catch(err=>{
            message.error(err.response.data.message);
        })
        console.log(DATE);
    }
    function onFinish(values){

        let schedule = {
            rowid: values,
            USER_ID:location.state.user.rowid
        }
        console.log(schedule);
        api.put('/schedules/new',schedule).then(res => {
            message.success(res.data.message,1,history.push({
                pathname:'/agendado',
                state:{USER_ID:location.state.user.rowid}
            }));
        }).catch(err => {
            message.error(err.response.data.message,1,history.push({
                pathname:'/agendado',
                state:{USER_ID:location.state.user.rowid}
            }));
        })
        console.log(values);
    }

    useEffect(() => {
        api.get("/places/").then(res =>{
            setPlaces(res.data);
        })
    },[]);

    return (
        <div>
            <NavBar/>
            <div id="conteudo">
                <div id="cardHorarios">
                    <div className="topTable">
                        <h1 className="titleHorarios">Realize o seu agendamento!</h1>
                        <Form className='formCPF' onFinish={onFinish} name="formCPF">
                            <Form.Item
                                label={"Usuário"}
                            >
                                <Input disabled={true} value={location.state.user.NAME}/>
                            </Form.Item>
                            <Form.Item
                                name="PLACE_ID"
                                label="Locais:"
                                rules={[{
                                    required:true,
                                    message: 'Selecione um local!',
                                }]}
                            >
                                <Select
                                    name="funcionarios"
                                    style={{ width: 200 }}
                                    label="Locais disponiveis no sistema"
                                    placeholder="Selecione um local!"
                                    onChange={onchange}
                                >
                                    {Places.map(Place =>{
                                        return(
                                            <Option value={Place.rowid + '-' + Place.NAME + '-' + Place.CITY + '-' + Place.INTERVAL}>{Place.NAME}</Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                hidden={Flag}
                                name="DATE"
                                label="Data"
                                rules={[{
                                    required:true,
                                    message: 'Selecione uma data e horário!',
                                }]}
                            >
                                <DatePicker onChange={onSelection}/>
                            </Form.Item>
                            <Form.Item
                                hidden={Flag2}
                                name="DATE"
                            >
                                <div className="Table">
                                    <Table
                                        className="dataTable"
                                        size='large'
                                        dataSource={Data}
                                        columns={columns}
                                        bordered={true}
                                        pagination={{
                                            pageSize:5,
                                        }}
                                    />
                                </div>
                            </Form.Item>
                        </Form>

                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default TelaHorarios;
