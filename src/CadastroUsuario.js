import React from 'react';
import './CSS/TelaUsuario.css';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import {Form, Input, InputNumber, Tooltip,Radio,Space} from 'antd';
import {Button,message} from "antd";
import api from "./Axios";
import {useHistory} from "react-router-dom";

function formatNumber(value) {
    let num = value;
    let result = '';
    while (num.length > 3) {
        result += num.slice(0,3) + '.';
        num=num.slice(3,num.length);
    }
    result +=num;
    if(value.length>9){
        num = result.slice(12,result.length);
        result = result.slice(0,11);
        result = result + '-' + num;
    }
    return result;
}
class NumericInput extends React.Component {
    onChange = e => {
        const { value } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange(value);
        }
    };


    render() {
        const { value } = this.props;
        const title = value ? (
            <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
        ) : (
            'Insira seu CPF'
        );
        return (
            <Tooltip
                trigger={['focus']}
                title={title}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                <Input
                    {...this.props}
                    onChange={this.onChange}
                    placeholder="CPF"
                    maxLength={11}
                />
            </Tooltip>
        );
    }
}

function CadastroUsuario(){
    let history = useHistory();

    const onFinish = values => {
        api.post("/user/",values).then(res=>{
            message.success(res.data.message,1,history.push("/"));
        }).catch(err => {
            message.error(err.response.data.message);
        })

    };

    return (
        <div>
            <NavBar/>
            <div id="conteudo">
                <div id="cardFuncionario">
                    <div className="selection">
                        <h2>Cadastro de funcionario:</h2>
                        <Form className="formCPF" onFinish={onFinish} name="formUser">
                            <Form.Item
                                name="NAME"
                                label="Nome"
                                rules={[{
                                    required:true,
                                    message: 'Selecione o funcionário!'
                                }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="CPF"
                                label="CPF"
                                rules={[{
                                    required:true,
                                    message: 'Insira seu CPF!',
                                },{
                                    min:11,
                                    message: 'Deve Conter no minimo 11 caracteres!',
                                }]}
                            >
                                <NumericInput placeholder="CPF" />
                            </Form.Item>
                            <Form.Item
                                className="align"
                                name="AGE"
                                label="Idade"
                                rules={[{
                                    required:true,
                                    message: 'Insira sua idade!'
                                }]}
                            >
                                <InputNumber min={1} max={150}/>
                            </Form.Item>
                            <Form.Item
                                className="align"
                                name="GENDER"
                                label="Gênero"
                                rules={[{
                                    required:true,
                                    message: 'Insira sua idade!'
                                }]}
                            >
                                <Radio.Group>
                                    <Space direction="vertical">
                                        <Radio value={'M'}>Masculino</Radio>
                                        <Radio value={'F'}>Feminino</Radio>
                                        <Radio value={'O'}>Outro</Radio>
                                    </Space>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType="submit" shape="round" className="botao">Cadastrar</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default CadastroUsuario;
