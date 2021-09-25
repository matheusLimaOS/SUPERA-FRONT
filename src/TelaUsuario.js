import React from 'react';
import './CSS/TelaUsuario.css';
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import {Form, Input, message, Tooltip} from 'antd';
import {Button} from "antd";
import api from "./Axios";
import {Link,useHistory} from "react-router-dom";

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


function TelaUsuario(){
    const history = useHistory();
    const onFinish = values => {
        api.put("/user/",values).then(res=>{
            if(res.data.flag===false){
                message.success(res.data.message,1,history.push({
                    pathname:'/horarios',
                    state:res.data
                }));
            }
            else{
                message.success(res.data.message,2,history.push({
                    pathname:'/agendado',
                    state:{USER_ID:res.data.user.rowid}
                }));
            }
        }).catch(err=>{
            message.error(err.response.data.message);
        })
    };

    return (
        <div>
            <NavBar/>
            <div id="conteudo">
                <div id="cardUsuario">
                    <h1>Seja bem vindo!</h1>
                    <div className="selection">
                        <h2>Por favor caso já possua cadastro, insira seu CPF!</h2>
                        <Form className='formCPF' onFinish={onFinish} name="formCPF">
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
                            <Form.Item>
                                <Button htmlType="submit" shape="round" className="botao">Selecionar</Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className="newFunc">
                        <h3>Caso não possua cadastro:</h3>
                        <Link to='/cadastroUsuario'>
                            <Button shape="round">Cadastrar</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default TelaUsuario;
